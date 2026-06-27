import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";

const STATS = [
  { label: "Projects Delivered", value: "10+" },
  { label: "Years Coding", value: "4+" },
  { label: "Technologies", value: "20+" },
  { label: "GPA", value: "3.5" },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Started Engineering Degree",
    sub: "University of Ruhuna — Faculty of Engineering",
    icon: "🎓",
    color: "#0078d4",
  },
  {
    year: "2022",
    title: "First Web Dev Project",
    sub: "Built first client website using HTML/CSS/JS",
    icon: "🌐",
    color: "#107c41",
  },
  {
    year: "2023",
    title: "Freelance Career Began",
    sub: "Launched freelance web development — 5+ clients",
    icon: "💼",
    color: "#8764b8",
  },
  {
    year: "2023",
    title: "Built ClientFlow Desktop App",
    sub: "Electron + React CRM for managing freelance business",
    icon: "🖥️",
    color: "#c43e1c",
  },
  {
    year: "2024",
    title: "ZTE Lanka Internship",
    sub: "4G/5G network deployment & RF optimization",
    icon: "📡",
    color: "#0078d4",
  },
  {
    year: "2024",
    title: "Full-Stack React Projects",
    sub: "Ember & Oak, RightClick IT, Lumière Beauty",
    icon: "⚛️",
    color: "#107c41",
  },
  {
    year: "2025",
    title: "Final Year Research",
    sub: "5G resource allocation research project",
    icon: "🔬",
    color: "#e3a21a",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "timeline", label: "Timeline", icon: "📅" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "experience", label: "Experience", icon: "💼" },
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
              {activeNav === "timeline" && <TimelinePane />}
              {activeNav === "stats" && <StatsPane />}
              {activeNav === "experience" && <ExperiencePane />}
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
  return (
    <div className="p-8">
      {/* Hero */}
      <div className="flex items-start gap-8 mb-10">
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
            className="w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #0078d4 0%, #4b2fa0 100%)",
              boxShadow: "0 8px 32px rgba(0,120,212,0.4)",
            }}
          >
            SS
          </div>
          {/* Status badge */}
          <div className="flex items-center gap-1.5 mt-3 justify-center">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ fontSize: 11, color: "#4ade80" }}>
              Available for hire
            </span>
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
                lineHeight: 1.2,
              }}
            >
              Sajana Senanayake
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "#0078d4",
                fontWeight: 500,
                marginBottom: 8,
              }}
            >
              Electrical & Information Engineering Undergraduate
            </p>
            <p style={{ fontSize: 13, color: "#8888aa", marginBottom: 12 }}>
              📍 Sri Lanka &nbsp;·&nbsp; 🎓 University of Ruhuna &nbsp;·&nbsp;
              💼 Open to opportunities
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#bbb",
                lineHeight: 1.8,
                maxWidth: 480,
              }}
            >
              I'm an engineering undergraduate passionate about the intersection
              of
              <span style={{ color: "#0078d4" }}> telecommunications</span>,
              <span style={{ color: "#107c41" }}> software engineering</span>,
              and
              <span style={{ color: "#8764b8" }}> premium product design</span>.
              I build things that work beautifully — from 5G network
              infrastructure to pixel-perfect web apps.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex items-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CTAButton primary onClick={() => setActiveNav("timeline")}>
              View My Journey →
            </CTAButton>
            <CTAButton
              onClick={() => window.open("https://github.com/sajana", "_blank")}
            >
              GitHub Profile
            </CTAButton>
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-4 gap-4 mb-10"
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
            className="flex flex-col items-center justify-center rounded-xl py-5"
            style={{
              background: "rgba(0,120,212,0.08)",
              border: "1px solid rgba(0,120,212,0.20)",
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 700, color: "#0078d4" }}>
              {s.value}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "#8888aa",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick links grid */}
      <div>
        <p
          style={{
            fontSize: 12,
            color: "#8888aa",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Quick Access
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "My Projects", icon: "📁", color: "#e3a21a", nav: null },
            { label: "Skills", icon: "⚙️", color: "#0078d4", nav: null },
            {
              label: "Experience",
              icon: "💼",
              color: "#107c41",
              nav: "experience",
            },
            { label: "Education", icon: "🎓", color: "#8764b8", nav: null },
            { label: "Resume", icon: "📄", color: "#c43e1c", nav: null },
            { label: "Contact Me", icon: "📬", color: "#0078d4", nav: null },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${item.color === "#e3a21a" ? "227,162,26" : "0,120,212"},0.12)`;
                e.currentTarget.style.borderColor = item.color + "44";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
              onClick={() => item.nav && setActiveNav(item.nav)}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: "#e8e8f0" }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPane() {
  return (
    <div className="p-8 max-w-2xl">
      <SectionHeader icon="👤" title="About Me" />
      <div
        className="space-y-5"
        style={{ fontSize: 14, color: "#bbb", lineHeight: 1.9 }}
      >
        <p>
          I'm{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>
            Sajana Senanayake
          </span>
          , an Electrical & Information Engineering undergraduate at the
          University of Ruhuna, Sri Lanka. My academic path sits at the
          crossroads of hardware, telecom, and software — and I've spent the
          last few years building bridges between all three.
        </p>
        <p>
          On the <span style={{ color: "#0078d4" }}>engineering side</span>, I
          work with signal processing, RF systems, and network infrastructure.
          I've interned at ZTE Lanka working on live 4G/5G deployment and have
          done university research on 5G resource allocation algorithms.
        </p>
        <p>
          On the <span style={{ color: "#107c41" }}>software side</span>, I'm a
          full-stack developer specializing in React, Vite, Tailwind CSS, and
          Supabase. I've delivered 10+ production projects — restaurant systems,
          salon sites, IT company sites, and a full Electron desktop CRM app.
        </p>
        <p>
          On the <span style={{ color: "#8764b8" }}>design side</span>, I care
          deeply about premium UI/UX. Every pixel matters. I build interfaces
          that feel as good as they look — smooth animations, glassmorphism,
          thoughtful micro-interactions.
        </p>
        <p>
          Outside of work: I tinker, I build, and I chase that perfect
          intersection of engineering precision and creative design. This
          portfolio is one of those projects — a full Windows 11 OS experience,
          built entirely in React.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {[
          { label: "Full Name", value: "Sajana Senanayake" },
          { label: "Location", value: "Sri Lanka 🇱🇰" },
          { label: "Degree", value: "B.Sc. Electrical & Information Eng." },
          { label: "University", value: "University of Ruhuna" },
          { label: "Status", value: "Undergraduate (Final Year)" },
          { label: "Available", value: "Yes — open to opportunities" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 p-3 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "#8888aa",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {item.label}
            </span>
            <span style={{ fontSize: 13, color: "#e8e8f0" }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelinePane() {
  return (
    <div className="p-8">
      <SectionHeader icon="📅" title="My Journey" />
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(to bottom, #0078d4, transparent)",
          }}
        />

        <div className="space-y-1">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="relative flex gap-6 pb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              {/* Dot */}
              <div className="shrink-0 w-12 flex items-start justify-center pt-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg z-10"
                  style={{
                    background: item.color + "22",
                    border: `1.5px solid ${item.color}55`,
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{
                      background: item.color + "22",
                      color: item.color,
                      border: `1px solid ${item.color}44`,
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f0" }}
                  >
                    {item.title}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#8888aa" }}>{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsPane() {
  const bars = [
    { label: "React / Frontend", pct: 92, color: "#0078d4" },
    { label: "UI/UX Design", pct: 85, color: "#8764b8" },
    { label: "Network Engineering", pct: 80, color: "#c43e1c" },
    { label: "Backend / Supabase", pct: 78, color: "#107c41" },
    { label: "Python / MATLAB", pct: 75, color: "#e3a21a" },
    { label: "Telecom / 5G", pct: 72, color: "#0078d4" },
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

function ExperiencePane() {
  return (
    <div className="p-8 space-y-6 max-w-2xl">
      <SectionHeader icon="💼" title="Experience" />
      {[
        {
          company: "ZTE Lanka",
          role: "Network Engineer Intern",
          period: "2024",
          type: "Internship",
          color: "#c43e1c",
          icon: "📡",
          points: [
            "Assisted in 4G/5G NR site integration and commissioning",
            "Performed drive tests and RF optimization across Colombo",
            "Worked with ZTE ZXMP transport and BBU equipment",
            "Prepared network audit and performance reports",
          ],
        },
        {
          company: "Freelance",
          role: "Full-Stack Web Developer",
          period: "2023 – Present",
          type: "Self-employed",
          color: "#0078d4",
          icon: "💻",
          points: [
            "Delivered 10+ production websites for Sri Lankan SMEs",
            "Built React/Vite/Tailwind/Supabase full-stack apps",
            "Designed reusable config-driven static templates",
            "Created ClientFlow — full Electron + SQLite desktop CRM",
          ],
        },
      ].map((exp, i) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
          className="rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${exp.color}33`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{
                background: exp.color + "22",
                border: `1.5px solid ${exp.color}44`,
              }}
            >
              {exp.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
                  {exp.company}
                </h3>
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    background: exp.color + "22",
                    color: exp.color,
                    border: `1px solid ${exp.color}44`,
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: exp.color,
                  marginBottom: 12,
                  fontWeight: 500,
                }}
              >
                {exp.role}
              </p>
              <ul className="space-y-1.5">
                {exp.points.map((pt, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2"
                    style={{ fontSize: 13, color: "#aaa" }}
                  >
                    <span style={{ color: exp.color, marginTop: 1 }}>›</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
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
