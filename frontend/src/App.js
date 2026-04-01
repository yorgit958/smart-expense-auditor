import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/transactions")
      .then((res) => setTransactions(res.data));
  }, []);

  const total =
    transactions.length > 0
      ? transactions.reduce((sum, t) => sum + t.amount, 0)
      : 0;

  const chartData = {
    labels: transactions.map(t => t.category),
    datasets: [
      {
        data: transactions.map(t => t.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      }
    ]
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7fb",
      padding: "30px",
      fontFamily: "Arial"
    }}>
      
      <h1 style={{ textAlign: "center" }}>Smart Wallet</h1>

      {/* 💳 Card */}
      <div style={{
        maxWidth: "800px",
        margin: "20px auto",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <h2>Total Spend</h2>
        <h1 style={{ color: "#4CAF50" }}>₹{total}</h1>

        {/* 📊 Smaller Chart */}
        <div style={{
          width: "300px",
          margin: "0 auto"
        }}>
          <Pie data={chartData} />
        </div>

      </div>

      {/* 📋 Transactions Card */}
      <div style={{
        maxWidth: "800px",
        margin: "20px auto",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <h2>Transactions</h2>

        {transactions.map((t, index) => (
          <div key={index} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #eee"
          }}>
            <span>{t.category}</span>
            <strong>₹{t.amount}</strong>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;