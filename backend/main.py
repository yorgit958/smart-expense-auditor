from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

# Enable CORS (important for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route
@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

# Transactions route
@app.get("/transactions")
def get_transactions():
    return [
        {"amount": 200, "category": "Food"},
        {"amount": 500, "category": "Shopping"},
        {"amount": 1000, "category": "Rent"}
    ]

# Optional: simple anomaly detection demo
@app.get("/anomaly")
def detect_anomaly():
    data = [50, 60, 55, 500]  # sample data
    avg = sum(data) / len(data)

    anomalies = [x for x in data if x > avg * 2]

    return {"anomalies": anomalies}