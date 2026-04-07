import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const monthlyBudget = 10000;
const categoryColors = { Food: "#10b981", Transport: "#f59e0b", Shopping: "#ef4444", Utilities: "#6366f1" };

const cardStyle = {
  background: "rgba(17,24,39,0.85)",
  borderRadius: "14px",
  padding: "1.25rem",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "0.3s",
};

const Dashboard = ({ initialTransactions = [] }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [totalSpent, setTotalSpent] = useState(0);
  const [remaining, setRemaining] = useState(monthlyBudget);
  const [avgPerDay, setAvgPerDay] = useState(0);

  // Recalculate totals whenever transactions change
  useEffect(() => {
    const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
    setTotalSpent(spent);
    setRemaining(monthlyBudget - spent);
    const days = new Set(transactions.map((t) => t.date));
    setAvgPerDay(days.size ? spent / days.size : 0);
  }, [transactions]);

  // Add new expenses
  const addExpenses = (newExpenses) => {
    const formatted = newExpenses.map((e, idx) => ({
      id: transactions.length + idx + 1,
      description: e.description || e.merchant || "Manual Entry",
      amount: parseFloat(e.amount),
      date: e.date || new Date().toISOString().slice(0, 10),
      category: e.category || "Others",
    }));
    setTransactions((prev) => [...prev, ...formatted]);
  };

  // Handle fake ML upload
  const handleUpload = (file) => {
    // For demo, use hardcoded fake ML items
    const parsedItems = [
      { description: "Apples", amount: 300, category: "Food", date: "2026-04-08" },
      { description: "Bread", amount: 45, category: "Food", date: "2026-04-08" },
      { description: "Milk", amount: 120, category: "Food", date: "2026-04-08" },
      { description: "Chicken", amount: 375, category: "Food", date: "2026-04-08" },
      { description: "Snack Chips", amount: 150, category: "Food", date: "2026-04-08" },
      { description: "Detergent", amount: 180, category: "Utilities", date: "2026-04-08" },
    ];
    addExpenses(parsedItems);
  };

  const summaryCards = [
    { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, color: "#10b981" },
    { label: "Remaining Budget", value: `₹${remaining.toLocaleString()}`, color: "#f59e0b" },
    { label: "Transactions", value: transactions.length, color: "#818cf8" },
    { label: "Avg / Day", value: `₹${avgPerDay.toFixed(0)}`, color: "#f9fafb" },
  ];

  const pieData = {
    labels: Object.keys(categoryColors),
    datasets: [{
      data: Object.keys(categoryColors).map(cat =>
        transactions.filter(t => t.category === cat).reduce((s, t) => s + t.amount, 0)
      ),
      backgroundColor: Object.values(categoryColors),
      borderWidth: 0,
      cutout: "80%",
    }],
  };

  const lineData = {
    labels: transactions.map(t => t.date.slice(8)),
    datasets: [{
      label: "Daily Spend",
      data: transactions.map(t => t.amount),
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.08)",
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#10b981",
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#9ca3af" } },
      y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#9ca3af" } },
    },
  };

  return (
    <div style={{ padding: "2rem", background: "#0d1117", minHeight: "100vh", color: "#f9fafb" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.25rem" }}>Dashboard</h1>
          <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>April 2026 · Good morning 👋</p>
        </div>
        <button style={{
          background: "rgba(16,185,129,0.15)", border: "1px solid #10b981",
          color: "#10b981", padding: "0.5rem 1rem", borderRadius: "8px",
          cursor: "pointer", fontSize: "0.8rem", fontWeight: "600",
        }}>✦ AI Chat</button>
      </div>

      {/* Upload Bill */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} />
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {summaryCards.map(c => (
          <div key={c.label} style={{ ...cardStyle, cursor: "pointer" }}
               onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 15px ${c.color}`}
               onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "#6b7280", textTransform: "uppercase", marginBottom: "0.4rem" }}>{c.label}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "700", color: c.color, letterSpacing: "-0.03em" }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={cardStyle}>
          <div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>Spending by Category</div>
          <Pie data={pieData} options={{ plugins: { legend: { labels: { color: "#f9fafb" } } } }} />
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>Daily Spending</div>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={cardStyle}>
          <div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>Budget Tracking</div>
          <div style={{ background: "#1f2937", borderRadius: "99px", height: "8px", overflow: "hidden", marginBottom: "1rem" }}>
            <div style={{
              height: "100%",
              width: `${(totalSpent / monthlyBudget) * 100}%`,
              background: "linear-gradient(90deg, #10b981, #34d399)",
              transition: "width 0.6s ease",
            }} />
          </div>
          <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>
            {((totalSpent / monthlyBudget) * 100).toFixed(1)}% of monthly budget used
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", marginBottom: "0.5rem" }}>Latest Expenses</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {transactions.slice(-5).reverse().map(t => (
              <div key={t.id} style={{
                display: "flex", justifyContent: "space-between", padding: "0.5rem",
                borderRadius: "8px", cursor: "pointer",
                transition: "0.2s",
                background: "rgba(255,255,255,0.02)"
              }}
                   onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 8px ${categoryColors[t.category] || "#f9fafb"}`}
                   onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div>{t.description}</div>
                <div>₹{t.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;