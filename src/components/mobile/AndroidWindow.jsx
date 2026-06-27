import { useState } from "react";
import { motion } from "framer-motion";
import { AppIcon } from "../icons/AppIcons";

export default function AndroidWindow({ app, onClose }) {
  const Component = app.component;
  const [closing, setClosing] = useState(false);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 280);
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: 200,
        background: "rgba(14,14,24,0.99)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={{
        opacity: closing ? 0 : 1,
        scale: closing ? 0.94 : 1,
        y: closing ? 40 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* ── Android App Bar ── */}
      <div
        className="flex items-center gap-3 px-2 py-2 shrink-0"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 32,
        }}
      >
        {/* Back arrow */}
        <motion.button
          onClick={handleClose}
          whileTap={{ scale: 0.85 }}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: 20,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M14 5L8 11l6 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* App icon + title */}
        <AppIcon id={app.icon} size={16} />
        <span style={{ fontSize: 17, fontWeight: 600, color: "#fff", flex: 1 }}>
          {app.label}
        </span>

        {/* More options */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRadius: 20,
          }}
        >
          <svg width="4" height="18" viewBox="0 0 4 18" fill="none">
            <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="2" cy="9" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="2" cy="16" r="2" fill="rgba(255,255,255,0.6)" />
          </svg>
        </motion.button>
      </div>

      {/* ── Content — hide desktop sidebars via CSS ── */}
      <div
        className="flex-1 overflow-hidden android-app-content"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {Component && <Component />}
      </div>

      {/* ── Android bottom nav ── */}
      <div
        className="flex items-center justify-around px-8 py-3 shrink-0"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          height: 56,
        }}
      >
        <NavBtn onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 4L6 9l5 5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavBtn>
        <NavBtn onClick={handleClose}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </NavBtn>
        <NavBtn onClick={() => {}}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 3,
              border: "2px solid white",
            }}
          />
        </NavBtn>
      </div>
    </motion.div>
  );
}

function NavBtn({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.8 }}
      style={{
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        borderRadius: 12,
      }}
    >
      {children}
    </motion.button>
  );
}
