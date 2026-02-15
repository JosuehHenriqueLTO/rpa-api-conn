import os
import requests
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
        self.refres_token = None

    def login(self):
        resp = requests.post(
            TOKEN_URL, json={"username": self.username, "password": self.password}
        )
        resp.raise_for_status()
        tokens = resp.json()
        self.access_token = tokens["access"]
        self.refres_token = tokens["refresh"]

    def get_headers(self):
        if not self.access_token:
            self.login()
            return {"Authorization": f"Bearer {self.access_token}"}
