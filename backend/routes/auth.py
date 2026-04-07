# backend/routes/auth.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.hash import bcrypt
from ..database import get_db, User

router = APIRouter(prefix="/auth", tags=["auth"])

# Signup
@router.post("/signup")
async def signup(email: str, password: str, full_name: str = "", db: AsyncSession = Depends(get_db)):
    # Check if user exists
    result = await db.execute(User.__table__.select().where(User.email == email))
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = bcrypt.hash(password)
    new_user = User(email=email, hashed_password=hashed, full_name=full_name)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"id": new_user.id, "email": new_user.email, "full_name": new_user.full_name}

# Login
@router.post("/login")
async def login(email: str, password: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(User.__table__.select().where(User.email == email))
    user = result.scalar_one_or_none()
    if not user or not bcrypt.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": f"Welcome back, {user.full_name or user.email}!"}