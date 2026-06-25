import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = time.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="flex flex-col items-end px-2 py-1 rounded-lg cursor-default select-none"
      style={{ minWidth: 72, transition: "background 0.12s" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        style={{
          fontSize: 13,
          color: "#e8e8f0",
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        {timeStr}
      </span>
      <span style={{ fontSize: 11, color: "#8888aa", lineHeight: 1.2 }}>
        {dateStr}
      </span>
    </div>
  );
}
