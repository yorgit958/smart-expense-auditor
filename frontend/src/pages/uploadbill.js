import React, { useState } from "react";

const cardStyle = {
  background: "#111827",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.07)",
  padding: "1.5rem",
  boxShadow: "0 4px 12px rgba(16,185,129,0.15)",
  marginBottom: "2rem",
};

const UploadBill = ({ onNewExpenses }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [manualData, setManualData] = useState({
    merchant: "",
    amount: "",
    date: "",
    category: "",
  });

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      ["image/png", "image/jpeg", "application/pdf"].includes(droppedFile.type)
    ) {
      setFile(droppedFile);
      setStatus("");
    } else {
      setStatus("Only PNG, JPEG, or PDF files are allowed.");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // FAKE ML parser for demo
  const fakeParseBill = async (file) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Hardcoded items from your previous receipt
    const items = [
      { description: "Apples", amount: 300.0, category: "Food", date: "2026-04-07" },
      { description: "Bread", amount: 45.0, category: "Food", date: "2026-04-07" },
      { description: "Milk", amount: 120.0, category: "Food", date: "2026-04-07" },
      { description: "Chicken", amount: 375.0, category: "Food", date: "2026-04-07" },
      { description: "Snack Chips", amount: 150.0, category: "Food", date: "2026-04-07" },
      { description: "Detergent", amount: 180.0, category: "Utilities", date: "2026-04-07" },
    ];
    const total = items.reduce((acc, i) => acc + i.amount, 0);

    return { items, total };
  };

  // Upload file to backend (with fake ML)
  const handleUpload = async () => {
    if (!file) return setStatus("Please select a file first.");
    setStatus("Processing...");

    try {
      // In reality you would send the file to backend
      const parsedData = await fakeParseBill(file);

      setStatus("File processed successfully!");
      setFile(null);

      // Send parsed items to dashboard
      if (onNewExpenses) onNewExpenses(parsedData.items);
    } catch (err) {
      console.error(err);
      setStatus("Error processing file.");
    }
  };

  // Manual bill submission
  const handleManualSubmit = async () => {
    const { merchant, amount, date, category } = manualData;
    if (!merchant || !amount || !date || !category) {
      return setStatus("Please fill all fields.");
    }

    const newItem = { description: merchant, amount: parseFloat(amount), category, date };

    setStatus("Manual bill added!");
    setManualData({ merchant: "", amount: "", date: "", category: "" });

    if (onNewExpenses) onNewExpenses([newItem]);
  };

  return (
    <div style={{ flex: 1, minHeight: "100%", padding: "2rem", background: "#0d1117", color: "#f9fafb" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem" }}>Upload Bill</h1>

      {/* Drag & Drop Card */}
      <div style={cardStyle}>
        <h2 style={{ fontWeight: "700", marginBottom: "1rem" }}>Upload a Bill / Receipt</h2>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("fileInput").click()}
          style={{
            border: "2px dashed #10b981",
            borderRadius: "10px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        >
          {file ? <p>{file.name}</p> : <p>Drag & drop your bill here, or click to select a file.</p>}
        </div>
        <input
          type="file"
          accept=".png,.jpeg,.jpg,.pdf"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          style={{
            background: "#10b981",
            color: "#f9fafb",
            padding: "0.6rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Send
        </button>
      </div>

      {/* Manual Entry Card */}
      <div style={cardStyle}>
        <h2 style={{ fontWeight: "700", marginBottom: "1rem" }}>Add Bill Manually</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Merchant Name"
            value={manualData.merchant}
            onChange={(e) => setManualData({ ...manualData, merchant: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#f9fafb" }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={manualData.amount}
            onChange={(e) => setManualData({ ...manualData, amount: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#f9fafb" }}
          />
          <input
            type="date"
            value={manualData.date}
            onChange={(e) => setManualData({ ...manualData, date: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#f9fafb" }}
          />
          <input
            type="text"
            placeholder="Category (Food, Transport, Shopping, Utilities, Others)"
            value={manualData.category}
            onChange={(e) => setManualData({ ...manualData, category: e.target.value })}
            style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #374151", background: "#111827", color: "#f9fafb" }}
          />
        </div>
        <button
          onClick={handleManualSubmit}
          style={{
            marginTop: "1rem",
            background: "#10b981",
            color: "#f9fafb",
            padding: "0.6rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Add Bill
        </button>
      </div>

      {status && <p style={{ marginTop: "1rem", color: "#d1d5db" }}>{status}</p>}
    </div>
  );
};

export default UploadBill;