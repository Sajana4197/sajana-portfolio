import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import educationData from "../../data/education.json";
import {
  NavBtn,
  AddressBar,
  TabBar,
  StatusBar,
  SidebarLabel,
  SectionHeader,
  Divider,
  DetailSection,
  MetaRow,
  ViewToggle,
} from "./_shared.jsx";

const SUBJECTS = [
  { name: "Signal Processing", icon: "📡", grade: "A", color: "#0078d4" },
  { name: "Telecommunications", icon: "🔌", grade: "A", color: "#0078d4" },
  { name: "Embedded Systems", icon: "💾", grade: "B+", color: "#107c41" },
  { name: "Digital Electronics", icon: "⚡", grade: "A-", color: "#107c41" },
  { name: "Computer Networks", icon: "🌐", grade: "A", color: "#0078d4" },
  { name: "Mathematics", icon: "📐", grade: "A-", color: "#8764b8" },
  { name: "Circuit Theory", icon: "🔧", grade: "B+", color: "#e3a21a" },
  { name: "Programming", icon: "💻", grade: "A+", color: "#0078d4" },
];

const ACTIVITIES = [
  { label: "IEEE Student Member", icon: "🏛️" },
  { label: "Engineering Society", icon: "⚙️" },
  { label: "Final Year Research Project", icon: "🔬" },
  { label: "Robotics Club Member", icon: "🤖" },
];

export default function EducationWindow() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <NavBtn>‹</NavBtn>
        <NavBtn>›</NavBtn>
        <AddressBar crumbs={["This PC", "Portfolio", "Education"]} />
      </div>

      <TabBar
        tabs={["Overview", "Subjects", "Activities"]}
        active={activeTab}
        onChange={setActiveTab}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="flex flex-col py-3 gap-1 shrink-0"
          style={{
            width: 190,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <SidebarLabel>Institutions</SidebarLabel>
          {educationData.map((edu) => (
            <div key={edu.degree} className="px-3 py-2">
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#e8e8f0",
                  lineHeight: 1.4,
                }}
              >
                {edu.institution}
              </div>
              <div style={{ fontSize: 11, color: "#8888aa", marginTop: 2 }}>
                {edu.period}
              </div>
              <span
                className="inline-block mt-1 px-1.5 py-0.5 rounded text-xs"
                style={{
                  background: edu.color + "22",
                  color: edu.color,
                  fontSize: 10,
                }}
              >
                {edu.status}
              </span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "Overview" && <EduOverview data={educationData} />}
              {activeTab === "Subjects" && <EduSubjects />}
              {activeTab === "Activities" && <EduActivities />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <StatusBar
        left={`${educationData.length} institutions`}
        right="Education — Sajana Senanayake"
      />
    </div>
  );
}

function EduOverview({ data }) {
  return (
    <div className="max-w-2xl">
      <SectionHeader icon="🎓" title="Education" />
      <div className="space-y-5">
        {data.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1.5px solid ${edu.color}33`,
            }}
          >
            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{
                  background: edu.color + "22",
                  border: `2px solid ${edu.color}44`,
                }}
              >
                🎓
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.4,
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: edu.color,
                        fontWeight: 500,
                        marginTop: 2,
                      }}
                    >
                      {edu.institution}
                    </p>
                    <p style={{ fontSize: 12, color: "#8888aa", marginTop: 1 }}>
                      {edu.faculty}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: edu.color + "22",
                        color: edu.color,
                        border: `1px solid ${edu.color}44`,
                      }}
                    >
                      {edu.period}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "#8888aa",
                      }}
                    >
                      {edu.status}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#aaa",
                    lineHeight: 1.7,
                    marginTop: 12,
                  }}
                >
                  {edu.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EduSubjects() {
  const gradeColor = {
    "A+": "#107c41",
    A: "#107c41",
    "A-": "#0078d4",
    "B+": "#e3a21a",
  };
  return (
    <div>
      <SectionHeader icon="📚" title="Key Subjects" />
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {SUBJECTS.map((sub, i) => (
          <motion.div
            key={sub.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${sub.color}22`,
            }}
            whileHover={{ scale: 1.03, background: sub.color + "10" }}
          >
            <span style={{ fontSize: 24 }}>{sub.icon}</span>
            <div className="flex-1">
              <p style={{ fontSize: 13, color: "#e8e8f0", fontWeight: 500 }}>
                {sub.name}
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded font-mono text-xs font-bold"
              style={{
                background: (gradeColor[sub.grade] ?? "#8764b8") + "22",
                color: gradeColor[sub.grade] ?? "#8764b8",
              }}
            >
              {sub.grade}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EduActivities() {
  return (
    <div>
      <SectionHeader icon="🏛️" title="Activities & Societies" />
      <div className="space-y-3 max-w-lg">
        {ACTIVITIES.map((act, i) => (
          <motion.div
            key={act.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span style={{ fontSize: 28 }}>{act.icon}</span>
            <span style={{ fontSize: 14, color: "#e8e8f0" }}>{act.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
