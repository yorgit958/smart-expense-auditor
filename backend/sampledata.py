from .models import Expense, Budget
from .database import SessionLocal, engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    session = SessionLocal()
    
    # Clear old data
    session.query(Expense).delete()
    session.query(Budget).delete()

    # Sample Expenses
    expenses = [
        Expense(description="Groceries", amount=1200, date="2026-04-01"),
        Expense(description="Electricity Bill", amount=800, date="2026-04-02"),
        Expense(description="Netflix", amount=150, date="2026-04-03"),
        Expense(description="Restaurant", amount=450, date="2026-04-05"),
        Expense(description="Fuel", amount=1000, date="2026-04-06"),
        Expense(description="Shopping", amount=2200, date="2026-04-07"),
    ]

    # Sample Budgets
    budgets = [
        Budget(category="Food", limit_amount=5000),
        Budget(category="Entertainment", limit_amount=2000),
        Budget(category="Transport", limit_amount=1500),
    ]

    session.add_all(expenses + budgets)
    session.commit()
    session.close()
    print("Sample data seeded successfully!")

if __name__ == "__main__":
    seed_data()