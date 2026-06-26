import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "../../data/skills.json";

const VIEWS = ["categories", "detail"];

const TOOLS = [
  { name: "VS Code", icon: "🖊️", level: "Expert" },
  { name: "Figma", icon: "🎨", level: "Advanced" },
  { name: "Git / GitHub", icon: "🐙", level: "Advanced" },
  { name: "MATLAB", icon: "📊", level: "Intermediate" },
  { name: "GNS3", icon: "🔌", level: "Intermediate" },
  { name: "Cisco PT", icon: "🖧", level: "Intermediate" },
  { name: "Postman", icon: "📬", level: "Advanced" },
  { name: "Linux / Bash", icon: "🐧", level: "Intermediate" },
  { name: "Electron", icon: "⚡", level: "Intermediate" },
  { name: "Supabase", icon: "🗄️", level: "Advanced" },
  { name: "Vite", icon: "⚡", level: "Expert" },
  { name: "npm / Node", icon: "📦", level: "Advanced" },
];

const LEVEL_COLOR = {
  Expert: "#0078d4",
  Advanced: "#107c41",
  Intermediate: "#e3a21a",
  Beginner: "#8764b8",
};

const CERT_BADGES = [
  { label: "Cisco CCNA Concepts", icon: "🏅", color: "#c43e1c" },
  { label: "ZTE 5G NR Certified", icon: "📡", color: "#0078d4" },
  { label: "React Developer", icon: "⚛️", color: "#0078d4" },
  { label: "Supabase Builder", icon: "🗄️", color: "#107c41" },
];

/* Control Panel category tiles */
const CP_CATEGORIES = [
  {
    id: "Frontend",
    icon: "🖥️",
    color: "#0078d4",
    desc: "React, Tailwind, JavaScript, Framer Motion, HTML/CSS",
  },
  {
    id: "Backend",
    icon: "⚙️",
    color: "#107c41",
    desc: "Node.js, Supabase, SQLite, REST APIs",
  },
  {
    id: "UI Design",
    icon: "🎨",
    color: "#8764b8",
    desc: "Figma, Design Systems, Glassmorphism, Responsive Design",
  },
  {
    id: "Telecom & Networking",
    icon: "📡",
    color: "#c43e1c",
    desc: "TCP/IP, Cisco, SDN, OFDM, 5G Concepts",
  },
  {
    id: "Engineering Tools",
    icon: "🔧",
    color: "#e3a21a",
    desc: "MATLAB, Python, Git, Linux",
  },
];

