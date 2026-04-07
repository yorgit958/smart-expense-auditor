from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from ..database import AsyncSessionLocal, Expense
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
import json

router = APIRouter(prefix="/upload-bill", tags=["Upload Bill"])

# Dummy ML parser for now
async def parse_bill(file: UploadFile):
    # Here you would call your ML model to extract expenses
    # For demo, return a fixed example
    return {
        "items": [
            {"description": "Coffee", "amount": 150.0, "category": "Food", "date": "2026-04-07"},
            {"description": "Groceries", "amount": 800.0, "category": "Shopping", "date": "2026-04-07"}
        ],
        "total": 950.0
    }

@router.post("/")
async def upload_bill(file: UploadFile = File(...)):
    parsed_data = await parse_bill(file)

    # Save to database
    async with AsyncSessionLocal() as session:  # type: AsyncSession
        for item in parsed_data["items"]:
            expense = Expense(
                user_id=1,  # hardcoded user for demo, replace with actual user
                merchant=item["description"],
                amount=item["amount"],
                category=item["category"],
                date=item["date"],
                items=[item]
            )
            session.add(expense)
        await session.commit()

    return JSONResponse(content=parsed_data)