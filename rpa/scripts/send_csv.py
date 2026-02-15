import pandas as pd
import requests

API_URL = "http://127.0.0.1:8000/api/health/"

df = pd.DataFrame([{"status": "ok"}])

response = requests.post(API_URL, json=df.to_dict(orient="records"))
print(response.status_code, response.text)
