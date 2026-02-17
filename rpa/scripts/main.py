import os
import csv
import requests
import pandas as pd
from pathlib import Path
from auth.jwt_auth import JWTAuthClient

# Configuration
BASE_URL = os.getenv("API_BASE_URL")
EXPORT_URL = f"{BASE_URL}/api/export/"
IMPORT_URL = f"{BASE_URL}/api/products/bulk/"

# Path setup
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

EXPORT_CSV = DATA_DIR / "products_exported.csv"
IMPORT_CSV = DATA_DIR / "products.csv"


def export_products(headers):
    print("[EXPORT] Fetching products from backend...")

    response = requests.get(EXPORT_URL, headers=headers)
    response.raise_for_status()

    products = response.json()

    with open(EXPORT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["id", "name", "product_type", "description"]
        )
        writer.writeheader()
        writer.writerows(products)

    print(f"[EXPORT] {len(products)} products exported → {EXPORT_CSV}")


def import_products(headers):
    print("[IMPORT] Reading CSV for import...")

    df = pd.read_csv(IMPORT_CSV)
    data = df.to_dict(orient="records")

    response = requests.post(
        IMPORT_URL,
        json=data,
        headers=headers,
    )
    response.raise_for_status()

    print(f"[IMPORT] {len(data)} products successfully imported")


def main():
    print("[RPA] Starting product workflow...")

    # Authentication
    auth = JWTAuthClient()
    headers = auth.get_headers()

    # Process execution
    export_products(headers)
    import_products(headers)

    print("[RPA] Workflow completed successfully")


if __name__ == "__main__":
    main()
