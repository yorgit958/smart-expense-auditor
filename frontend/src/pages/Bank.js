import React, { useState, useEffect } from "react";

const card = {
  background: "#111827",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.07)",
  padding: "1.25rem",
  marginBottom: "1rem",
  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
  transition: "0.3s",
  cursor: "pointer",
};

const label = {
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  color: "#6b7280",
  textTransform: "uppercase",
  marginBottom: "0.4rem",
};

const Bank = () => {
  const [balance, setBalance] = useState(50000); // sample balance
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 40000, date: "2026-04-01" },
    { id: 2, description: "Grocery", amount: -1200, date: "2026-04-03" },
    { id: 3, description: "Electricity Bill", amount: -800, date: "2026-04-05" },
    { id: 4, description: "Netflix", amount: -150, date: "2026-04-06" },
    { id: 5, description: "Fuel", amount: -1000, date: "2026-04-07" },
  ]);

  useEffect(() => {
    // Here you can fetch real bank balance and transactions from backend
    // Example:
    // fetch("/api/bank/balance").then(res => res.json()).then(data => setBalance(data.balance))
  }, []);

  return (
    <div
      style={{
        flex: 1,
        background: "#0d1117",
        minHeight: "100%",
        padding: "2rem",
        color: "#f9fafb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem" }}>
        Bank Account
      </h1>

      {/* Bank Balance Card */}
      <div
        style={card}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(16,185,129,0.35)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(16,185,129,0.15)")}
      >
        <div style={label}>Bank Balance</div>
        <div style={{ fontSize: "2rem", fontWeight: "700", color: "#10b981" }}>
          ₹{balance.toLocaleString()}
        </div>
      </div>

      {/* Recent Transactions Card */}
      <div
        style={card}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(16,185,129,0.35)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(16,185,129,0.15)")}
      >
        <div style={label}>Recent Transactions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {transactions.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                background: "#1f2937",
              }}
            >
              <span>{t.description}</span>
              <span style={{ color: t.amount > 0 ? "#10b981" : "#ef4444", fontWeight: "600" }}>
                ₹{t.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bank;