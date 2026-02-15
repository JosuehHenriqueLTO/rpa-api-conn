import csv
import requests
from pathlib import Path
from auth.jwt_auth import JWTAuthClient

API_URL = "http://127.0.0.1:8000/api/export/"


auth = JWTAuthClient()
headers = auth.get_headers()

# BASE_DIR = Path(__file__).resolve().parent
# DATA_DIR = BASE_DIR.parent / "data"
# DATA_DIR.mkdir(exist_ok=True)

# CSV_PATH = DATA_DIR / "products_exported.csv"


response = requests.get(API_URL, headers=headers)
response.raise_for_status()

products = response.json()

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR.parent / "data" / "products_exported.csv"

with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=["id", "name", "product_type", "description"]
    )
    writer.writeheader()
    writer.writerows(products)

print("Exported successfully!")
