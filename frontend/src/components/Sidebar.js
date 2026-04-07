import React from "react";
import { NavLink } from "react-router-dom";

// Reordered menus: Upload Bill comes above Reports
const menus = [
  { label: "Dashboard", path: "/", icon: "○" },
  { label: "Upload Bill", path: "/upload-bill", icon: "˄" }, // thin upward arrow
  { label: "Reports", path: "/reports", icon: "↑" },
  { label: "Bank", path: "/bank", icon: "◇" },
  { label: "Settings", path: "/settings", icon: "⚙" },
];

const Sidebar = () => {
  return (
    <nav
      style={{
        width: "240px",
        minWidth: "240px",
        background: "#111827",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
          >
            ◆
          </div>
          <div>
            <div style={{ color: "#f9fafb", fontWeight: "700", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
              SmartWallet
            </div>
            <div style={{ color: "#6b7280", fontSize: "0.7rem", letterSpacing: "0.04em" }}>
              v2.0 · AI-Powered
            </div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ padding: "1rem 0.75rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {menus.map((menu) => (
          <NavLink
            key={menu.label}
            to={menu.path}
            end={menu.path === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.65rem 0.75rem",
              borderRadius: "8px",
              color: isActive ? "#10b981" : "#9ca3af",
              backgroundColor: isActive ? "rgba(16,185,129,0.12)" : "transparent",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: isActive ? "600" : "400",
              transition: "all 0.2s",
              borderLeft: isActive ? "2px solid #10b981" : "2px solid transparent",
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.style.borderLeft.includes("#10b981")) {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#f9fafb";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.style.borderLeft.includes("#10b981")) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }
            }}
          >
            <span style={{ fontSize: "1rem", width: "18px", textAlign: "center" }}>
              {menu.icon}
            </span>
            {menu.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;