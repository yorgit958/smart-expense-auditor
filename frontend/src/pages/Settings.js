import React, { useState } from "react";

const card = {
  background: "#111827",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.07)",
  padding: "1.25rem",
  marginBottom: "1rem",
  boxShadow: "0 4px 12px rgba(16,185,129,0.15)",
};

const label = {
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  color: "#6b7280",
  textTransform: "uppercase",
  marginBottom: "0.4rem",
};

const categories = [
  { name: "Food", color: "#10b981" },
  { name: "Transport", color: "#f59e0b" },
  { name: "Shopping", color: "#ef4444" },
  { name: "Utilities", color: "#6366f1" },
  { name: "Others", color: "#a78bfa" },
];

const Settings = () => {
  const [budgets, setBudgets] = useState({
    Food: 5000,
    Transport: 2000,
    Shopping: 3000,
    Utilities: 2500,
    Others: 1000,
  });

  const handleChange = (category, value) => {
    setBudgets((prev) => ({ ...prev, [category]: Number(value) }));
  };

  const handleSave = () => {
    // Save budget to backend here
    alert("Budget saved successfully!");
  };

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
        Settings
      </h1>

      {/* Budget Limits Card */}
      <div style={card}>
        <div style={label}>Budget Limits</div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>
          Set Your Monthly Budget
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: cat.color,
                }}
              ></span>
              <span style={{ flex: 1 }}>{cat.name}</span>
              <input
                type="number"
                value={budgets[cat.name]}
                onChange={(e) => handleChange(cat.name, e.target.value)}
                style={{
                  width: "100px",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #374151",
                  background: "#1f2937",
                  color: "#f9fafb",
                  textAlign: "right",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          style={{
            marginTop: "1.5rem",
            background: "#10b981",
            color: "#f9fafb",
            padding: "0.6rem 1.25rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Save Budget
        </button>
      </div>

      {/* About Card */}
      <div style={card}>
        <div style={label}>About</div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.8rem" }}>
          SmartWallet v2.0
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#d1d5db", lineHeight: "1.5rem" }}>
          AI-powered expense tracking. Built with React, Chart.js, and Claude AI. Supports OCR receipt scanning,
          automatic categorization, and financial insights.
        </p>
      </div>
    </div>
  );
};

export default Settings;