import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";
import Clock from "./Clock";
import { ICON_DEFS } from "../desktop/Desktop";

/* Taskbar pinned apps (subset shown in center) */
const PINNED = [
  { id: "start", label: "Start", icon: <WindowsLogoSmall /> },
  { id: "search", label: "Search", icon: <SearchIcon /> },
  { id: "explorer", label: "File Explorer", icon: "📁" },
  { id: "about", label: "About Me", icon: "👤" },
  { id: "projects", label: "Projects", icon: "💼" },
  { id: "skills", label: "Skills", icon: "⚙️" },
  { id: "contact", label: "Contact", icon: "📬" },
  { id: "github", label: "GitHub", icon: "🐙" },
  { id: "vscode", label: "VS Code", icon: <VSCodeIcon /> },
  { id: "figma", label: "Figma", icon: <FigmaIcon /> },
];

export default function Taskbar() {
  const {
    windows,
    activeWindowId,
    openWindow,
    focusWindow,
    minimizeWindow,
    toggleStartMenu,
    startMenuOpen,
  } = useDesktopStore();

  const [hoverId, setHoverId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef(null);

  /* close search on outside click */
  useEffect(() => {
    if (!searchOpen) return;
    function handler(e) {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    }
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  function handlePinnedClick(item) {
    if (item.id === "start") {
      toggleStartMenu();
      return;
    }
    if (item.id === "search") {
      setSearchOpen((s) => !s);
      return;
    }
    if (item.id === "github") {
      window.open("https://github.com/Sajana4197", "_blank");
      return;
    }
    if (item.id === "vscode" || item.id === "figma" || item.id === "explorer")
      return;

    /* find the ICON_DEF and open its window */
    const def = ICON_DEFS.find((d) => d.id === item.id);
    if (!def || !def.component) return;

    const win = windows.find((w) => w.id === item.id);
    if (win) {
      if (win.minimized || activeWindowId !== item.id) focusWindow(item.id);
      else minimizeWindow(item.id);
    } else {
      openWindow(def.id, def.label, def.component, def.icon);
    }
  }

  /* search filter */
  const searchResults = ICON_DEFS.filter(
    (d) =>
      d.label.toLowerCase().includes(searchVal.toLowerCase()) &&
      searchVal.length > 0,
  );

  return (
    <>
      {/* ── Search popup ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            className="fixed z-[9990]"
            style={{
              bottom: 56,
              left: "50%",
              transform: "translateX(-50%)",
              width: 580,
              background: "rgba(18,18,30,0.96)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 14,
              boxShadow: "0 -4px 40px rgba(0,0,0,0.6)",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* search input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <SearchIcon color="rgba(255,255,255,0.4)" />
              <input
                autoFocus
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search portfolio..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e8e8f0",
                  fontSize: 16,
                  fontFamily: "'Segoe UI', sans-serif",
                }}
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal("")}
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* results */}
            <div className="p-3">
              {searchVal.length === 0 ? (
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#8888aa",
                      padding: "4px 8px 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Quick launch
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {ICON_DEFS.slice(0, 8).map((def) => (
                      <QuickItem
                        key={def.id}
                        def={def}
                        onClick={() => {
                          if (def.component)
                            openWindow(
                              def.id,
                              def.label,
                              def.component,
                              def.icon,
                            );
                          if (def.href) window.open(def.href, "_blank");
                          setSearchOpen(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#8888aa",
                      padding: "4px 8px 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Results
                  </p>
                  {searchResults.map((def) => (
                    <div
                      key={def.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer"
                      style={{ transition: "background 0.1s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(0,120,212,0.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                      onClick={() => {
                        if (def.component)
                          openWindow(
                            def.id,
                            def.label,
                            def.component,
                            def.icon,
                          );
                        if (def.href) window.open(def.href, "_blank");
                        setSearchOpen(false);
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{def.icon}</span>
                      <span style={{ fontSize: 14, color: "#e8e8f0" }}>
                        {def.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: 14,
                    color: "#8888aa",
                    textAlign: "center",
                    padding: "20px 0",
                  }}
                >
                  No results for "{searchVal}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Taskbar bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4"
        style={{
          height: 48,
          background: "rgba(10,10,18,0.88)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          zIndex: 9000,
        }}
      >
        {/* Left spacer */}
        <div style={{ width: 120 }} />

        {/* Center — pinned + open apps */}
        <div className="flex items-center gap-1">
          {PINNED.map((item) => {
            const win = windows.find((w) => w.id === item.id);
            const isOpen = !!win;
            const isActive = activeWindowId === item.id;
            const isHov = hoverId === item.id;

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center"
              >
                {/* Hover tooltip */}
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      className="absolute pointer-events-none"
                      style={{
                        bottom: 46,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(28,28,42,0.96)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: 12,
                        color: "#e8e8f0",
                        whiteSpace: "nowrap",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                      }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.12 }}
                    >
                      {item.label}
                      {win && !win.minimized && (
                        <div
                          style={{
                            fontSize: 10,
                            color: "#8888aa",
                            marginTop: 1,
                          }}
                        >
                          {win.maximized ? "Maximized" : "Running"}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon button */}
                <motion.button
                  onMouseEnter={() => setHoverId(item.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => handlePinnedClick(item)}
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isActive
                      ? "rgba(0,120,212,0.25)"
                      : isHov
                        ? "rgba(255,255,255,0.10)"
                        : "transparent",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 20,
                    transition: "background 0.12s",
                    position: "relative",
                  }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {typeof item.icon === "string" ? (
                    <span>{item.icon}</span>
                  ) : (
                    item.icon
                  )}

                  {/* Active/open indicator dot */}
                  {isOpen && (
                    <motion.span
                      layoutId={`dot-${item.id}`}
                      style={{
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isActive ? 16 : 4,
                        height: 3,
                        borderRadius: 2,
                        background: isActive
                          ? "#0078d4"
                          : "rgba(255,255,255,0.5)",
                        transition: "width 0.2s, background 0.2s",
                      }}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}

          {/* Running windows not in pinned list */}
          {windows
            .filter((w) => !PINNED.find((p) => p.id === w.id))
            .map((win) => {
              const isActive = activeWindowId === win.id;
              const isHov = hoverId === win.id;
              return (
                <div
                  key={win.id}
                  className="relative flex flex-col items-center"
                >
                  <AnimatePresence>
                    {isHov && (
                      <motion.div
                        className="absolute pointer-events-none"
                        style={{
                          bottom: 46,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "rgba(28,28,42,0.96)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          borderRadius: 6,
                          padding: "4px 10px",
                          fontSize: 12,
                          color: "#e8e8f0",
                          whiteSpace: "nowrap",
                          backdropFilter: "blur(12px)",
                        }}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.12 }}
                      >
                        {win.title}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button
                    onMouseEnter={() => setHoverId(win.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => {
                      if (win.minimized || activeWindowId !== win.id)
                        focusWindow(win.id);
                      else minimizeWindow(win.id);
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isActive
                        ? "rgba(0,120,212,0.25)"
                        : isHov
                          ? "rgba(255,255,255,0.10)"
                          : "transparent",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 20,
                      position: "relative",
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <span>{win.icon}</span>
                    <motion.span
                      style={{
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isActive ? 16 : 4,
                        height: 3,
                        borderRadius: 2,
                        background: isActive
                          ? "#0078d4"
                          : "rgba(255,255,255,0.5)",
                        transition: "width 0.2s",
                      }}
                    />
                  </motion.button>
                </div>
              );
            })}
        </div>

        {/* Right — system tray + clock */}
        <div className="flex items-center gap-2">
          <SystemTray />
          <Clock />
          <ShowDesktopBtn />
        </div>
      </div>
    </>
  );
}

/* ── System Tray ── */
function SystemTray() {
  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded-lg"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {/* Network */}
      <TrayIcon title="Network">
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 13.5C3.5 11 6.1 9.8 9 9.8s5.5 1.2 8 3.7"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M3.5 11C5.3 9.4 7 8.6 9 8.6s3.7.8 5.5 2.4"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="9" cy="15" r="1.2" fill="white" fillOpacity="0.7" />
        </svg>
      </TrayIcon>
      {/* Volume */}
      <TrayIcon title="Volume">
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <path
            d="M3 6.5h2.5L9 3.5v11L5.5 11.5H3z"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 6a3.5 3.5 0 010 6"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </TrayIcon>
      {/* Battery */}
      <TrayIcon title="Battery — 100%">
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <rect
            x="1.5"
            y="5.5"
            width="13"
            height="7"
            rx="1.5"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <rect
            x="3"
            y="7"
            width="8"
            height="4"
            rx="0.5"
            fill="white"
            fillOpacity="0.7"
          />
          <path
            d="M15.5 7.5v3"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </TrayIcon>
    </div>
  );
}

function TrayIcon({ title, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.10)" : "transparent",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  );
}

/* ── Show Desktop button (far right) ── */
function ShowDesktopBtn() {
  const { windows, minimizeWindow } = useDesktopStore();
  const [hov, setHov] = useState(false);
  function handleClick() {
    windows.forEach((w) => minimizeWindow(w.id));
  }
  return (
    <button
      title="Show desktop"
      onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 6,
        height: 32,
        marginLeft: 4,
        background: hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.10)",
        border: "none",
        borderRadius: 2,
        cursor: "pointer",
        transition: "background 0.12s",
      }}
    />
  );
}

/* ── Quick search item ── */
function QuickItem({ def, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "10px 6px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: hov ? "rgba(0,120,212,0.2)" : "rgba(255,255,255,0.04)",
        transition: "background 0.12s",
      }}
    >
      <span style={{ fontSize: 24 }}>{def.icon}</span>
      <span style={{ fontSize: 11, color: "#e8e8f0", textAlign: "center" }}>
        {def.label}
      </span>
    </button>
  );
}

/* ── SVG Icons ── */
function WindowsLogoSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 88 88" fill="none">
      <rect
        x="4"
        y="4"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.9"
      />
      <rect
        x="47"
        y="4"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.9"
      />
      <rect
        x="4"
        y="47"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.9"
      />
      <rect
        x="47"
        y="47"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function SearchIcon({ color = "rgba(255,255,255,0.7)" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="7.5" cy="7.5" r="5" stroke={color} strokeWidth="1.4" />
      <path
        d="M11.5 11.5l3.5 3.5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VSCodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
      <path
        d="M74 6L38 45 17 28 6 34l19 16L6 66l11 6 21-17 36 39 17-8V14L74 6z"
        fill="#007ACC"
      />
      <path
        d="M74 6L38 45l-21-17-11 6 19 16-19 16 11 6 21-17 36 39 17-8V14L74 6zm0 15l-1 58-29-29 30-29z"
        fill="white"
        fillOpacity="0.3"
      />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
      <rect x="0" y="0" width="19" height="19" rx="9.5" fill="#F24E1E" />
      <rect x="19" y="0" width="19" height="19" rx="9.5" fill="#FF7262" />
      <rect x="0" y="19" width="19" height="19" rx="9.5" fill="#A259FF" />
      <rect x="0" y="38" width="19" height="19" rx="9.5" fill="#0ACF83" />
      <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
    </svg>
  );
}
