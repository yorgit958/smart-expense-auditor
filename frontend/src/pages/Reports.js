import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const mockTransactions = [
  { id: 1, description: "Groceries", amount: 1200, date: "2026-04-01" },
  { id: 2, description: "Electricity Bill", amount: 800, date: "2026-04-02" },
  { id: 3, description: "Netflix", amount: 150, date: "2026-04-03" },
  { id: 4, description: "Restaurant", amount: 450, date: "2026-04-05" },
  { id: 5, description: "Fuel", amount: 1000, date: "2026-04-06" },
  { id: 6, description: "Shopping", amount: 2200, date: "2026-04-07" },
];

const Reports = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = mockTransactions.reduce((acc, t) => acc + t.amount, 0);
    setTotal(sum);
  }, []);

  const monthlyComparisonData = {
    labels: ["Mar 1", "Mar 15", "Mar 30", "Apr 1", "Apr 15", "Apr 30"],
    datasets: [
      {
        label: "March",
        data: [2000, 2500, 1800, 0, 0, 0],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "April",
        data: [0, 0, 0, 1200, 4500, 2200],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top", labels: { color: "#d1d5db" } } },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  return (
    <div style={{ padding: "2rem", background: "#0d1117", minHeight: "100vh", color: "#f9fafb" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>Monthly Reports</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Card 1: Monthly Comparison */}
        <div style={{
          background: "#111827",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 0 20px rgba(16,185,129,0.2)",
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1rem" }}>Month Comparison</h2>
          <Line data={monthlyComparisonData} options={chartOptions} />
        </div>

        {/* Card 2: This Month's Transactions */}
        <div style={{
          background: "#111827",
          borderRadius: "12px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 0 20px rgba(16,185,129,0.2)",
        }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "1rem" }}>April Transactions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
              {mockTransactions.map((t) => (
                <div key={t.id} style={{
                  display: "flex", justifyContent: "space-between", padding: "0.5rem",
                  background: "#1f2937", borderRadius: "8px"
                }}>
                  <span>{t.description}</span>
                  <span>₹{t.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Total: ₹{total.toLocaleString()}</div>
            <button style={{
              width: "100%",
              background: "#10b981",
              color: "#f9fafb",
              padding: "0.6rem",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
            }}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;