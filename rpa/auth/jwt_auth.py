import os
import requests
import time
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("API_BASE_URL")
TOKEN_URL = f"{BASE_URL}/api/token/"
REFRESH_URL = f"{BASE_URL}/api/token/refresh/"


class JWTAuthClient:
    def __init__(self):
        self.username = os.getenv("RPA_USERNAME")
        self.password = os.getenv("RPA_PASSWORD")
        self.access_token = None
        self.refresh_token = None

    def login(self, retries=10, delay=3):
        for attempt in range(retries):
            try:
                print(f"[JWT] Attempt {attempt + 1}/{retries}")
                print(f"[JWT] POST {TOKEN_URL}")

                resp = requests.post(
                    TOKEN_URL,
                    json={
                        "username": self.username,
                        "password": self.password,
                    },
                    timeout=5,
                )

                print("[JWT] Status:", resp.status_code)
                print("[JWT] Body:", resp.text)

                resp.raise_for_status()

                data = resp.json()
                self.access_token = data["access"]
                self.refresh_token = data.get("refresh")

                print("[JWT] Authenticated!")
                return

            except Exception as e:
                print("[JWT] ERRO REAL:", repr(e))
                time.sleep(delay)

        raise RuntimeError("Backend was not available on time")

    def get_headers(self):
        if not self.access_token:
            self.login()
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
        }