export default function SkillsWindow() {
  const [view, setView] = useState("categories"); // 'categories' | 'detail'
  const [activeSection, setActiveSection] = useState("skills"); // 'skills' | 'tools' | 'certs' | 'radar'
  const [selectedCat, setSelectedCat] = useState(null);

  function openCategory(cat) {
    setSelectedCat(cat);
    setView("detail");
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Control Panel toolbar ── */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <NavBtn
          onClick={() => setView("categories")}
          disabled={view === "categories"}
        >
          ‹
        </NavBtn>
        <NavBtn disabled>›</NavBtn>

        {/* Address */}
        <div
          className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-md"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "#8888aa" }}>⚙️</span>
          <span style={{ color: "#8888aa" }}>Control Panel</span>
          <span style={{ color: "#555" }}> › </span>
          <span style={{ color: "#0078d4" }}>Skills</span>
          {view === "detail" && selectedCat && (
            <>
              <span style={{ color: "#555" }}> › </span>
              <span style={{ color: "#e8e8f0" }}>{selectedCat.id}</span>
            </>
          )}
        </div>

        {/* Search box */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-md"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            width: 160,
          }}
        >
          <SearchSVG />
          <span style={{ fontSize: 13, color: "#8888aa" }}>Search Skills</span>
        </div>
      </div>

      {/* ── Section tabs ── */}
      <div
        className="flex items-center gap-1 px-3 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        {[
          { id: "skills", label: "Skills" },
          { id: "tools", label: "Tools" },
          { id: "certs", label: "Badges" },
          { id: "radar", label: "Overview" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSection(tab.id);
              setView("categories");
              setSelectedCat(null);
            }}
            style={{
              padding: "6px 14px",
              fontSize: 13,
              border: "none",
              cursor: "pointer",
              background: "transparent",
              borderBottom:
                activeSection === tab.id
                  ? "2px solid #0078d4"
                  : "2px solid transparent",
              color: activeSection === tab.id ? "#0078d4" : "#8888aa",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab.id)
                e.currentTarget.style.color = "#e8e8f0";
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab.id)
                e.currentTarget.style.color = "#8888aa";
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left nav */}
        <div
          className="flex flex-col py-3 gap-1 shrink-0 overflow-y-auto"
          style={{
            width: 180,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
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
            Categories
          </p>
          {CP_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => openCategory(cat)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background:
                  selectedCat?.id === cat.id
                    ? "rgba(0,120,212,0.20)"
                    : "transparent",
                borderLeft:
                  selectedCat?.id === cat.id
                    ? "2px solid #0078d4"
                    : "2px solid transparent",
                color: selectedCat?.id === cat.id ? "#e8e8f0" : "#aaa",
                fontSize: 13,
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => {
                if (selectedCat?.id !== cat.id)
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (selectedCat?.id !== cat.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16 }}>{cat.icon}</span>
              <span style={{ fontSize: 12 }}>{cat.id}</span>
            </button>
          ))}

          <div
            className="mx-3 my-2"
            style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
          />

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
            View
          </p>
          {["All Skills", "By Proficiency", "By Category"].map((v) => (
            <button
              key={v}
              style={{
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background: "transparent",
                color: "#aaa",
                fontSize: 12,
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {v}
            </button>
          ))}
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeSection === "skills" && (
              <motion.div
                key={`skills-${view}-${selectedCat?.id}`}
                className="p-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {view === "categories" ? (
                  <CategoriesView cats={CP_CATEGORIES} onOpen={openCategory} />
                ) : (
                  <DetailView cat={selectedCat} />
                )}
              </motion.div>
            )}

            {activeSection === "tools" && (
              <motion.div
                key="tools"
                className="p-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <ToolsView />
              </motion.div>
            )}

            {activeSection === "certs" && (
              <motion.div
                key="certs"
                className="p-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <BadgesView />
              </motion.div>
            )}

            {activeSection === "radar" && (
              <motion.div
                key="radar"
                className="p-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <OverviewView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status bar */}
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
        <span>
          {skillsData.reduce((a, c) => a + c.items.length, 0)} skills across{" "}
          {skillsData.length} categories
        </span>
        <span>Control Panel — Skills</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   VIEWS
══════════════════════════════════════════ */

/* Control Panel tile grid */
function CategoriesView({ cats, onOpen }) {
  return (
    <div>
      <SectionHeader icon="⚙️" title="Control Panel — Skills" />
      <p style={{ fontSize: 13, color: "#8888aa", marginBottom: 24 }}>
        Adjust and view skill settings. Double-click a category to see details.
      </p>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
      >
        {cats.map((cat, i) => {
          const data = skillsData.find((s) => s.category === cat.id);
          const avg = data
            ? Math.round(
                data.items.reduce((a, s) => a + s.level, 0) / data.items.length,
              )
            : 0;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onDoubleClick={() => onOpen(cat)}
              onClick={() => onOpen(cat)}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${cat.color}22`,
                transition: "all 0.18s",
              }}
              whileHover={{
                scale: 1.04,
                background: cat.color + "12",
                borderColor: cat.color + "55",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Circular progress ring */}
              <div className="relative" style={{ width: 72, height: 72 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  {/* Track */}
                  <circle
                    cx="36"
                    cy="36"
                    r="28"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="6"
                  />
                  {/* Progress */}
                  <motion.circle
                    cx="36"
                    cy="36"
                    r="28"
                    fill="none"
                    stroke={cat.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 28 * (1 - avg / 100),
                    }}
                    transition={{
                      delay: i * 0.06 + 0.2,
                      duration: 0.9,
                      ease: "easeOut",
                    }}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "36px 36px",
                    }}
                  />
                </svg>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
              </div>

              <div className="text-center">
                <p style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}>
                  {cat.id}
                </p>
                <p style={{ fontSize: 11, color: cat.color, marginTop: 2 }}>
                  {avg}% avg
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "#8888aa",
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {data?.items.length ?? 0} skills
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All skills quick list */}
      <div className="mt-8">
        <SectionHeader icon="📋" title="All Skills" />
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {skillsData
            .flatMap((cat) =>
              cat.items.map((skill) => ({
                ...skill,
                category: cat.category,
                color: cat.color,
              })),
            )
            .map((skill, i) => (
              <motion.div
                key={`${skill.category}-${skill.name}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.02 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: skill.color }}
                />
                <span style={{ fontSize: 13, color: "#e8e8f0", flex: 1 }}>
                  {skill.name}
                </span>
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 60,
                      height: 4,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background: skill.color,
                        borderRadius: 2,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.4 + i * 0.02, duration: 0.5 }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: skill.color,
                      fontWeight: 600,
                      width: 28,
                      textAlign: "right",
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* Category drill-down */
function DetailView({ cat }) {
  const data = skillsData.find((s) => s.category === cat?.id);
  if (!data) return null;

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            background: cat.color + "22",
            border: `2px solid ${cat.color}44`,
          }}
        >
          {cat.icon}
        </div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>
            {cat.id}
          </h2>
          <p style={{ fontSize: 13, color: "#8888aa", marginTop: 2 }}>
            {cat.desc}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {data.items.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 14, color: "#e8e8f0", fontWeight: 500 }}>
                {skill.name}
              </span>
              <div className="flex items-center gap-2">
                <ProficiencyDots level={skill.level} color={cat.color} />
                <span
                  style={{
                    fontSize: 13,
                    color: cat.color,
                    fontWeight: 600,
                    width: 32,
                    textAlign: "right",
                  }}
                >
                  {skill.level}%
                </span>
              </div>
            </div>
            {/* Bar */}
            <div
              style={{
                height: 8,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{
                  delay: i * 0.07 + 0.1,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              />
            </div>
            {/* Level label */}
            <div className="flex justify-between mt-1">
              <span style={{ fontSize: 10, color: "#555" }}>0</span>
              <span style={{ fontSize: 10, color: "#555" }}>100</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Radar mini */}
      <div
        className="mt-8 p-4 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p style={{ fontSize: 12, color: "#8888aa", marginBottom: 12 }}>
          Proficiency breakdown
        </p>
        <div className="flex gap-3 flex-wrap">
          {data.items.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center gap-1">
              <MiniRing value={skill.level} color={cat.color} />
              <span style={{ fontSize: 10, color: "#8888aa" }}>
                {skill.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Tools grid */
function ToolsView() {
  return (
    <div>
      <SectionHeader icon="🔧" title="Tools & Software" />
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      >
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${LEVEL_COLOR[tool.level]}22`,
              transition: "all 0.15s",
            }}
            whileHover={{
              scale: 1.04,
              background: LEVEL_COLOR[tool.level] + "10",
              borderColor: LEVEL_COLOR[tool.level] + "44",
            }}
          >
            <span style={{ fontSize: 28 }}>{tool.icon}</span>
            <span
              style={{
                fontSize: 13,
                color: "#e8e8f0",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {tool.name}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{
                background: LEVEL_COLOR[tool.level] + "22",
                color: LEVEL_COLOR[tool.level],
                border: `1px solid ${LEVEL_COLOR[tool.level]}33`,
              }}
            >
              {tool.level}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Badges / Certs */
function BadgesView() {
  return (
    <div>
      <SectionHeader icon="🏅" title="Badges & Certifications" />
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {CERT_BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 12, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${badge.color}15, rgba(255,255,255,0.03))`,
              border: `1.5px solid ${badge.color}33`,
            }}
            whileHover={{ scale: 1.04, rotate: 1 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: badge.color + "22",
                border: `2px solid ${badge.color}44`,
                boxShadow: `0 0 20px ${badge.color}22`,
              }}
            >
              {badge.icon}
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#e8e8f0",
                textAlign: "center",
              }}
            >
              {badge.label}
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, j) => (
                <span
                  key={j}
                  style={{ fontSize: 10, color: j < 4 ? badge.color : "#555" }}
                >
                  ★
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* In progress */}
      <div className="mt-8">
        <SectionHeader icon="⏳" title="In Progress" />
        <div className="space-y-3 max-w-md">
          {[
            { label: "AWS Cloud Practitioner", pct: 45, color: "#e3a21a" },
            { label: "CCNA Certification", pct: 30, color: "#c43e1c" },
            { label: "Docker / DevOps", pct: 55, color: "#0078d4" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex justify-between mb-1.5">
                <span style={{ fontSize: 13, color: "#e8e8f0" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 12, color: item.color }}>
                  {item.pct}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: item.color,
                    borderRadius: 3,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Overview / Radar */
function OverviewView() {
  const categories = skillsData.map((cat) => ({
    label: cat.category,
    value: Math.round(
      cat.items.reduce((a, s) => a + s.level, 0) / cat.items.length,
    ),
    color: cat.color,
    icon: CP_CATEGORIES.find((c) => c.id === cat.category)?.icon ?? "⚙️",
  }));

  return (
    <div>
      <SectionHeader icon="📊" title="Skills Overview" />

      <div className="flex gap-8 flex-wrap">
        {/* Radar chart */}
        <div className="flex flex-col items-center gap-4">
          <RadarChart categories={categories} />
          <p style={{ fontSize: 12, color: "#8888aa" }}>
            Skill radar — all categories
          </p>
        </div>

        {/* Category bars */}
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 13, color: "#8888aa", marginBottom: 16 }}>
            Average proficiency per category
          </p>
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 16 }}>{cat.icon}</span>
                    <span style={{ fontSize: 13, color: "#e8e8f0" }}>
                      {cat.label}
                    </span>
                  </div>
                  <span
                    style={{ fontSize: 13, color: cat.color, fontWeight: 700 }}
                  >
                    {cat.value}%
                  </span>
                </div>
                <div
                  style={{
                    height: 10,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 5,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    style={{
                      height: "100%",
                      borderRadius: 5,
                      background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.value}%` }}
                    transition={{
                      delay: i * 0.08 + 0.15,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary card */}
          <motion.div
            className="mt-6 p-4 rounded-xl"
            style={{
              background: "rgba(0,120,212,0.08)",
              border: "1px solid rgba(0,120,212,0.20)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p style={{ fontSize: 12, color: "#8888aa", marginBottom: 8 }}>
              Overall Score
            </p>
            <p style={{ fontSize: 32, fontWeight: 700, color: "#0078d4" }}>
              {Math.round(
                categories.reduce((a, c) => a + c.value, 0) / categories.length,
              )}
              %
            </p>
            <p style={{ fontSize: 12, color: "#8888aa", marginTop: 4 }}>
              Average across {categories.length} skill categories
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════ */

function RadarChart({ categories }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 75;
  const n = categories.length;

  function point(angle, radius) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  const rings = [0.25, 0.5, 0.75, 1.0];
  const angleStep = 360 / n;

  const dataPoints = categories.map((cat, i) =>
    point(i * angleStep, (cat.value / 100) * r),
  );
  const pathD =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
    " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {rings.map((ring) => {
        const pts = categories.map((_, i) => point(i * angleStep, r * ring));
        const d =
          pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
          " Z";
        return (
          <path
            key={ring}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        );
      })}

      {/* Spokes */}
      {categories.map((_, i) => {
        const end = point(i * angleStep, r);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <motion.path
        d={pathD}
        fill="rgba(0,120,212,0.15)"
        stroke="#0078d4"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill={categories[i].color}
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.06 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}

      {/* Labels */}
      {categories.map((cat, i) => {
        const labelR = r + 18;
        const p = point(i * angleStep, labelR);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 9, fill: "#8888aa" }}
          >
            {cat.icon}
          </text>
        );
      })}
    </svg>
  );
}

function ProficiencyDots({ level, color }) {
  const filled = Math.round((level / 100) * 5);
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: i < filled ? color : "rgba(255,255,255,0.12)",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}

function MiniRing({ value, color }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="4"
      />
      <motion.circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - value / 100) }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "20px 20px" }}
      />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 8, fill: "#e8e8f0", fontWeight: 600 }}
      >
        {value}
      </text>
    </svg>
  );
}

function SectionHeader({ icon, title }) {
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

function NavBtn({ children, onClick, disabled }) {
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

function SearchSVG() {
  return (
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
  );
}
