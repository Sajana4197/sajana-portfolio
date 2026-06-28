import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../../data/projects.json";

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: "📁", color: "#e3a21a" },
  {
    id: "Network Engineering",
    label: "Network Engineering",
    icon: "🔌",
    color: "#c43e1c",
  },
  {
    id: "Web Development",
    label: "Web Development",
    icon: "🌐",
    color: "#0078d4",
  },
  // { id: "UI/UX", label: "UI/UX Design", icon: "🎨", color: "#8764b8" },
  {
    id: "Final Year Project",
    label: "Final Year Project",
    icon: "🎓",
    color: "#107c41",
  },
  // { id: "Freelance", label: "Freelance", icon: "💼", color: "#e3a21a" },
];

const VIEW_MODES = ["grid", "list", "details"];

export default function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortBy, setSortBy] = useState("year");
  const [searchVal, setSearchVal] = useState("");

  const filtered = projects
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.description.toLowerCase().includes(searchVal.toLowerCase()),
    )
    .sort((a, b) =>
      sortBy === "year"
        ? b.year.localeCompare(a.year)
        : a.title.localeCompare(b.title),
    );

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Toolbar ── */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <NavBtn>‹</NavBtn>
        <NavBtn>›</NavBtn>
        <NavBtn>↑</NavBtn>

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
          <span style={{ color: "#0078d4" }}>Projects</span>
          {activeCategory !== "all" && (
            <>
              <span style={{ color: "#555" }}> › </span>
              <span style={{ color: "#e8e8f0" }}>{activeCat?.label}</span>
            </>
          )}
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-md"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            width: 180,
          }}
        >
          <SearchSVG />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search projects..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e8e8f0",
              fontSize: 13,
              fontFamily: "'Segoe UI', sans-serif",
            }}
          />
        </div>
      </div>

      {/* ── Ribbon ── */}
      <div
        className="flex items-center justify-between px-3 py-1 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div className="flex items-center gap-1">
          {/* Sort */}
          <RibbonBtn icon="↕️" label="Sort by">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "rgba(28,28,42,0.98)",
                color: "#e8e8f0",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 6,
                fontSize: 12,
                padding: "2px 6px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="year">Year</option>
              <option value="title">Name</option>
            </select>
          </RibbonBtn>
        </div>

        {/* View mode toggles */}
        <div className="flex items-center gap-1">
          {[
            { mode: "grid", icon: <GridIcon4 /> },
            { mode: "list", icon: <ListIcon3 /> },
            { mode: "details", icon: <DetailsIcon /> },
          ].map((v) => (
            <button
              key={v.mode}
              onClick={() => setViewMode(v.mode)}
              title={v.mode}
              style={{
                width: 28,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  viewMode === v.mode ? "rgba(0,120,212,0.25)" : "transparent",
                border:
                  viewMode === v.mode
                    ? "1px solid rgba(0,120,212,0.4)"
                    : "1px solid transparent",
                borderRadius: 5,
                cursor: "pointer",
                transition: "all 0.12s",
              }}
            >
              {v.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body: sidebar + content ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — folder tree */}
        <div
          className="flex flex-col py-2 shrink-0 overflow-y-auto"
          style={{
            width: 200,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#8888aa",
              padding: "4px 12px 8px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontWeight: 600,
            }}
          >
            Folders
          </p>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedProject(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background:
                  activeCategory === cat.id
                    ? "rgba(0,120,212,0.20)"
                    : "transparent",
                borderLeft:
                  activeCategory === cat.id
                    ? "2px solid #0078d4"
                    : "2px solid transparent",
                color: activeCategory === cat.id ? "#e8e8f0" : "#aaa",
                fontSize: 13,
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id)
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16 }}>{cat.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{cat.label}</div>
                <div style={{ fontSize: 10, color: "#8888aa" }}>
                  {cat.id === "all"
                    ? `${projects.length} projects`
                    : `${projects.filter((p) => p.category === cat.id).length} projects`}
                </div>
              </div>
            </button>
          ))}

          {/* Divider */}
          <div
            className="mx-3 my-3"
            style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
          />

          {/* Links */}
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
            Links
          </p>
          {[
            {
              label: "GitHub",
              icon: "🐙",
              href: "https://github.com/Sajana4197",
            },
            {
              label: "LinkedIn",
              icon: "🔗",
              href: "https://linkedin.com/in/sajana",
            },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => window.open(link.href, "_blank")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background: "transparent",
                color: "#aaa",
                fontSize: 13,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: "#555" }}>
                ↗
              </span>
            </button>
          ))}
        </div>

        {/* ── Content + Detail panel ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* File area */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: 28 }}>{activeCat?.icon}</span>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 600, color: "#fff" }}>
                  {activeCat?.label}
                </h2>
                <p style={{ fontSize: 12, color: "#8888aa" }}>
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${viewMode}-${searchVal}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <span style={{ fontSize: 48 }}>📭</span>
                    <p style={{ color: "#8888aa", fontSize: 14 }}>
                      No projects found
                    </p>
                  </div>
                ) : viewMode === "grid" ? (
                  <GridView
                    projects={filtered}
                    selected={selectedProject}
                    onSelect={setSelectedProject}
                  />
                ) : viewMode === "list" ? (
                  <ListView
                    projects={filtered}
                    selected={selectedProject}
                    onSelect={setSelectedProject}
                  />
                ) : (
                  <DetailsView
                    projects={filtered}
                    selected={selectedProject}
                    onSelect={setSelectedProject}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Detail panel ── */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(0,0,0,0.2)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <ProjectDetail
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              </motion.div>
            )}
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
        <span>
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        </span>
        {selectedProject && (
          <span style={{ color: "#0078d4" }}>
            "{selectedProject.title}" selected
          </span>
        )}
        <span>Projects — Sajana Senanayake</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   VIEW MODES
