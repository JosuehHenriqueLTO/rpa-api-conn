import csv
import os
import requests
from pathlib import Path
from auth.jwt_auth import JWTAuthClient

BASE_URL = os.getenv("API_BASE_URL")
API_URL = f"{BASE_URL}/api/export/"

auth = JWTAuthClient()
headers = auth.get_headers()

response = requests.get(API_URL, headers=headers)
response.raise_for_status()

products = response.json()

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR.parent / "data" / "products_exported.csv"
CSV_PATH.parent.mkdir(exist_ok=True)

with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["id", "name", "product_type", "description"]
    )
    writer.writeheader()
    writer.writerows(products)

print("Exported successfully!")
