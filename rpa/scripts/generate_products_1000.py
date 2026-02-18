import csv
import random
from pathlib import Path

# OUTPUT_PATH = Path("products_1000.csv")
BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR.parent / "data" / "products.csv"
CSV_PATH.parent.mkdir(exist_ok=True)

PRODUCTS_BASE = [
    ("USB Mouse", "Electronics", "Wired USB mouse with high precision"),
    ("Mechanical Keyboard", "Electronics", "Mechanical keyboard with blue switches"),
    ("24 Inch Monitor", "Electronics", "Full HD monitor for work and gaming"),
    ("Laptop i5", "Electronics", "Laptop with Intel i5 processor and SSD"),
    (
        "Bluetooth Headphones",
        "Electronics",
        "Wireless headphones with noise cancellation",
    ),
    ("Python Book", "Book", "Learn Python from beginner to advanced"),
    ("Django Book", "Book", "Web development with Django"),
    ("Clean Code Book", "Book", "Best practices for clean and maintainable code"),
    ("University Notebook", "Stationery", "Notebook with 200 pages"),
    ("Blue Pen", "Stationery", "Blue ballpoint pen"),
    ("Laptop Backpack", "Accessories", "Durable backpack for up to 15-inch laptops"),
    ("HDMI Cable", "Accessories", "High-speed HDMI 2.0 cable"),
    ("External Hard Drive 1TB", "Electronics", "Portable 1TB external storage"),
    ("USB Flash Drive 64GB", "Electronics", "USB 3.0 flash drive with 64GB capacity"),
    ("Multifunction Printer", "Electronics", "Printer with scanner and copier"),
    ("Gaming Mousepad", "Accessories", "Large mousepad with non-slip base"),
    ("Full HD Webcam", "Electronics", "1080p webcam for video conferencing"),
    ("Laptop Stand", "Accessories", "Adjustable ergonomic laptop stand"),
    ("Algorithms Book", "Book", "Introduction to algorithms and programming logic"),
    ("ATX Power Supply 600W", "Electronics", "600W certified power supply"),
]

VARIATIONS = [
    "Standard",
    "Pro",
    "Plus",
    "Premium",
    "Advanced",
    "Compact",
    "Wireless",
    "USB-C",
]


def generate_products(total=1000):
    products = []

    for i in range(1, total + 1):
        base_name, product_type, description = random.choice(PRODUCTS_BASE)
        variation = random.choice(VARIATIONS)

        name = f"{base_name} {variation}"
        full_description = f"{description}. {variation} model – batch {i}."

        monthly_sales = random.randint(5, 500)

        products.append(
            {
                "name": name,
                "product_type": product_type,
                "description": full_description,
                "monthly_sales": monthly_sales,
            }
        )

    return products


# BASE_DIR = Path(__file__).resolve().parent
# CSV_PATH = BASE_DIR.parent / "data" / "products_exported.csv"
# CSV_PATH.parent.mkdir(exist_ok=True)

# with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:


def main():
    products = generate_products(1000)

    with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["name", "product_type", "description", "monthly_sales"]
        )
        writer.writeheader()
        writer.writerows(products)

    print(f"CSV generated successfully: {CSV_PATH} ({len(products)} products)")


if __name__ == "__main__":
    main()
