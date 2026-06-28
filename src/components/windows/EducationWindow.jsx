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
import { useDesktopStore } from "../../store/desktopStore";

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
        tabs={["Overview", "Certificates"]}
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
              {activeTab === "Certificates" && (
                <EduCertificates data={educationData} />
              )}
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

function EduCertificates({ data }) {
  const { openWindow } = useDesktopStore();

  function openCert(cert) {
    openWindow(
      `edu-cert-${cert.title}`,
      cert.title,
      () => (
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
            <span style={{ fontSize: 13, color: "#8888aa" }}>🏆</span>
            <span style={{ fontSize: 13, color: "#0078d4" }}>{cert.title}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={cert.file}
              title={cert.title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "#fff",
              }}
            />
          </div>
        </div>
      ),
      "🏆",
    );
  }

  return (
    <div className="p-6">
      <SectionHeader icon="🏆" title="Education Certificates" />
      <div className="space-y-8">
        {data.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Education header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{
                  background: edu.color + "22",
                  border: `1.5px solid ${edu.color}44`,
                }}
              >
                🎓
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                  {edu.institution}
                </p>
                <p style={{ fontSize: 12, color: "#8888aa" }}>{edu.period}</p>
              </div>
              <span
                className="ml-auto px-2 py-0.5 rounded text-xs"
                style={{
                  background: edu.color + "22",
                  color: edu.color,
                  border: `1px solid ${edu.color}44`,
                }}
              >
                {edu.status}
              </span>
            </div>

            {/* Certificates grid */}
            {edu.certificates && edu.certificates.length > 0 ? (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                }}
              >
                {edu.certificates.map((cert, j) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + j * 0.07 }}
                    onClick={() => openCert(cert)}
                    className="flex items-center gap-3 p-4 rounded-xl cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${edu.color}22`,
                      transition: "all 0.18s",
                    }}
                    whileHover={{
                      scale: 1.03,
                      background: edu.color + "12",
                      borderColor: edu.color + "55",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: edu.color + "22",
                        border: `1.5px solid ${edu.color}44`,
                      }}
                    >
                      {cert.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#e8e8f0",
                          lineHeight: 1.3,
                        }}
                      >
                        {cert.title}
                      </p>
                      <p
                        style={{ fontSize: 11, color: "#8888aa", marginTop: 2 }}
                      >
                        {cert.year}
                      </p>
                    </div>

                    {/* Open indicator */}
                    <div className="shrink-0 flex flex-col items-center gap-1">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: "#107c4122",
                          border: "1px solid #107c4144",
                        }}
                      >
                        <span style={{ fontSize: 10, color: "#107c41" }}>
                          ✓
                        </span>
                      </div>
                      <span style={{ fontSize: 9, color: "#8888aa" }}>
                        view
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px dashed rgba(255,255,255,0.10)",
                }}
              >
                <span style={{ fontSize: 16 }}>📭</span>
                <span style={{ fontSize: 13, color: "#8888aa" }}>
                  No certificates added yet
                </span>
              </div>
            )}

            {/* Divider between institutions */}
            {i < data.length - 1 && (
              <div
                className="mt-6"
                style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
