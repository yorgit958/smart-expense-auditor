# 💰 Smart Expense Auditor

## 📌 Overview

The **Smart Expense Auditor** is a full-stack web application designed to help users track, analyze, and visualize their spending patterns. It combines real-time transaction monitoring with intelligent insights to provide better financial awareness.

This project demonstrates a scalable architecture integrating **data ingestion, backend APIs, and frontend visualization**.

---

## 🚀 Features

* 📊 **Expense Visualization**

  * Interactive Pie Chart showing category-wise spending
  * Total spend calculation for quick insights

* 🧾 **Transaction Tracking**

  * Displays categorized transactions (Food, Shopping, Rent, etc.)

* 🧠 **Anomaly Detection (Basic)**

  * Identifies unusually high expenses using simple logic

* ⚡ **Real-time API Integration**

  * Frontend fetches data dynamically from backend

---

## 🏗️ Tech Stack

### Frontend

* **React.js**
* **Axios** (API calls)
* **Chart.js / react-chartjs-2** (Data visualization)

### Backend

* **FastAPI (Python)**
* REST API architecture
* CORS enabled for frontend integration

### Database

* **PostgreSQL (Supabase)**
* Designed schema for users and transactions

---

## 🧩 Project Structure

```
smart-expense-auditor/
│
├── backend/        # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│
├── frontend/       # React frontend
│   ├── src/
│   ├── package.json
│
├── database/       # SQL schema
│   ├── schema.sql
│
├── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/<your-username>/smart-expense-auditor.git
cd smart-expense-auditor
```

---

### 2️⃣ Backend Setup (FastAPI)

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup (React)

```
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Endpoint        | Description              |
| --------------- | ------------------------ |
| `/`             | Health check             |
| `/transactions` | Returns transaction data |
| `/anomaly`      | Detects unusual spending |

---

## 📊 Sample Output

* Total Spend: ₹1700
* Categories:

  * Food
  * Shopping
  * Rent

---

## 🔒 Security Considerations

* CORS enabled for development
* Scalable to support:

  * AES-256 encryption
  * Secure API integrations (Plaid, Salt Edge)

---

## 🔮 Future Enhancements

* 🧾 OCR-based receipt scanning (Tesseract / Google Vision API)
* 🏦 Bank API integration (Plaid)
* 📈 Advanced ML anomaly detection (Isolation Forest)
* 📱 Mobile app (React Native / Flutter)
* 🔔 Smart alerts & budgeting insights

---

## 🧠 Problem Statement

Managing personal finances manually is inefficient and error-prone. This project aims to automate expense tracking and provide intelligent insights for better financial decisions.

---

## 💡 Solution

The Smart Expense Auditor:

* Automates transaction tracking
* Categorizes expenses
* Visualizes spending patterns
* Detects anomalies in spending behavior

---

## 👨‍💻 Author

**Roy Alfred**

---

## ⭐ Conclusion

This project showcases a **modern full-stack application** with real-time data handling, visualization, and intelligent analysis. It serves as a foundation for building scalable fintech solutions.
