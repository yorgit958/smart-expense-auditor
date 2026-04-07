// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Bank from "./pages/Bank";
import Settings from "./pages/Settings";
import UploadBill from "./pages/uploadbill"; // capitalized component import

// Global reset to remove default margins/padding
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { height: 100%; background: #0d1117; font-family: system-ui, sans-serif; }
`;
document.head.appendChild(globalStyle);

function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#0d1117",
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload-bill" element={<UploadBill />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;