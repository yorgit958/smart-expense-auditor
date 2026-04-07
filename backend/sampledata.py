# backend/sampledata.py
import asyncio
from .database import AsyncSessionLocal
from .models import User, Expense, Budget
from datetime import datetime

async def create_sample_data():
    async with AsyncSessionLocal() as session:
        # Create demo user
        user = User(email="demo@wallet.com", hashed_password="demo123", full_name="Demo User")
        session.add(user)
        await session.commit()

        # Add sample expenses
        expenses = [
            Expense(user_id=user.id, merchant="Groceries", amount=1200, category="Food", date="2026-04-01"),
            Expense(user_id=user.id, merchant="Electricity", amount=800, category="Utilities", date="2026-04-02"),
            Expense(user_id=user.id, merchant="Netflix", amount=150, category="Utilities", date="2026-04-03"),
            Expense(user_id=user.id, merchant="Restaurant", amount=450, category="Food", date="2026-04-05"),
            Expense(user_id=user.id, merchant="Fuel", amount=1000, category="Transport", date="2026-04-06"),
        ]
        session.add_all(expenses)
        await session.commit()

        # Add sample budgets
        budgets = [
            Budget(user_id=user.id, category="Food", limit_amount=5000),
            Budget(user_id=user.id, category="Transport", limit_amount=2000),
            Budget(user_id=user.id, category="Utilities", limit_amount=3000),
        ]
        session.add_all(budgets)
        await session.commit()
        print("Sample data inserted ✅")

if __name__ == "__main__":
    asyncio.run(create_sample_data())