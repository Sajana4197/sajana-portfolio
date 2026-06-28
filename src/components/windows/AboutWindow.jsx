import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";

const STATS = [
  { label: "Industrial Trainings", value: "2" },
  { label: "Major Projects", value: "4+" },
  { label: "Graduates", value: "2026" },
  { label: "GPA", value: "3.01" },
];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "stats", label: "Stats", icon: "📊" },
];

const SIDEBAR_ITEMS = [
  {
    label: "Quick access",
    icon: "⚡",
    children: ["Desktop", "Downloads", "Documents"],
  },
  {
    label: "This PC",
    icon: "🖥️",
    children: ["About Me", "Projects", "Skills"],
  },
  { label: "Network", icon: "🔗", children: ["GitHub", "LinkedIn"] },
];

export default function AboutWindow() {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [activeNav, setActiveNav] = useState("home");
  const [sidebarExpanded, setSidebarExpanded] = useState({
    "Quick access": true,
    "This PC": true,
    Network: false,
  });
  const [backHov, setBackHov] = useState(false);
  const [fwdHov, setFwdHov] = useState(false);

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Explorer toolbar ── */}
      {!isMobile && (
        <div
          className="flex items-center gap-2 px-3 py-2 shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Back / Forward */}
          <NavArrowBtn hov={backHov} setHov={setBackHov} dir="left" />
          <NavArrowBtn hov={fwdHov} setHov={setFwdHov} dir="right" />

          {/* Address bar */}
          <div
            className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-md"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontSize: 13,
            }}
          >
            <span style={{ color: "#8888aa" }}>📁</span>
            <span style={{ color: "#8888aa" }}>This PC</span>
            <span style={{ color: "#555" }}> › </span>
            <span style={{ color: "#0078d4" }}>About Me</span>
            <span style={{ color: "#555" }}> › </span>
            <span style={{ color: "#e8e8f0" }}>
              {NAV_ITEMS.find((n) => n.id === activeNav)?.label ?? "Home"}
            </span>
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              width: 160,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
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
            <span style={{ fontSize: 13, color: "#8888aa" }}>
              Search About Me
            </span>
          </div>
        </div>
      )}

      {/* ── Ribbon tabs ── */}
      <div
        className="flex items-center gap-1 px-3 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              padding: "6px 14px",
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              borderBottom:
                activeNav === item.id
                  ? "2px solid #0078d4"
                  : "2px solid transparent",
              color: activeNav === item.id ? "#0078d4" : "#8888aa",
              background: "transparent",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (activeNav !== item.id)
                e.currentTarget.style.color = "#e8e8f0";
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.id)
                e.currentTarget.style.color = "#8888aa";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Main layout: sidebar + content ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — hidden on mobile */}
        {!isMobile && (
          <div
            className="flex flex-col gap-1 py-2 overflow-y-auto shrink-0"
            style={{
              width: 200,
              borderRight: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            {/* Sidebar */}
            <div
              className="flex flex-col gap-1 py-2 overflow-y-auto shrink-0"
              style={{
                width: 200,
                borderRight: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(0,0,0,0.15)",
              }}
            >
              {SIDEBAR_ITEMS.map((group) => (
                <div key={group.label}>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-left"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      color: "#8888aa",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                    onClick={() =>
                      setSidebarExpanded((s) => ({
                        ...s,
                        [group.label]: !s[group.label],
                      }))
                    }
                  >
                    <span
                      style={{
                        fontSize: 10,
                        transition: "transform 0.15s",
                        transform: sidebarExpanded[group.label]
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      ▶
                    </span>
                    <span>{group.icon}</span>
                    <span>{group.label}</span>
                  </button>
                  <AnimatePresence>
                    {sidebarExpanded[group.label] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ overflow: "hidden" }}
                      >
                        {group.children.map((child) => (
                          <div
                            key={child}
                            className="flex items-center gap-2 px-6 py-1 cursor-pointer"
                            style={{
                              fontSize: 13,
                              color: "#aaa",
                              transition: "background 0.1s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(255,255,255,0.06)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <span style={{ fontSize: 11 }}>📄</span>
                            {child}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Content pane ── */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeNav === "home" && <HomePane setActiveNav={setActiveNav} />}
              {activeNav === "about" && <AboutPane />}
              {activeNav === "stats" && <StatsPane />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Status bar ── */}
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
        <span>7 items</span>
        <span>Sajana Senanayake — Portfolio 2025</span>
        <div className="flex items-center gap-2">
          <GridIcon />
          <ListIcon />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PANES
══════════════════════════════════════════ */

function HomePane({ setActiveNav }) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div className={isMobile ? "p-4" : "p-8"}>
      {/* Hero — stack vertically on mobile */}
      <div
        className={`flex ${isMobile ? "flex-col items-center text-center" : "items-start"} gap-5 mb-6`}
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="shrink-0"
        >
          <div
            className={`${isMobile ? "w-20 h-20" : "w-28 h-28"} rounded-2xl overflow-hidden shadow-2xl`}
            style={{ boxShadow: "0 8px 32px rgba(0,120,212,0.4)" }}
          >
            <img
              src="/avatar.webp"
              alt="Sajana"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex items-center gap-1.5 mt-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ fontSize: 11, color: "#4ade80" }}>
              Open to Opportunities
            </span>
          </div>
        </motion.div>
        {/* Info */}{" "}
        <div className="flex-1">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            {" "}
            <h1
              style={{
                fontSize: isMobile ? 20 : 30,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {" "}
              Sajana Senanayake{" "}
            </h1>{" "}
            <p
              style={{
                fontSize: isMobile ? 12 : 16,
                color: "#0078d4",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {" "}
              Graduate Electrical & Information Engineer{" "}
            </p>{" "}
            <p style={{ fontSize: 12, color: "#8888aa", marginBottom: 14 }}>
              {" "}
              📍 Sri Lanka • 🎓 University of Ruhuna{" "}
            </p>{" "}
            <p
              style={{
                fontSize: isMobile ? 13 : 15,
                color: "#bbb",
                lineHeight: 1.9,
                maxWidth: 560,
              }}
            >
              {" "}
              Passionate about{" "}
              <span style={{ color: "#c43e1c", fontWeight: 600 }}>
                {" "}
                Telecommunications{" "}
              </span>
              ,{" "}
              <span style={{ color: "#0078d4", fontWeight: 600 }}>
                {" "}
                Network Engineering{" "}
              </span>{" "}
              and{" "}
              <span style={{ color: "#107c41", fontWeight: 600 }}>
                {" "}
                Network Operations.{" "}
              </span>{" "}
              Experienced in TCP/IP networking, routing & switching, VLANs,
              network infrastructure, transmission systems, and performance
              monitoring, with industrial training at ZTE Lanka and Sri Lanka
              Rupavahini Corporation.{" "}
            </p>{" "}
          </motion.div>{" "}
          {/* CTA Buttons */}{" "}
          <motion.div
            className={`flex ${isMobile ? "justify-center" : ""} items-center gap-3 mt-5`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {" "}
            <CTAButton
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/sajana-senanayake/",
                  "_blank",
                )
              }
            >
              {" "}
              LinkedIn{" "}
            </CTAButton>{" "}
            <CTAButton
              onClick={() =>
                window.open("https://github.com/Sajana4197", "_blank")
              }
            >
              {" "}
              GitHub{" "}
            </CTAButton>{" "}
            <CTAButton onClick={() => setActiveNav("about")} primary>
              {" "}
              Learn More →{""}
            </CTAButton>{" "}
          </motion.div>{" "}
        </div>
      </div>

      {/* Stats — 2 cols on mobile, 4 on desktop */}
      <motion.div
        className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-3 mb-6`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="flex flex-col items-center justify-center rounded-xl py-4"
            style={{
              background: "rgba(0,120,212,0.08)",
              border: "1px solid rgba(0,120,212,0.20)",
            }}
          >
            <span
              style={{
                fontSize: isMobile ? 22 : 28,
                fontWeight: 700,
                color: "#0078d4",
              }}
            >
              {s.value}
            </span>
            <span
              style={{
                fontSize: 10,
                color: "#8888aa",
                marginTop: 3,
                textAlign: "center",
                padding: "0 4px",
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function AboutPane() {
  const info = [
    { label: "Full Name", value: "Sajana Senanayake" },
    { label: "Degree", value: "B.Sc. Electrical & Information Engineering" },
    { label: "University", value: "University of Ruhuna" },
    { label: "Status", value: "Graduate" },
    { label: "Available", value: "Open to Opportunities" },
  ];

  return (
    <div className="p-8">
      <SectionHeader icon="👤" title="About Me" />

      <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        {/* LEFT SIDE */}
        <div
          className="space-y-5"
          style={{
            fontSize: 14,
            color: "#bbb",
            lineHeight: 1.9,
          }}
        >
          <p>
            I'm{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>
              Sajana Senanayake
            </span>
            , a Graduate Electrical & Information Engineer from the University
            of Ruhuna, Sri Lanka, with a strong interest in
            <span style={{ color: "#00bfff" }}>
              {" "}
              Telecommunications and Network Engineering
            </span>
            . I enjoy designing, optimizing and supporting modern communication
            networks while applying engineering principles to solve real-world
            challenges.
          </p>

          <p>
            My industrial training at{" "}
            <span style={{ color: "#00bfff" }}>ZTE Lanka (Pvt) Ltd</span>{" "}
            provided hands-on experience as a Trainee Site Engineer on Mobitel
            projects, gaining exposure to telecommunications infrastructure,
            mobile network deployment, transmission systems and field
            engineering. I also completed industrial training at{" "}
            <span style={{ color: "#00bfff" }}>
              Sri Lanka Rupavahini Corporation
            </span>
            , where I worked with broadcast, networking and IT infrastructure
            systems.
          </p>

          <p>
            My technical expertise includes
            <span style={{ color: "lightgreen" }}>
              {" "}
              TCP/IP Networking, IPv4 Addressing, Routing & Switching, VLANs,
              Network Performance Monitoring, QoS/QoE Concepts and Network
              Security Fundamentals.
            </span>{" "}
            I continue expanding these skills through Cisco Networking Academy
            certifications, network simulations and practical engineering
            projects.
          </p>

          <p>
            Alongside networking, I develop software using
            <span style={{ color: "#ff1493" }}>
              {" "}
              Python, C, C++, JavaScript and the MERN Stack.
            </span>{" "}
            My projects include a privacy-preserving hybrid face recognition
            system, scalable campus network design and full-stack web
            applications.
          </p>

          <p>
            My goal is to build a career in
            <span style={{ color: "#00bfff" }}>
              {" "}
              Telecommunications, Network Engineering and Network Operations
            </span>
            , contributing to reliable, secure and scalable communication
            networks.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {info.map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#8888aa",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#f5f5f7",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsPane() {
  const bars = [
    {
      label: "Telecommunications & Networking",
      pct: 90,
      color: "#c43e1c",
    },
    {
      label: "Engineering Tools",
      pct: 82,
      color: "#e3a21a",
    },
    {
      label: "Frontend Development",
      pct: 83,
      color: "#0078d4",
    },
    {
      label: "Backend Development",
      pct: 78,
      color: "#107c41",
    },
    {
      label: "Programming (Python / C / C++)",
      pct: 80,
      color: "#8764b8",
    },
    {
      label: "UI/UX Design",
      pct: 68,
      color: "#6b5cff",
    },
  ];

  return (
    <div className="p-8">
      <SectionHeader icon="📊" title="Skills Overview" />
      <div className="space-y-5 max-w-lg">
        {bars.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between mb-1.5">
              <span style={{ fontSize: 13, color: "#e8e8f0" }}>{b.label}</span>
              <span style={{ fontSize: 12, color: b.color, fontWeight: 600 }}>
                {b.pct}%
              </span>
            </div>
            <div
              className="rounded-full overflow-hidden"
              style={{ height: 6, background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${b.color}, ${b.color}aa)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${b.pct}%` }}
                transition={{
                  delay: i * 0.08 + 0.2,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mt-10 max-w-lg">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.07 }}
            className="flex flex-col items-center justify-center py-6 rounded-xl"
            style={{
              background: "rgba(0,120,212,0.08)",
              border: "1px solid rgba(0,120,212,0.20)",
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 700, color: "#0078d4" }}>
              {s.value}
            </span>
            <span style={{ fontSize: 12, color: "#8888aa", marginTop: 4 }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ fontSize: 22 }}>{icon}</span>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>{title}</h2>
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

function CTAButton({ children, onClick, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "8px 18px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        border: "none",
        transition: "all 0.15s",
        background: primary
          ? hov
            ? "#1a8fe3"
            : "#0078d4"
          : hov
            ? "rgba(255,255,255,0.12)"
            : "rgba(255,255,255,0.07)",
        color: primary ? "#fff" : "#e8e8f0",
        boxShadow: primary && hov ? "0 4px 16px rgba(0,120,212,0.4)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function NavArrowBtn({ hov, setHov, dir }) {
  return (
    <button
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
        color: "#8888aa",
        fontSize: 14,
      }}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}

function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ cursor: "pointer" }}
    >
      <rect
        x="0"
        y="0"
        width="6"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
      <rect
        x="8"
        y="0"
        width="6"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
      <rect
        x="0"
        y="8"
        width="6"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
      <rect
        x="8"
        y="8"
        width="6"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ cursor: "pointer" }}
    >
      <rect
        x="0"
        y="1"
        width="14"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
      <rect
        x="0"
        y="6"
        width="14"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
      <rect
        x="0"
        y="11"
        width="14"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}
