import { motion } from "framer-motion";

export default function MobileWindow({ app, onClose }) {
  const Component = app.component;

  return (
    <motion.div
      className="fixed inset-0"
      style={{
        zIndex: 999,
        background: "rgba(16,16,26,0.98)",
        display: "flex",
        flexDirection: "column",
      }}
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Mobile app header */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "env(safe-area-inset-top, 12px)",
        }}
      >
        {/* Back button */}
        <motion.button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#0078d4",
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "'Segoe UI', sans-serif",
            padding: "4px 0",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M8 2L2 8l6 6"
              stroke="#0078d4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </motion.button>

        {/* Title */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#e8e8f0",
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          {app.label}
        </span>

        {/* Right spacer */}
        <div style={{ width: 60 }} />
      </div>

      {/* App content */}
      <div className="flex-1 overflow-hidden">{Component && <Component />}</div>

      {/* Bottom safe area */}
      <div
        style={{
          height: "env(safe-area-inset-bottom, 0px)",
          background: "rgba(0,0,0,0.4)",
        }}
      />
    </motion.div>
  );
}
