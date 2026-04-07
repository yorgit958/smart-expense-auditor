from datetime import datetime

# Hardcoded demo receipt items
FAKE_ITEMS = {
    "Apples": {"category": "Food", "unit_price": 150.0, "quantity": "2 kg", "total": 300.0},
    "Bread": {"category": "Food", "unit_price": 45.0, "quantity": "1 loaf", "total": 45.0},
    "Milk": {"category": "Food", "unit_price": 60.0, "quantity": "2L", "total": 120.0},
    "Chicken": {"category": "Food", "unit_price": 250.0, "quantity": "1.5 kg", "total": 375.0},
    "Snack Chips": {"category": "Food", "unit_price": 50.0, "quantity": "3 Packs", "total": 150.0},
    "Detergent": {"category": "Utilities", "unit_price": 180.0, "quantity": "1 Bottle", "total": 180.0},
}

def parse_bill(file=None) -> dict:
    """
    Fake ML parser: ignores the file and returns demo receipt items.
    """
    items = []
    total_amount = 0.0
    today = datetime.today().strftime("%Y-%m-%d")

    for name, data in FAKE_ITEMS.items():
        items.append({
            "description": name,
            "amount": data["total"],
            "category": data["category"],
            "date": today,
            "quantity": data["quantity"],
            "unit_price": data["unit_price"]
        })
        total_amount += data["total"]

    return {"items": items, "total": total_amount}