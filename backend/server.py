from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import asyncio
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated

import bcrypt
import jwt
import resend
from bson import ObjectId
from fastapi import (FastAPI, APIRouter, HTTPException, Request, Response, Depends,
                     BackgroundTasks, UploadFile, File, Query, Header)
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field

from storage import APP_NAME, init_storage, put_object, get_object

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"
LEAD_STATUSES = ["new", "contacted", "scheduled", "completed", "lost"]

ALLOWED_IMAGE_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/heic": "heic",
    "image/heif": "heif",
}
MAX_UPLOAD_BYTES = 10 * 1024 * 1024
MAX_PHOTOS_PER_LEAD = 5

app = FastAPI(title="Post & Polish API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def _to_str(v):
    return str(v) if isinstance(v, ObjectId) else v


PyObjectId = Annotated[str, BeforeValidator(_to_str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        doc = self.model_dump(by_alias=True, exclude_none=True)
        doc.pop("_id", None)
        return doc

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc) if doc else None


# ---------- models ----------
class Lead(BaseDocument):
    name: str
    contact: str
    address: str
    service: str
    notes: Optional[str] = None
    photo_ids: List[str] = Field(default_factory=list)
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LeadCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=120)
    contact: str = Field(min_length=3, max_length=160)
    address: str = Field(min_length=3, max_length=240)
    service: str = Field(min_length=1, max_length=120)
    notes: Optional[str] = Field(default=None, max_length=2000)
    photo_ids: List[str] = Field(default_factory=list, max_length=MAX_PHOTOS_PER_LEAD)


class UploadOut(BaseModel):
    file_id: str
    filename: str
    size: int
    content_type: str


class LeadStatusUpdate(BaseModel):
    status: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminOut(BaseModel):
    id: PyObjectId
    email: str
    name: str
    role: str


# ---------- auth helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "type": "access",
               "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "type": "refresh",
               "exp": datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request, token_override: Optional[str] = None) -> AdminOut:
    token = token_override or request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return AdminOut(id=user["_id"], email=user["email"], name=user.get("name", "Admin"),
                    role=user.get("role", "admin"))


# ---------- routes ----------
@api_router.get("/")
async def root():
    return {"service": "post-and-polish", "status": "ok"}


MAX_LOGIN_ATTEMPTS = 5
LOCKOUT_MINUTES = 15


async def check_lockout(identifier: str):
    record = await db.login_attempts.find_one({"identifier": identifier})
    if not record:
        return
    if record.get("count", 0) < MAX_LOGIN_ATTEMPTS:
        return
    last = datetime.fromisoformat(record["last_attempt"])
    unlock_at = last + timedelta(minutes=LOCKOUT_MINUTES)
    now = datetime.now(timezone.utc)
    if now < unlock_at:
        wait = int((unlock_at - now).total_seconds() / 60) + 1
        raise HTTPException(status_code=429,
                            detail=f"Too many failed attempts. Try again in {wait} minute(s).")
    await db.login_attempts.delete_one({"identifier": identifier})


@api_router.post("/auth/login")
async def login(payload: LoginRequest, request: Request, response: Response):
    email = payload.email.lower().strip()
    identifier = f"acct:{email}"
    await check_lockout(identifier)

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1},
             "$set": {"last_attempt": datetime.now(timezone.utc).isoformat()}},
            upsert=True)
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})

    user_id = str(user["_id"])
    access = create_access_token(user_id, email)
    refresh = create_refresh_token(user_id)
    response.set_cookie("access_token", access, httponly=True, secure=True,
                        samesite="none", max_age=43200, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True,
                        samesite="none", max_age=604800, path="/")
    return {"user": AdminOut(id=user["_id"], email=email, name=user.get("name", "Admin"),
                             role=user.get("role", "admin")).model_dump(),
            "access_token": access}


@api_router.get("/auth/me", response_model=AdminOut)
async def me(admin: AdminOut = Depends(get_current_admin)):
    return admin


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


async def send_lead_alert(lead: "Lead") -> None:
    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    recipient = os.environ.get("LEAD_ALERT_EMAIL", "").strip()
    if not api_key or not recipient:
        logger.info("Lead alert skipped — RESEND_API_KEY or LEAD_ALERT_EMAIL not configured")
        return

    resend.api_key = api_key
    rows = [
        ("Name", lead.name),
        ("Contact", lead.contact),
        ("Address", lead.address),
        ("Service", lead.service),
        ("Notes", lead.notes or "—"),
        ("Photos", f"{len(lead.photo_ids)} attached" if lead.photo_ids else "none"),
    ]
    body = "".join(
        f'<tr><td style="padding:8px 16px 8px 0;font:600 12px Helvetica,Arial;'
        f'text-transform:uppercase;letter-spacing:1.5px;color:#8a8a8a;vertical-align:top">{k}</td>'
        f'<td style="padding:8px 0;font:400 15px Georgia,serif;color:#0C1627">{v}</td></tr>'
        for k, v in rows
    )
    html = (
        '<div style="background:#F6F5F2;padding:32px">'
        '<table role="presentation" style="max-width:560px;margin:0 auto;background:#fff;'
        'border:1px solid #EAE7E0;border-collapse:collapse">'
        '<tr><td style="background:#0C1627;padding:24px 28px">'
        '<div style="font:400 22px Georgia,serif;color:#F6F5F2">NE Post &amp; Polish</div>'
        '<div style="font:700 11px Helvetica,Arial;letter-spacing:2px;color:#C5A059;'
        'text-transform:uppercase;margin-top:6px">New quote request</div>'
        "</td></tr>"
        '<tr><td style="padding:28px"><table role="presentation" style="border-collapse:collapse">'
        f"{body}</table></td></tr>"
        '<tr><td style="padding:0 28px 28px;font:400 12px Helvetica,Arial;color:#8a8a8a">'
        "Open the lead dashboard to set a status and follow up.</td></tr>"
        "</table></div>"
    )

    params = {
        "from": os.environ["SENDER_EMAIL"],
        "to": [recipient],
        "subject": f"New lead — {lead.name} ({lead.service})",
        "html": html,
    }
    try:
        sent = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Lead alert sent: %s", sent.get("id"))
    except Exception as exc:
        logger.error("Lead alert failed: %s", exc)