══════════════════════════════════════════ */

function GridView({ projects, selected, onSelect }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
    >
      {projects.map((p, i) => {
        const cat = CATEGORIES.find((c) => c.id === p.category);
        const isSel = selected?.id === p.id;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(isSel ? null : p)}
            onDoubleClick={() => window.open(p.github, "_blank")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer"
            style={{
              background: isSel
                ? "rgba(0,120,212,0.20)"
                : "rgba(255,255,255,0.04)",
              border: isSel
                ? "1.5px solid rgba(0,120,212,0.5)"
                : "1.5px solid rgba(255,255,255,0.07)",
              transition: "all 0.15s",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.07)" }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Folder icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{
                background: (cat?.color ?? "#888") + "22",
                border: `1.5px solid ${cat?.color ?? "#888"}33`,
              }}
            >
              {cat?.icon ?? "📁"}
            </div>
            <div className="text-center">
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#e8e8f0",
                  lineHeight: 1.4,
                }}
              >
                {p.title}
              </p>
              <p style={{ fontSize: 10, color: "#8888aa", marginTop: 2 }}>
                {p.year}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ListView({ projects, selected, onSelect }) {
  return (
    <div className="flex flex-col gap-1">
      {projects.map((p, i) => {
        const cat = CATEGORIES.find((c) => c.id === p.category);
        const isSel = selected?.id === p.id;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(isSel ? null : p)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer"
            style={{
              background: isSel ? "rgba(0,120,212,0.20)" : "transparent",
              border: isSel
                ? "1px solid rgba(0,120,212,0.4)"
                : "1px solid transparent",
              transition: "all 0.12s",
            }}
            onMouseEnter={(e) => {
              if (!isSel)
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              if (!isSel) e.currentTarget.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: 22 }}>{cat?.icon ?? "📁"}</span>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 500 }}>
                {p.title}
              </p>
              <p
                style={{ fontSize: 11, color: "#8888aa", marginTop: 1 }}
                className="truncate"
              >
                {p.description}
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded text-xs shrink-0"
              style={{
                background: (cat?.color ?? "#888") + "22",
                color: cat?.color ?? "#888",
              }}
            >
              {p.year}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function DetailsView({ projects, selected, onSelect }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header row */}
      <div
        className="grid px-4 py-2"
        style={{
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          fontSize: 11,
          color: "#8888aa",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        <span>Name</span>
        <span>Category</span>
        <span>Tech</span>
        <span>Year</span>
      </div>
      {projects.map((p, i) => {
        const cat = CATEGORIES.find((c) => c.id === p.category);
        const isSel = selected?.id === p.id;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onSelect(isSel ? null : p)}
            className="grid px-4 py-2.5 cursor-pointer"
            style={{
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              background: isSel
                ? "rgba(0,120,212,0.18)"
                : i % 2 === 0
                  ? "transparent"
                  : "rgba(255,255,255,0.02)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => {
              if (!isSel)
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              if (!isSel)
                e.currentTarget.style.background =
                  i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)";
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 16 }}>{cat?.icon}</span>
              <span style={{ fontSize: 13, color: "#e8e8f0" }}>{p.title}</span>
            </div>
            <span
              style={{ fontSize: 12, color: "#8888aa", alignSelf: "center" }}
            >
              {p.category}
            </span>
            <span
              style={{ fontSize: 11, color: "#8888aa", alignSelf: "center" }}
              className="truncate"
            >
              {p.tech.slice(0, 2).join(", ")}
            </span>
            <span
              style={{
                fontSize: 12,
                color: cat?.color,
                alignSelf: "center",
                fontWeight: 600,
              }}
            >
              {p.year}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════
   PROJECT DETAIL PANEL
══════════════════════════════════════════ */

function ProjectDetail({ project, onClose }) {
  const cat = CATEGORIES.find((c) => c.id === project.category);
  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: 260 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span style={{ fontSize: 13, color: "#8888aa", fontWeight: 600 }}>
          Details
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#8888aa",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Icon */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: (cat?.color ?? "#888") + "22",
              border: `2px solid ${cat?.color ?? "#888"}44`,
            }}
          >
            {cat?.icon ?? "📁"}
          </div>
          <div className="text-center">
            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
              {project.title}
            </p>
            <p style={{ fontSize: 11, color: "#8888aa", marginTop: 2 }}>
              {project.category}
            </p>
          </div>
        </div>

        <Divider />

        {/* Description */}
        <DetailSection label="Description">
          <p style={{ fontSize: 12, color: "#bbb", lineHeight: 1.7 }}>
            {project.description}
          </p>
        </DetailSection>

        <Divider />

        {/* Tech stack */}
        <DetailSection label="Tech Stack">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: "rgba(0,120,212,0.15)",
                  color: "#0078d4",
                  border: "1px solid rgba(0,120,212,0.25)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </DetailSection>

        <Divider />

        {/* Meta */}
        <DetailSection label="Info">
          <div className="space-y-1.5">
            <MetaRow label="Year" value={project.year} />
            <MetaRow label="Category" value={project.category} />
            <MetaRow label="Status" value="Completed" />
          </div>
        </DetailSection>

        <Divider />

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <ActionBtn
            icon="🐙"
            label="View on GitHub"
            onClick={() => window.open(project.github, "_blank")}
            color="#0078d4"
          />
          {project.demo && (
            <ActionBtn
              icon="🚀"
              label="Live Demo"
              onClick={() => window.open(project.demo, "_blank")}
              color="#107c41"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */

function NavBtn({ children }) {
  const [hov, setHov] = useState(false);
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
        color: "#8888aa",
        fontSize: 14,
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  );
}

function RibbonBtn({ icon, label, children }) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded"
      style={{ fontSize: 12, color: "#8888aa" }}
    >
      <span>{icon}</span>
      <span>{label}:</span>
      {children}
    </div>
  );
}

function DetailSection({ label, children }) {
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

function MetaRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span style={{ fontSize: 11, color: "#8888aa" }}>{label}</span>
      <span style={{ fontSize: 11, color: "#e8e8f0" }}>{value}</span>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />;
}

function ActionBtn({ icon, label, onClick, color }) {
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

function GridIcon4() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect
        x="0"
        y="0"
        width="5.5"
        height="5.5"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="7.5"
        y="0"
        width="5.5"
        height="5.5"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="0"
        y="7.5"
        width="5.5"
        height="5.5"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="7.5"
        y="7.5"
        width="5.5"
        height="5.5"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
    </svg>
  );
}

function ListIcon3() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect
        x="0"
        y="1"
        width="13"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="0"
        y="5.5"
        width="13"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="0"
        y="10"
        width="13"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect
        x="0"
        y="0"
        width="13"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="0"
        y="3"
        width="9"
        height="1.5"
        rx="0.75"
        fill="rgba(255,255,255,0.3)"
      />
      <rect
        x="0"
        y="5.5"
        width="13"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
      <rect
        x="0"
        y="8.5"
        width="9"
        height="1.5"
        rx="0.75"
        fill="rgba(255,255,255,0.3)"
      />
      <rect
        x="0"
        y="11"
        width="13"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.5)"
      />
    </svg>
  );
}
