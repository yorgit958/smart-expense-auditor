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
  const [darkMode, setDarkMode] = useState(false);
  const [billItem, setBillItem] = useState({
    name: "",
    amount: "",
    category: ""
  });

  // Category keywords for automatic detection
  const categoryKeywords = {
    Food: ["apple", "bread", "pizza", "burger", "rice", "dal", "milk", "cake"],
    Travel: ["bus", "train", "flight", "taxi", "uber", "cab", "fuel", "petrol"],
    Entertainment: ["movie", "netflix", "concert", "game", "music", "ticket"],
    Shopping: ["shirt", "jeans", "shoes", "dress", "bag", "watch"],
    Bills: ["electricity", "water", "internet", "phone", "rent"],
  };

  // Detect category based on item name
  const detectCategory = (itemName) => {
    const name = itemName.toLowerCase();
    for (let category in categoryKeywords) {
      for (let keyword of categoryKeywords[category]) {
        if (name.includes(keyword)) return category;
      }
    }
    return "Other"; // default if no match
  };

  // Fetch existing transactions
  useEffect(() => {
    axios.get("http://localhost:8000/transactions")
      .then((res) => setTransactions(res.data))
      .catch(() => console.log("Failed to fetch transactions"));
  }, []);

  // Handle adding new bill
  const handleAddBill = () => {
    if (!billItem.name || !billItem.amount) return;

    const detectedCategory = billItem.category || detectCategory(billItem.name);

    const newTransaction = {
      name: billItem.name,
      amount: parseFloat(billItem.amount),
      category: detectedCategory
    };

    setTransactions([...transactions, newTransaction]);
    setBillItem({ name: "", amount: "", category: "" });
  };

  // Calculate total spend
  const total = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  // Group transactions by category for pie chart
  const categoryTotals = transactions.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = 0;
    acc[t.category] += parseFloat(t.amount);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800", "#9C27B0"],
      }
    ]
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#121212" : "#f5f7fb",
      color: darkMode ? "#eee" : "#000",
      padding: "30px",
      fontFamily: "Arial",
      display: "flex",
      gap: "20px"
    }}>

      {/* Bill Input Card */}
      <div style={{
        flex: "1",
        maxWidth: "300px",
        background: darkMode ? "#1e1e1e" : "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <h2>Add a Bill</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={billItem.name}
          onChange={(e) => setBillItem({ ...billItem, name: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: darkMode ? "#2a2a2a" : "white",
            color: darkMode ? "#eee" : "#000"
          }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={billItem.amount}
          onChange={(e) => setBillItem({ ...billItem, amount: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: darkMode ? "#2a2a2a" : "white",
            color: darkMode ? "#eee" : "#000"
          }}
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={billItem.category}
          onChange={(e) => setBillItem({ ...billItem, category: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: darkMode ? "#2a2a2a" : "white",
            color: darkMode ? "#eee" : "#000"
          }}
        />
        <button
          onClick={handleAddBill}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: darkMode ? "#4CAF50" : "#36A2EB",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add Bill
        </button>
      </div>

      {/* Dashboard */}
      <div style={{ flex: "3" }}>
        {/* Top Bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <h1>💰 Smart Wallet</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: darkMode ? "#f5f7fb" : "#121212",
                color: darkMode ? "#121212" : "#f5f7fb",
                cursor: "pointer"
              }}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                background: darkMode ? "#4CAF50" : "#36A2EB",
                color: "white",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          </div>
        </div>

        {/* Total Spend Card */}
        <div style={{
          maxWidth: "800px",
          marginBottom: "20px",
          background: darkMode ? "#1e1e1e" : "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <h2>Total Spend</h2>
          <h1 style={{ color: "#4CAF50" }}>₹{total}</h1>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <Pie data={chartData} />
          </div>
        </div>

        {/* Transactions Card */}
        <div style={{
          maxWidth: "800px",
          background: darkMode ? "#1e1e1e" : "white",
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
              borderBottom: darkMode ? "1px solid #333" : "1px solid #eee"
            }}>
              <span>{t.category} - {t.name}</span>
              <strong>₹{t.amount}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;