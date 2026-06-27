import { useState } from "react";
import { motion } from "framer-motion";
import { NavBtn } from "./_shared.jsx";

export default function ResumeWindow() {
  const [zoom, setZoom] = useState(100);

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── PDF Viewer Toolbar ── */}
      <div
        className="flex items-center gap-2 px-4 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <NavBtn>‹</NavBtn>
        <NavBtn>›</NavBtn>
        <div className="flex-1" />
        {/* Page info */}
        <span style={{ fontSize: 12, color: "#8888aa" }}>Page 1 of 1</span>
        {/* Zoom */}
        <div className="flex items-center gap-1">
          <ToolBtn onClick={() => setZoom((z) => Math.max(50, z - 10))}>
            −
          </ToolBtn>
          <span
            style={{
              fontSize: 12,
              color: "#e8e8f0",
              width: 40,
              textAlign: "center",
            }}
          >
            {zoom}%
          </span>
          <ToolBtn onClick={() => setZoom((z) => Math.min(150, z + 10))}>
            +
          </ToolBtn>
        </div>
        <div
          style={{ width: 1, height: 20, background: "rgba(255,255,255,0.10)" }}
        />
        {/* Download button — replace the onClick */}
        <PDFAction
          icon="⬇️"
          label="Download"
          onClick={() => {
            const a = document.createElement("a");
            a.href = "/resume.pdf";
            a.download = "Sajana_Senanayake_Resume.pdf";
            a.click();
          }}
          primary
        />
        {/* Print button */}
        <PDFAction
          icon="🖨️"
          label="Print"
          onClick={() => {
            window.open("/resume.pdf", "_blank");
          }}
        />
      </div>

      {/* ── PDF Preview area ── */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src="/resume.pdf"
          title="Resume"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <div
      style={{
        padding: "40px 48px",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#1a1a2e",
        lineHeight: 1.6,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "3px solid #0078d4",
          paddingBottom: 16,
          marginBottom: 20,
        }}
      >
        <h1
          style={{ fontSize: 28, fontWeight: 700, margin: 0, color: "#0a0a1a" }}
        >
          Sajana Senanayake
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#0078d4",
            fontWeight: 500,
            margin: "4px 0",
          }}
        >
          Electrical & Information Engineering Undergraduate | Full-Stack
          Developer
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 12,
            color: "#666",
            flexWrap: "wrap",
            marginTop: 8,
          }}
        >
          <span>📍 Sri Lanka</span>
          <span>📧 sajana@example.com</span>
          <span>🐙 github.com/Sajana4197</span>
          <span>🔗 linkedin.com/in/sajana</span>
        </div>
      </div>

      {/* Summary */}
      <ResumeSection title="SUMMARY">
        <p style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>
          Engineering undergraduate specializing in telecommunications and
          software development. Experienced in React, Vite, Tailwind CSS,
          Supabase, and full-stack web application development. Interned at ZTE
          Lanka for 4G/5G network deployment. Passionate about premium UI/UX
          design and building scalable systems.
        </p>
      </ResumeSection>

      {/* Experience */}
      <ResumeSection title="EXPERIENCE">
        <ResumeJob
          company="ZTE Lanka"
          role="Network Engineer Intern"
          period="2024"
          location="Colombo, Sri Lanka"
          points={[
            "Assisted in 4G/5G NR site integration and commissioning",
            "Performed RF drive tests and optimization across Colombo region",
            "Worked with ZTE ZXMP transport equipment and BBU systems",
            "Prepared network audit and performance monitoring reports",
          ]}
        />
        <ResumeJob
          company="Freelance"
          role="Full-Stack Web Developer"
          period="2023 – Present"
          location="Remote"
          points={[
            "Designed and delivered 10+ production websites for SME clients",
            "Built React/Vite/Supabase full-stack systems including reservation & CRM apps",
            "Developed ClientFlow — an Electron + SQLite desktop CRM application",
            "Created reusable config-driven static templates for restaurants, salons, car services",
          ]}
        />
      </ResumeSection>

      {/* Education */}
      <ResumeSection title="EDUCATION">
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ fontSize: 13 }}>
              B.Sc. (Hons) Electrical & Information Engineering
            </strong>
            <span style={{ fontSize: 12, color: "#888" }}>2021 – Present</span>
          </div>
          <div style={{ fontSize: 13, color: "#0078d4" }}>
            University of Ruhuna — Faculty of Engineering
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ fontSize: 13 }}>
              Advanced Level — Physical Science
            </strong>
            <span style={{ fontSize: 12, color: "#888" }}>2018 – 2020</span>
          </div>
          <div style={{ fontSize: 13, color: "#0078d4" }}>
            D.S. Senanayake College
          </div>
        </div>
      </ResumeSection>

      {/* Skills */}
      <ResumeSection title="SKILLS">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px 24px",
          }}
        >
          {[
            "React, Vite, Tailwind CSS",
            "MATLAB, Python, Bash",
            "JavaScript, HTML, CSS",
            "Cisco, GNS3, SDN",
            "Node.js, Supabase, SQLite",
            "TCP/IP, 4G/5G, RF",
            "Figma, UI/UX Design",
            "Git, Linux, Electron",
          ].map((skill) => (
            <div
              key={skill}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#444",
              }}
            >
              <span style={{ color: "#0078d4", fontSize: 10 }}>▸</span> {skill}
            </div>
          ))}
        </div>
      </ResumeSection>

      {/* Projects */}
      <ResumeSection title="KEY PROJECTS">
        {[
          {
            name: "Windows 11 Portfolio",
            tech: "React, Framer Motion, Zustand",
            desc: "Fully interactive OS-style portfolio website",
          },
          {
            name: "Ember & Oak Restaurant",
            tech: "React, Supabase, Resend",
            desc: "Full-stack restaurant system with reservation wizard",
          },
          {
            name: "ClientFlow Desktop CRM",
            tech: "Electron, SQLite, React",
            desc: "Desktop CRM for freelance business management",
          },
          {
            name: "SDN Campus Network",
            tech: "Cisco, GNS3, OpenFlow, Python",
            desc: "Software-defined networking design for campus",
          },
        ].map((p) => (
          <div key={p.name} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ fontSize: 13 }}>{p.name}</strong>
              <span
                style={{ fontSize: 11, color: "#888", fontStyle: "italic" }}
              >
                {p.tech}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#555", margin: "2px 0 0" }}>
              {p.desc}
            </p>
          </div>
        ))}
      </ResumeSection>
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#0078d4",
          letterSpacing: "0.12em",
          borderBottom: "1.5px solid #0078d420",
          paddingBottom: 4,
          marginBottom: 10,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function ResumeJob({ company, role, period, location, points }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <strong style={{ fontSize: 13 }}>{company}</strong>
          <span style={{ fontSize: 13, color: "#555" }}> — {role}</span>
        </div>
        <span
          style={{
            fontSize: 11,
            color: "#888",
            whiteSpace: "nowrap",
            marginLeft: 12,
          }}
        >
          {period} · {location}
        </span>
      </div>
      <ul style={{ margin: "6px 0 0", paddingLeft: 16 }}>
        {points.map((p) => (
          <li key={p} style={{ fontSize: 12, color: "#444", marginBottom: 3 }}>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PDFAction({ icon, label, onClick, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 6,
        fontSize: 12,
        border: primary ? "none" : "1px solid rgba(255,255,255,0.12)",
        background: primary
          ? hov
            ? "#1a8fe3"
            : "#0078d4"
          : hov
            ? "rgba(255,255,255,0.10)"
            : "transparent",
        color: "#e8e8f0",
        cursor: "pointer",
        transition: "all 0.12s",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ToolBtn({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.10)" : "transparent",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 4,
        color: "#e8e8f0",
        cursor: "pointer",
        fontSize: 14,
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  );
}