@api_router.post("/uploads", response_model=UploadOut, status_code=201)
async def upload_photo(file: UploadFile = File(...)):
    content_type = (file.content_type or "").lower()
    if content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400,
                            detail="Only JPEG, PNG, WEBP or HEIC images can be uploaded.")
    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Each photo must be 10 MB or smaller.")

    ext = ALLOWED_IMAGE_TYPES[content_type]
    file_id = str(uuid.uuid4())
    path = f"{APP_NAME}/lead-photos/{file_id}.{ext}"
    try:
        result = await asyncio.to_thread(put_object, path, data, content_type)
    except Exception as exc:
        logger.error("Photo upload failed: %s", exc)
        raise HTTPException(status_code=502, detail="Photo upload failed. Please try again.")

    await db.files.insert_one({
        "file_id": file_id,
        "storage_path": result["path"],
        "original_filename": file.filename or f"{file_id}.{ext}",
        "content_type": content_type,
        "size": result.get("size", len(data)),
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return UploadOut(file_id=file_id, filename=file.filename or f"{file_id}.{ext}",
                     size=result.get("size", len(data)), content_type=content_type)


@api_router.get("/files/{file_id}")
async def download_file(file_id: str, request: Request, auth: Optional[str] = Query(default=None)):
    await get_current_admin(request, token_override=auth)

    record = await db.files.find_one({"file_id": file_id, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    try:
        data, content_type = await asyncio.to_thread(get_object, record["storage_path"])
    except Exception as exc:
        logger.error("Photo fetch failed for %s: %s", file_id, exc)
        raise HTTPException(status_code=502, detail="Could not load the photo.")
    return Response(content=data, media_type=record.get("content_type", content_type),
                    headers={"Cache-Control": "private, max-age=3600"})


@api_router.post("/leads", response_model=Lead, response_model_by_alias=False, status_code=201)
async def create_lead(payload: LeadCreate, background_tasks: BackgroundTasks):
    data = payload.model_dump()
    photo_ids = data.get("photo_ids") or []
    if photo_ids:
        found = await db.files.find(
            {"file_id": {"$in": photo_ids}, "is_deleted": False}, {"file_id": 1}
        ).to_list(MAX_PHOTOS_PER_LEAD)
        data["photo_ids"] = [f["file_id"] for f in found]
    lead = Lead(**data)
    result = await db.leads.insert_one(lead.to_mongo())
    lead.id = str(result.inserted_id)
    logger.info("New lead captured: %s / %s (%d photos)", lead.name, lead.service,
                len(lead.photo_ids))
    background_tasks.add_task(send_lead_alert, lead)
    return lead


@api_router.get("/leads", response_model=List[Lead], response_model_by_alias=False)
async def list_leads(status: Optional[str] = None, admin: AdminOut = Depends(get_current_admin)):
    query = {"status": status} if status else {}
    docs = await db.leads.find(query).sort("created_at", -1).to_list(500)
    return [Lead.from_mongo(d) for d in docs]


@api_router.get("/leads/stats")
async def lead_stats(admin: AdminOut = Depends(get_current_admin)):
    docs = await db.leads.find({}, {"status": 1, "service": 1, "created_at": 1}).to_list(1000)
    by_status = {s: 0 for s in LEAD_STATUSES}
    by_service: dict = {}
    week_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    this_week = 0
    for d in docs:
        by_status[d.get("status", "new")] = by_status.get(d.get("status", "new"), 0) + 1
        svc = d.get("service", "Unknown")
        by_service[svc] = by_service.get(svc, 0) + 1
        if str(d.get("created_at", "")) >= week_ago:
            this_week += 1
    return {"total": len(docs), "this_week": this_week, "by_status": by_status,
            "by_service": by_service}


@api_router.patch("/leads/{lead_id}", response_model=Lead, response_model_by_alias=False)
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate,
                             admin: AdminOut = Depends(get_current_admin)):
    if payload.status not in LEAD_STATUSES:
        raise HTTPException(status_code=400, detail=f"status must be one of {LEAD_STATUSES}")
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=404, detail="Lead not found")
    doc = await db.leads.find_one_and_update(
        {"_id": ObjectId(lead_id)}, {"$set": {"status": payload.status}}, return_document=True)
    if not doc:
        raise HTTPException(status_code=404, detail="Lead not found")
    return Lead.from_mongo(doc)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.environ["CORS_ORIGINS"].split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.leads.create_index("created_at")
    await db.login_attempts.create_index("identifier", unique=True)
    await db.files.create_index("file_id", unique=True)
    try:
        init_storage()
        logger.info("Object storage initialized")
    except Exception as exc:
        logger.error("Storage init failed: %s", exc)
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({"email": admin_email, "password_hash": hash_password(admin_password),
                                   "name": "Post & Polish Admin", "role": "admin",
                                   "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info("Seeded admin %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                 {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Updated admin password for %s", admin_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
