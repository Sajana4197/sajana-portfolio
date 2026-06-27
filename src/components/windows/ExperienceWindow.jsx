import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import experienceData from "../../data/experience.json";
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

const TABS = ["Timeline", "Cards", "Details"];

export default function ExperienceWindow() {
  const [activeTab, setActiveTab] = useState("Timeline");
  const [selected, setSelected] = useState(null);

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
        <AddressBar crumbs={["This PC", "Portfolio", "Experience"]} />
      </div>

      {/* ── Tabs ── */}
      <TabBar
        tabs={TABS}
        active={activeTab}
        onChange={(t) => {
          setActiveTab(t);
          setSelected(null);
        }}
      />

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="flex flex-col py-3 gap-1 shrink-0 overflow-y-auto"
          style={{
            width: 190,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <SidebarLabel>Positions</SidebarLabel>
          {experienceData.map((exp) => (
            <button
              key={exp.company}
              onClick={() => setSelected(exp)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                padding: "8px 12px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background:
                  selected?.company === exp.company
                    ? "rgba(0,120,212,0.20)"
                    : "transparent",
                borderLeft:
                  selected?.company === exp.company
                    ? "2px solid #0078d4"
                    : "2px solid transparent",
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => {
                if (selected?.company !== exp.company)
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (selected?.company !== exp.company)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 18, marginTop: 1 }}>💼</span>
              <div>
                <div
                  style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f0" }}
                >
                  {exp.company}
                </div>
                <div style={{ fontSize: 11, color: "#8888aa" }}>
                  {exp.period}
                </div>
              </div>
            </button>
          ))}

          <div
            className="mx-3 my-2"
            style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
          />
          <SidebarLabel>Stats</SidebarLabel>
          {[
            { label: "Positions", value: experienceData.length },
            { label: "Years Exp.", value: "2+" },
            { label: "Projects", value: "10+" },
          ].map((s) => (
            <div key={s.label} className="flex justify-between px-3 py-1">
              <span style={{ fontSize: 12, color: "#8888aa" }}>{s.label}</span>
              <span style={{ fontSize: 12, color: "#0078d4", fontWeight: 600 }}>
                {s.value}
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
              {activeTab === "Timeline" && (
                <TimelineView data={experienceData} />
              )}
              {activeTab === "Cards" && (
                <CardsView
                  data={experienceData}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
              {activeTab === "Details" && (
                <DetailsView
                  data={experienceData}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status bar */}
      <StatusBar
        left={`${experienceData.length} positions`}
        right="Experience — Sajana Senanayake"
      />
    </div>
  );
}

function TimelineView({ data }) {
  return (
    <div className="max-w-xl">
      <SectionHeader icon="📅" title="Career Timeline" />
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-3 top-0 bottom-0 w-0.5"
          style={{
            background: "linear-gradient(to bottom, #0078d4, transparent)",
          }}
        />

        {data.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="relative mb-10"
          >
            {/* Dot */}
            <div
              className="absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: exp.color,
                boxShadow: `0 0 12px ${exp.color}66`,
                fontSize: 12,
              }}
            >
              💼
            </div>

            {/* Card */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${exp.color}33`,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                    {exp.company}
                  </h3>
                  <p
                    style={{ fontSize: 13, color: exp.color, fontWeight: 500 }}
                  >
                    {exp.role}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
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
                  <span style={{ fontSize: 11, color: "#8888aa" }}>
                    {exp.type}
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "#aaa",
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}
              >
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.achievements.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "#ccc",
                    }}
                  >
                    <span style={{ color: exp.color }}>›</span> {a}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Future */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-4"
        >
          <div
            className="absolute -left-8 top-1 w-6 h-6 rounded-full border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: "#8888aa", fontSize: 12 }}
          >
            ✨
          </div>
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.10)",
            }}
          >
            <p style={{ fontSize: 13, color: "#8888aa", fontStyle: "italic" }}>
              Next chapter loading... open to new opportunities 🚀
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CardsView({ data, selected, onSelect }) {
  return (
    <div>
      <SectionHeader icon="💼" title="Work Experience" />
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {data.map((exp, i) => {
          const isSel = selected?.company === exp.company;
          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(isSel ? null : exp)}
              className="p-5 rounded-2xl cursor-pointer"
              style={{
                background: isSel ? exp.color + "15" : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${isSel ? exp.color + "55" : "rgba(255,255,255,0.07)"}`,
                transition: "all 0.18s",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: exp.color + "22",
                    border: `1.5px solid ${exp.color}44`,
                  }}
                >
                  💼
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                    {exp.company}
                  </h3>
                  <p
                    style={{ fontSize: 12, color: exp.color, fontWeight: 500 }}
                  >
                    {exp.role}
                  </p>
                  <p style={{ fontSize: 11, color: "#8888aa", marginTop: 2 }}>
                    {exp.period} · {exp.type}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7 }}>
                {exp.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {exp.achievements.slice(0, 2).map((a) => (
                  <span
                    key={a}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: exp.color + "15", color: exp.color }}
                  >
                    {a.length > 30 ? a.slice(0, 30) + "…" : a}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DetailsView({ data, selected, onSelect }) {
  return (
    <div>
      <SectionHeader icon="📋" title="Detailed View" />
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
          className="grid px-4 py-2"
          style={{
            gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            fontSize: 11,
            color: "#8888aa",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          <span>Company</span>
          <span>Role</span>
          <span>Period</span>
          <span>Type</span>
        </div>
        {data.map((exp, i) => {
          const isSel = selected?.company === exp.company;
          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(isSel ? null : exp)}
              className="grid px-4 py-3 cursor-pointer"
              style={{
                gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr",
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
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: exp.color }}
                />
                <span style={{ fontSize: 13, color: "#e8e8f0" }}>
                  {exp.company}
                </span>
              </div>
              <span
                style={{ fontSize: 13, color: "#aaa", alignSelf: "center" }}
              >
                {exp.role}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: exp.color,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                {exp.period}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs self-center w-fit"
                style={{ background: exp.color + "22", color: exp.color }}
              >
                {exp.type}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-5 rounded-xl overflow-hidden"
            style={{
              background: selected.color + "10",
              border: `1px solid ${selected.color}33`,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              {selected.company} — {selected.role}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#aaa",
                lineHeight: 1.7,
                marginBottom: 12,
              }}
            >
              {selected.description}
            </p>
            <div className="space-y-2">
              {selected.achievements.map((a) => (
                <div key={a} className="flex items-start gap-2">
                  <span style={{ color: selected.color, marginTop: 1 }}>›</span>
                  <span style={{ fontSize: 13, color: "#ccc" }}>{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
