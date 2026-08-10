"""Regression tests for lead CRUD/status, admin auth, security controls, and API validation."""
import os
import re
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values
from pymongo import MongoClient

FRONTEND_ENV = dotenv_values("/app/frontend/.env")
BACKEND_ENV = dotenv_values("/app/backend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or FRONTEND_ENV.get("REACT_APP_BACKEND_URL", "")).rstrip("/")
if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL is not configured")
API_URL = f"{BASE_URL}/api"
RUN_ID = uuid.uuid4().hex[:10]
TEST_PREFIX = f"TEST_QA_{RUN_ID}"


def _credentials():
    path = Path("/app/memory/test_credentials.md")
    if not path.exists():
        pytest.skip("Missing /app/memory/test_credentials.md")
    text = path.read_text(encoding="utf-8")
    email = re.search(r"(?im)^- Email:\s*`?([^`\s]+)", text)
    password = re.search(r"(?im)^- Password:\s*`?([^`\s]+)", text)
    if not email or not password:
        pytest.skip("Admin email/password missing from test_credentials.md")
    return email.group(1), password.group(1)


@pytest.fixture(scope="session")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    yield session
    session.close()


@pytest.fixture(scope="session")
def admin_credentials():
    return _credentials()


@pytest.fixture(scope="session")
def auth_data(api_client, admin_credentials):
    email, password = admin_credentials
    response = api_client.post(f"{API_URL}/auth/login", json={"email": email, "password": password}, timeout=20)
    if response.status_code != 200:
        pytest.fail(f"Valid admin login failed: {response.status_code} {response.text[:300]}")
    data = response.json()
    if not data.get("access_token"):
        pytest.fail("Valid login response omitted access_token")
    return data


@pytest.fixture(scope="session")
def auth_headers(auth_data):
    return {"Authorization": f"Bearer {auth_data['access_token']}"}


@pytest.fixture(scope="session", autouse=True)
def cleanup_test_leads():
    yield
    mongo_url = BACKEND_ENV.get("MONGO_URL")
    db_name = BACKEND_ENV.get("DB_NAME")
    if mongo_url and db_name:
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=3000)
        client[db_name].leads.delete_many({"name": {"$regex": "^TEST_QA_"}})
        client.close()


