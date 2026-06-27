import { useState } from "react";
import { NavBtn } from "./_shared.jsx";

export default function CertViewerWindow({ file, title }) {
  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <NavBtn>‹</NavBtn>
        <NavBtn>›</NavBtn>

        {/* Address bar */}
        <div
          className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-md"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "#8888aa" }}>🏆</span>
          <span style={{ color: "#8888aa" }}>Certificates</span>
          <span style={{ color: "#555" }}> › </span>
          <span style={{ color: "#0078d4" }}>{title}</span>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={file}
          title={title}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}
