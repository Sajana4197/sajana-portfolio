import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";
import { ICON_DEFS } from "../desktop/Desktop";

const PINNED_APPS = [
  { id: "about", label: "About Me", icon: "👤" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "skills", label: "Skills", icon: "⚙️" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "resume", label: "Resume", icon: "📄" },
  { id: "certificates", label: "Certificates", icon: "🏆" },
  { id: "contact", label: "Contact", icon: "📬" },
  { id: "email", label: "Email", icon: "📧" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  {
    id: "github",
    label: "GitHub",
    icon: "🐙",
    href: "https://github.com/sajana",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "🔗",
    href: "https://linkedin.com/in/sajana",
  },
];

const RECENT = [
  { label: "RightClick IT Site", icon: "🌐", sub: "React Project" },
  { label: "Ember & Oak Restaurant", icon: "🍽️", sub: "Supabase + React" },
  { label: "ClientFlow Desktop App", icon: "🖥️", sub: "Electron + SQLite" },
  { label: "SDN Network Design", icon: "🔌", sub: "Network Project" },
  { label: "OFDM Signal Simulator", icon: "📡", sub: "MATLAB" },
  { label: "Lumière Beauty Site", icon: "💄", sub: "Freelance" },
];

export default function StartMenu() {
  const { openWindow, closeStartMenu } = useDesktopStore();
  const [search, setSearch] = useState("");
  const [hoverId, setHoverId] = useState(null);

  const filtered =
    search.length > 0
      ? ICON_DEFS.filter((d) =>
          d.label.toLowerCase().includes(search.toLowerCase()),
        )
      : null;

  function launch(item) {
    if (item.href) {
      window.open(item.href, "_blank");
      closeStartMenu();
      return;
    }
    const def = ICON_DEFS.find((d) => d.id === item.id);
    if (def?.component) {
      openWindow(def.id, def.label, def.component, def.icon);
      closeStartMenu();
    }
  }

  return (
    <motion.div
      className="fixed z-[9800]"
      style={{
        bottom: 56,
        left: "50%",
        transform: "translateX(-50%)",
        width: 640,
        background: "rgba(18,18,30,0.97)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 16,
        boxShadow:
          "0 -8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* ── Search bar ── */}
      <div className="px-6 pt-5 pb-4">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apps, projects, skills..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e8e8f0",
              fontSize: 14,
              fontFamily: "'Segoe UI', sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ── Search results ── */}
      <AnimatePresence mode="wait">
        {filtered ? (
          <motion.div
            key="results"
            className="px-6 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <SectionLabel>Search Results</SectionLabel>
            {filtered.length === 0 ? (
              <p
                style={{
                  color: "#8888aa",
                  fontSize: 14,
                  padding: "20px 0",
                  textAlign: "center",
                }}
              >
                No results for "{search}"
              </p>
            ) : (
              <div className="flex flex-col gap-0.5">
                {filtered.map((def) => (
                  <SearchResult
                    key={def.id}
                    def={def}
                    onLaunch={() => launch(def)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* ── Pinned ── */}
            <div className="px-6 pb-2">
              <div className="flex items-center justify-between mb-3">
                <SectionLabel>Pinned</SectionLabel>
                <button
                  style={{
                    fontSize: 12,
                    color: "#8888aa",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "3px 10px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  All apps →
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {PINNED_APPS.map((item) => (
                  <PinnedApp
                    key={item.id}
                    item={item}
                    isHov={hoverId === item.id}
                    onHov={setHoverId}
                    onLaunch={() => launch(item)}
                  />
                ))}
              </div>
            </div>

            {/* divider */}
            <div
              className="mx-6 my-3"
              style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
            />

            {/* ── Recommended / Recent ── */}
            <div className="px-6 pb-2">
              <div className="flex items-center justify-between mb-3">
                <SectionLabel>Recommended</SectionLabel>
                <button
                  style={{
                    fontSize: 12,
                    color: "#8888aa",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "3px 10px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  More →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {RECENT.map((item, i) => (
                  <RecentItem key={i} item={item} />
                ))}
              </div>
            </div>

            {/* ── Bottom bar ── */}
            <div
              className="flex items-center justify-between px-6 py-3 mt-1"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              {/* User */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                  }}
                >
                  SS
                </div>
                <span
                  style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 500 }}
                >
                  Sajana Senanayake
                </span>
              </div>

              {/* Power options */}
              <div className="flex items-center gap-1">
                <PowerBtn title="Sleep" icon={<SleepIcon />} />
                <PowerBtn title="Restart" icon={<RestartIcon />} />
                <PowerBtn title="Shut down" icon={<PowerIcon />} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Sub-components ── */

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: "#8888aa",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  );
}

function PinnedApp({ item, isHov, onHov, onLaunch }) {
  return (
    <button
      onMouseEnter={() => onHov(item.id)}
      onMouseLeave={() => onHov(null)}
      onClick={onLaunch}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "10px 4px",
        borderRadius: 10,
        border: "none",
        background: isHov ? "rgba(0,120,212,0.22)" : "rgba(255,255,255,0.04)",
        cursor: "pointer",
        transition: "background 0.12s",
      }}
    >
      <span style={{ fontSize: 26 }}>{item.icon}</span>
      <span
        style={{
          fontSize: 11,
          color: "#e8e8f0",
          textAlign: "center",
          lineHeight: 1.3,
          wordBreak: "break-word",
          maxWidth: 72,
        }}
      >
        {item.label}
      </span>
    </button>
  );
}

function RecentItem({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        background: hov ? "rgba(255,255,255,0.08)" : "transparent",
        transition: "background 0.12s",
      }}
    >
      <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
      <div>
        <div style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 500 }}>
          {item.label}
        </div>
        <div style={{ fontSize: 11, color: "#8888aa", marginTop: 1 }}>
          {item.sub}
        </div>
      </div>
    </button>
  );
}

function SearchResult({ def, onLaunch }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onLaunch}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        background: hov ? "rgba(0,120,212,0.22)" : "transparent",
        transition: "background 0.12s",
      }}
    >
      <span style={{ fontSize: 22 }}>{def.icon}</span>
      <div>
        <div style={{ fontSize: 14, color: "#e8e8f0" }}>{def.label}</div>
        {def.href && (
          <div style={{ fontSize: 11, color: "#8888aa" }}>External link</div>
        )}
      </div>
    </button>
  );
}

function PowerBtn({ title, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.12)" : "transparent",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        transition: "background 0.12s",
      }}
    >
      {icon}
    </button>
  );
}

/* ── Icons ── */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle
        cx="7.5"
        cy="7.5"
        r="5"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.4"
      />
      <path
        d="M11.5 11.5l3.5 3.5"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SleepIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path
        d="M15 10.5A7 7 0 117.5 3a5 5 0 007.5 7.5z"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.3"
      />
    </svg>
  );
}
function RestartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path
        d="M3 9A6 6 0 109 3H6"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M6 1v4H2"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PowerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 2v5"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M5.5 4.5A6 6 0 1012.5 4.5"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