class TestApi:
    created_id = None

    def test_01_health(self, api_client):
        response = api_client.get(f"{API_URL}/", timeout=20)
        assert response.status_code == 200
        assert response.json() == {"service": "post-and-polish", "status": "ok"}

    def test_02_protected_routes_reject_missing_token(self, api_client):
        session = requests.Session()
        checks = [
            session.get(f"{API_URL}/leads", timeout=20),
            session.get(f"{API_URL}/leads/stats", timeout=20),
            session.patch(f"{API_URL}/leads/507f1f77bcf86cd799439011", json={"status": "contacted"}, timeout=20),
            session.get(f"{API_URL}/auth/me", timeout=20),
        ]
        for response in checks:
            assert response.status_code == 401, response.text
            assert response.json().get("detail") == "Not authenticated"

    def test_03_wrong_password_rejected(self, api_client, admin_credentials):
        email, _ = admin_credentials
        response = api_client.post(f"{API_URL}/auth/login", json={"email": email, "password": "definitely-wrong"}, timeout=20)
        assert response.status_code == 401
        assert response.json() == {"detail": "Invalid email or password"}

    def test_04_valid_login_response_and_cookies(self, auth_data, api_client, admin_credentials):
        email, password = admin_credentials
        response = api_client.post(f"{API_URL}/auth/login", json={"email": email, "password": password}, timeout=20)
        assert response.status_code == 200
        data = response.json()
        assert data["user"]["email"] == email
        assert data["user"]["role"] == "admin"
        assert isinstance(data["user"]["id"], str) and data["user"]["id"]
        assert isinstance(data["access_token"], str) and data["access_token"]
        cookie_header = response.headers.get("set-cookie", "").lower()
        assert "access_token=" in cookie_header and "refresh_token=" in cookie_header
        assert cookie_header.count("httponly") >= 2
        assert cookie_header.count("secure") >= 2

    def test_05_auth_me_with_bearer(self, api_client, auth_headers, admin_credentials):
        email, _ = admin_credentials
        response = api_client.get(f"{API_URL}/auth/me", headers=auth_headers, timeout=20)
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == email
        assert data["role"] == "admin"

    @pytest.mark.parametrize("payload", [
        {"contact": "qa@example.test", "address": "1 Test Way", "service": "The Standard — replacement"},
        {"name": "", "contact": "qa@example.test", "address": "1 Test Way", "service": "The Standard — replacement"},
        {"name": "TEST", "contact": "", "address": "1 Test Way", "service": "The Standard — replacement"},
        {"name": "TEST", "contact": "qa@example.test", "address": "", "service": "The Standard — replacement"},
        {"name": "TEST", "contact": "qa@example.test", "address": "1 Test Way", "service": ""},
    ])
    def test_06_missing_or_empty_required_lead_fields_rejected(self, api_client, payload):
        response = api_client.post(f"{API_URL}/leads", json=payload, timeout=20)
        assert response.status_code == 422, response.text
        assert isinstance(response.json().get("detail"), list)

    def test_07_whitespace_only_required_fields_rejected(self, api_client):
        payload = {"name": f"{TEST_PREFIX}   ", "contact": "   ", "address": "   ", "service": "   ", "notes": None}
        response = api_client.post(f"{API_URL}/leads", json=payload, timeout=20)
        assert response.status_code == 422, response.text

    def test_08_create_lead_and_verify_persistence(self, api_client, auth_headers):
        payload = {
            "name": f"{TEST_PREFIX}_Backend Lead",
            "contact": "qa.backend@example.test",
            "address": "1420 Test Lane",
            "service": "The Landscape — full curbside design",
            "notes": "Backend regression lead",
        }
        response = api_client.post(f"{API_URL}/leads", json=payload, timeout=20)
        assert response.status_code == 201, response.text
        created = response.json()
        TestApi.created_id = created.get("id") or created.get("_id")
        assert "id" in created, f"Public API returned Mongo alias _id instead of id: {created}"
        assert isinstance(created["id"], str) and len(created["id"]) == 24
        assert created["status"] == "new"
        for field, expected in payload.items():
            assert created[field] == expected

        listed = api_client.get(f"{API_URL}/leads", headers=auth_headers, timeout=20)
        assert listed.status_code == 200
        match = next((lead for lead in listed.json() if (lead.get("id") or lead.get("_id")) == TestApi.created_id), None)
        assert match is not None
        assert match["name"] == payload["name"] and match["status"] == "new"

    def test_09_leads_are_newest_first(self, api_client, auth_headers):
        response = api_client.get(f"{API_URL}/leads", headers=auth_headers, timeout=20)
        assert response.status_code == 200
        leads = response.json()
        assert isinstance(leads, list)
        created_values = [lead["created_at"] for lead in leads]
        assert created_values == sorted(created_values, reverse=True)

    def test_10_stats_structure_and_values(self, api_client, auth_headers):
        leads_response = api_client.get(f"{API_URL}/leads", headers=auth_headers, timeout=20)
        stats_response = api_client.get(f"{API_URL}/leads/stats", headers=auth_headers, timeout=20)
        assert leads_response.status_code == stats_response.status_code == 200
        leads = leads_response.json()
        stats = stats_response.json()
        assert stats["total"] == len(leads)
        assert isinstance(stats["this_week"], int) and 0 <= stats["this_week"] <= stats["total"]
        assert set(["new", "contacted", "scheduled", "completed", "lost"]).issubset(stats["by_status"])
        assert sum(stats["by_status"].values()) == stats["total"]
        assert sum(stats["by_service"].values()) == stats["total"]

    def test_11_patch_returns_updated_document_and_persists(self, api_client, auth_headers):
        response = api_client.patch(f"{API_URL}/leads/{TestApi.created_id}", json={"status": "contacted"}, headers=auth_headers, timeout=20)
        assert response.status_code == 200, response.text
        assert (response.json().get("id") or response.json().get("_id")) == TestApi.created_id
        assert response.json()["status"] == "contacted"
        listed = api_client.get(f"{API_URL}/leads?status=contacted", headers=auth_headers, timeout=20)
        assert listed.status_code == 200
        match = next((lead for lead in listed.json() if (lead.get("id") or lead.get("_id")) == TestApi.created_id), None)
        assert match is not None and match["status"] == "contacted"

    def test_12_patch_invalid_status_and_ids(self, api_client, auth_headers):
        bad_status = api_client.patch(f"{API_URL}/leads/{TestApi.created_id}", json={"status": "invalid"}, headers=auth_headers, timeout=20)
        assert bad_status.status_code == 400
        assert "status must be one of" in bad_status.json().get("detail", "")
        for lead_id in ["not-an-object-id", "507f1f77bcf86cd799439011"]:
            response = api_client.patch(f"{API_URL}/leads/{lead_id}", json={"status": "contacted"}, headers=auth_headers, timeout=20)
            assert response.status_code == 404
            assert response.json() == {"detail": "Lead not found"}

    def test_13_admin_password_hash_is_bcrypt_2b(self):
        mongo_url = BACKEND_ENV.get("MONGO_URL")
        db_name = BACKEND_ENV.get("DB_NAME")
        admin_email = BACKEND_ENV.get("ADMIN_EMAIL")
        assert mongo_url and db_name and admin_email
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=3000)
        user = client[db_name].users.find_one({"email": admin_email.lower()})
        client.close()
        assert user is not None
        assert user["password_hash"].startswith("$2b$")

    def test_14_cors_does_not_allow_arbitrary_origins_with_credentials(self):
        response = requests.options(
            f"{API_URL}/auth/login",
            headers={"Origin": "https://evil.example", "Access-Control-Request-Method": "POST"},
            timeout=20,
        )
        assert response.headers.get("access-control-allow-origin") is None

    def test_15_brute_force_lockout_after_five_failures(self, admin_credentials):
        email, _ = admin_credentials
        statuses = []
        for i in range(6):
            response = requests.post(f"{API_URL}/auth/login", json={"email": email, "password": f"wrong-{RUN_ID}-{i}"}, timeout=20)
            statuses.append(response.status_code)
        assert statuses[:5] == [401] * 5
        assert statuses[5] == 429, f"Expected lockout on sixth attempt, got statuses {statuses}"
