"""Tests for POST /api/uploads, GET /api/files/{id}, and lead photo_ids integration."""
import io
import os
import re
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values
from PIL import Image
from pymongo import MongoClient

FRONTEND_ENV = dotenv_values("/app/frontend/.env")
BACKEND_ENV = dotenv_values("/app/backend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or FRONTEND_ENV.get("REACT_APP_BACKEND_URL", "")).rstrip("/")
API_URL = f"{BASE_URL}/api"
RUN_ID = uuid.uuid4().hex[:8]
TEST_PREFIX = f"TEST_QA_UP_{RUN_ID}"


def _credentials():
    text = Path("/app/memory/test_credentials.md").read_text(encoding="utf-8")
    email = re.search(r"(?im)^- Email:\s*`?([^`\s]+)", text).group(1)
    password = re.search(r"(?im)^- Password:\s*`?([^`\s]+)", text).group(1)
    return email, password


def _make_image_bytes(fmt="JPEG", size=(80, 60), color=(200, 120, 40)):
    img = Image.new("RGB", size, color)
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    return buf.getvalue()


@pytest.fixture(scope="module")
def s():
    return requests.Session()


@pytest.fixture(scope="module")
def auth_headers(s):
    email, password = _credentials()
    r = s.post(f"{API_URL}/auth/login", json={"email": email, "password": password}, timeout=20)
    assert r.status_code == 200, r.text
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


@pytest.fixture(scope="module")
def mongo():
    client = MongoClient(BACKEND_ENV["MONGO_URL"], serverSelectionTimeoutMS=3000)
    db = client[BACKEND_ENV["DB_NAME"]]
    yield db
    # cleanup
    db.leads.delete_many({"name": {"$regex": "^TEST_QA_UP_"}})
    db.login_attempts.delete_many({})
    client.close()


class TestUploads:
    uploaded = {}

    def test_01_upload_jpeg_success(self, s, mongo):
        data = _make_image_bytes("JPEG")
        r = s.post(f"{API_URL}/uploads",
                   files={"file": ("shot.jpg", data, "image/jpeg")}, timeout=30)
        assert r.status_code == 201, r.text
        body = r.json()
        assert set(body.keys()) >= {"file_id", "filename", "size", "content_type"}
        assert body["content_type"] == "image/jpeg"
        assert body["size"] == len(data)
        TestUploads.uploaded["jpeg"] = body
        TestUploads.uploaded["jpeg_bytes"] = data
        # DB record present
        rec = mongo.files.find_one({"file_id": body["file_id"]})
        assert rec is not None
        assert rec["is_deleted"] is False
        assert rec["storage_path"].startswith("ne-post-and-polish/lead-photos/")

    def test_02_upload_png_success(self, s):
        data = _make_image_bytes("PNG")
        r = s.post(f"{API_URL}/uploads",
                   files={"file": ("shot.png", data, "image/png")}, timeout=30)
        assert r.status_code == 201, r.text
        TestUploads.uploaded["png"] = r.json()

    def test_03_upload_rejects_non_image(self, s, mongo):
        r = s.post(f"{API_URL}/uploads",
                   files={"file": ("bad.txt", b"hello", "text/plain")}, timeout=30)
        assert r.status_code == 400
        assert "JPEG" in r.json()["detail"]

        r2 = s.post(f"{API_URL}/uploads",
                    files={"file": ("bad.pdf", b"%PDF-1.4", "application/pdf")}, timeout=30)
        assert r2.status_code == 400

    def test_04_upload_rejects_empty(self, s):
        r = s.post(f"{API_URL}/uploads",
                   files={"file": ("empty.jpg", b"", "image/jpeg")}, timeout=30)
        assert r.status_code == 400
        assert "empty" in r.json()["detail"].lower()

    def test_05_upload_rejects_oversize(self, s):
        big = b"\xff" * (10 * 1024 * 1024 + 10)
        r = s.post(f"{API_URL}/uploads",
                   files={"file": ("big.jpg", big, "image/jpeg")}, timeout=60)
        assert r.status_code == 413, r.text

    def test_06_download_requires_auth(self, s):
        fid = TestUploads.uploaded["jpeg"]["file_id"]
        r = requests.get(f"{API_URL}/files/{fid}", timeout=20)
        assert r.status_code == 401

    def test_07_download_with_bearer(self, s, auth_headers):
        info = TestUploads.uploaded["jpeg"]
        r = s.get(f"{API_URL}/files/{info['file_id']}", headers=auth_headers, timeout=30)
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("image/jpeg")
        assert r.content == TestUploads.uploaded["jpeg_bytes"]

    def test_08_download_with_query_auth(self, s, auth_headers):
        info = TestUploads.uploaded["jpeg"]
        token = auth_headers["Authorization"].split(" ", 1)[1]
        r = requests.get(f"{API_URL}/files/{info['file_id']}?auth={token}", timeout=30)
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("image/jpeg")
        assert len(r.content) == info["size"]

    def test_09_download_unknown_id_404(self, s, auth_headers):
        r = s.get(f"{API_URL}/files/{uuid.uuid4()}", headers=auth_headers, timeout=20)
        assert r.status_code == 404

    def test_10_lead_with_photo_ids_filters_bogus(self, s, auth_headers, mongo):
        valid_id = TestUploads.uploaded["jpeg"]["file_id"]
        payload = {
            "name": f"{TEST_PREFIX}_lead_with_photos",
            "contact": "qa+photos@example.test",
            "address": "77 Storage Way",
            "service": "The Standard — replacement",
            "photo_ids": [valid_id, "bogus-id-xxxxx"],
        }
        r = s.post(f"{API_URL}/leads", json=payload, timeout=20)
        assert r.status_code == 201, r.text
        lead = r.json()
        assert lead["photo_ids"] == [valid_id]
        # verify from admin API
        lst = s.get(f"{API_URL}/leads", headers=auth_headers, timeout=20).json()
        found = next(l for l in lst if l["id"] == lead["id"])
        assert found["photo_ids"] == [valid_id]

    def test_11_lead_without_photo_ids_defaults_empty(self, s):
        r = s.post(f"{API_URL}/leads", json={
            "name": f"{TEST_PREFIX}_no_photos",
            "contact": "qa+nophotos@example.test",
            "address": "1 Nowhere",
            "service": "The Standard — replacement",
        }, timeout=20)
        assert r.status_code == 201
        assert r.json()["photo_ids"] == []

    def test_12_lead_with_more_than_5_photos_rejected(self, s):
        ids = [str(uuid.uuid4()) for _ in range(6)]
        r = s.post(f"{API_URL}/leads", json={
            "name": f"{TEST_PREFIX}_toomany",
            "contact": "qa+too@example.test",
            "address": "1 Too Many",
            "service": "The Standard — replacement",
            "photo_ids": ids,
        }, timeout=20)
        assert r.status_code == 422, r.text
