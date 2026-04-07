from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_bank_data():
    return {"bank": "connected"}