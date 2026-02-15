import pandas as pd
import requests
from pathlib import Path
from auth.jwt_auth import JWTAuthClient

API_URL = "http://127.0.0.1:8000/api/products/bulk/"


auth = JWTAuthClient()
headers = auth.get_headers()

# BASE_DIR = Path(__file__).resolve().parent
# CSV_PATH = BASE_DIR.parent / "data" / "products.csv"

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR.parent / "data" / "products.csv"

df = pd.read_csv(CSV_PATH)
data = df.to_dict(orient="records")

response = requests.post(API_URL, json=data, headers=headers)
response.raise_for_status()

print("Total:", len(data))

# df = pd.read_csv("../data/products.csv")
# data = df.to_dict(orient="records")

# response = requests.post(API_URL, json=data, headers=headers)
# response.raise_for_status()

# print("Total:", len(data))
# print("Response:", response.json())
