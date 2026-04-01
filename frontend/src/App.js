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
    axios.get("http://127.0.0.1:8000/transactions")
      .then((res) => setTransactions(res.data));
  }, []);

  const chartData = {
  labels: transactions.map(t => t.category),
  datasets: [
    {
      data: transactions.map(t => t.amount),

      // 👇 ADD THIS
      backgroundColor: [
        "#FF6384",  // Food - pink/red
        "#36A2EB",  // Shopping - blue
        "#FFCE56",  // Rent - yellow
        "#4BC0C0",  // extra (future categories)
        "#9966FF",
        "#FF9F40"
      ],

      borderWidth: 1
    }
  ]
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>💰 Smart Expense Auditor</h1>
      <h3>
      Total Spend: ₹
      {transactions.length > 0
        ? transactions.reduce((sum, t) => sum + t.amount, 0)
        : "Loading..."}
    </h3>

      <Pie data={chartData} />

      <h2>Transactions</h2>
      {transactions.map((t, index) => (
        <div key={index}>
          ₹{t.amount} - {t.category}
        </div>
      ))}
    </div>
  );
}

export default App;