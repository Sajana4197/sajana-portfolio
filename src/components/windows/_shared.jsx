import { useState } from "react";

export function NavBtn({ children, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hov && !disabled ? "rgba(255,255,255,0.10)" : "transparent",
        border: "none",
        borderRadius: 6,
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#444" : "#8888aa",
        fontSize: 14,
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  );
}

export function AddressBar({ crumbs }) {
  return (
    <div
      className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-md"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        fontSize: 13,
      }}
    >
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-2">
          {i > 0 && <span style={{ color: "#555" }}>›</span>}
          <span
            style={{ color: i === crumbs.length - 1 ? "#0078d4" : "#8888aa" }}
          >
            {crumb}
          </span>
        </span>
      ))}
    </div>
  );
}

export function TabBar({ tabs, active, onChange }) {
  return (
    <div
      className="flex items-center gap-1 px-3 shrink-0"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: "6px 14px",
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            background: "transparent",
            borderBottom:
              active === tab ? "2px solid #0078d4" : "2px solid transparent",
            color: active === tab ? "#0078d4" : "#8888aa",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            if (active !== tab) e.currentTarget.style.color = "#e8e8f0";
          }}
          onMouseLeave={(e) => {
            if (active !== tab) e.currentTarget.style.color = "#8888aa";
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function StatusBar({ left, right }) {
  return (
    <div
      className="flex items-center justify-between px-4 shrink-0"
      style={{
        height: 24,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.2)",
        fontSize: 11,
        color: "#8888aa",
      }}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function SidebarLabel({ children }) {
  return (
    <p
      style={{
        fontSize: 11,
        color: "#8888aa",
        padding: "0 12px 6px",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  );
}

export function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>{title}</h2>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(0,120,212,0.4), transparent)",
        }}
      />
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />;
}

export function DetailSection({ label, children }) {
  return (
    <div>
      <p
        style={{
          fontSize: 10,
          color: "#8888aa",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

export function MetaRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span style={{ fontSize: 11, color: "#8888aa" }}>{label}</span>
      <span style={{ fontSize: 11, color: "#e8e8f0" }}>{value}</span>
    </div>
  );
}

export function ViewToggle({ mode, active, setMode }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => setMode(mode)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 28,
        height: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          active === mode
            ? "rgba(0,120,212,0.25)"
            : hov
              ? "rgba(255,255,255,0.08)"
              : "transparent",
        border:
          active === mode
            ? "1px solid rgba(0,120,212,0.4)"
            : "1px solid transparent",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: 12,
        color: "#e8e8f0",
        transition: "all 0.12s",
      }}
    >
      {mode === "grid" ? "⊞" : "☰"}
    </button>
  );
}

export function ActionBtn({ icon, label, onClick, color }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 8,
        border: `1px solid ${color}44`,
        background: hov ? color + "22" : color + "11",
        color: "#e8e8f0",
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.15s",
        width: "100%",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span style={{ marginLeft: "auto", color: "#8888aa", fontSize: 11 }}>
        ↗
      </span>
    </button>
  );
}
