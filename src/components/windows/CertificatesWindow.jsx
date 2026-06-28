import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ActionBtn,
} from "./_shared.jsx";
import { useDesktopStore } from "../../store/desktopStore";
import CertViewerWindow from "./CertViewerWindow";

const CERTS = [
  {
    id: "c1",
    title: "CCNA: Introduction to Networks",
    file: "/certificates/ccna.pdf",
    issuer: "Cisco Networking Academy",
    date: "2026",
    category: "Networking",
    color: "#0078d4",
    icon: "🌐",
    desc: "Successfully completed Cisco CCNA: Introduction to Networks covering networking fundamentals, IP addressing, Ethernet technologies, switching, routing fundamentals, and network services.",
    skills: [
      "TCP/IP",
      "IPv4 & IPv6",
      "Switching",
      "Routing",
      "Cisco IOS",
      "Ethernet",
    ],
  },
  {
    id: "c2",
    title: "Introduction to Cybersecurity",
    file: "/certificates/introduction-to-cybersecurity.pdf",
    issuer: "Cisco Networking Academy",
    date: "2026",
    category: "Cybersecurity",
    color: "#107c41",
    icon: "🛡️",
    desc: "Completed Cisco's Introduction to Cybersecurity course covering cyber threats, vulnerabilities, attacks, digital protection, and security fundamentals.",
    skills: [
      "Cybersecurity",
      "Threat Analysis",
      "Network Security",
      "Risk Management",
      "Security Fundamentals",
    ],
  },
  {
    id: "c3",
    title: "Fortinet Certified Fundamentals in Cybersecurity",
    file: "/certificates/fortinet-certified-fundamentals.pdf",
    issuer: "Fortinet",
    date: "2026",
    category: "Cybersecurity",
    color: "#c43e1c",
    icon: "🔐",
    desc: "Successfully earned the Fortinet Certified Fundamentals certification demonstrating knowledge of secure networking and cybersecurity concepts.",
    skills: [
      "Fortinet",
      "Cybersecurity",
      "Secure Networking",
      "Threat Protection",
      "Firewalls",
    ],
  },
  {
    id: "c4",
    title: "CCNA: Switching, Routing & Wireless Essentials",
    // file: "/certificates/ccna-srwe.pdf",
    issuer: "Cisco Networking Academy",
    date: "In Progress",
    category: "Networking",
    color: "#8764b8",
    icon: "📚",
    desc: "Currently studying enterprise switching, routing, VLAN implementation, wireless networking, redundancy, and network security concepts.",
    skills: [
      "Switching",
      "Routing",
      "VLAN",
      "STP",
      "Wireless LAN",
      "Network Security",
    ],
  },
  {
    id: "c5",
    title: "AWS Certified Solutions Architect – Associate",
    // file: "/certificates/aws-solutions-architect.pdf",
    issuer: "Amazon Web Services",
    date: "In Progress",
    category: "Cloud",
    color: "#e3a21a",
    icon: "☁️",
    desc: "Currently preparing for the AWS Certified Solutions Architect – Associate certification with focus on cloud architecture, networking, storage, security, and compute services.",
    skills: ["AWS", "EC2", "VPC", "IAM", "S3", "Cloud Architecture"],
  },
];

const CAT_COLORS = {
  Telecom: "#c43e1c",
  "Web Dev": "#0078d4",
  Networking: "#107c41",
  Backend: "#107c41",
  Design: "#8764b8",
  Engineering: "#e3a21a",
};

export default function CertificatesWindow() {
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", ...new Set(CERTS.map((c) => c.category))];
  const filtered =
    filterCat === "All" ? CERTS : CERTS.filter((c) => c.category === filterCat);

  const { openWindow } = useDesktopStore();

  function openCert(cert) {
    openWindow(
      `cert-${cert.id}`,
      cert.title,
      () => <CertViewerWindow file={cert.file} title={cert.title} />,
      "🏆",
    );
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <NavBtn>‹</NavBtn>
        <NavBtn>›</NavBtn>
        <AddressBar crumbs={["This PC", "Portfolio", "Certificates"]} />
        <div className="flex items-center gap-1 ml-2">
          <ViewToggle mode="grid" active={viewMode} setMode={setViewMode} />
          <ViewToggle mode="list" active={viewMode} setMode={setViewMode} />
        </div>
      </div>

      {/* Category filter pills */}
      <div
        className="flex items-center gap-2 px-4 py-2 shrink-0 overflow-x-auto"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilterCat(cat);
              setSelected(null);
            }}
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              background:
                filterCat === cat ? "#0078d4" : "rgba(255,255,255,0.07)",
              color: filterCat === cat ? "#fff" : "#8888aa",
            }}
          >
            {cat}
          </button>
        ))}
        <span
          style={{
            fontSize: 12,
            color: "#8888aa",
            marginLeft: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {filtered.length} certificate{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="flex flex-col py-3 shrink-0 overflow-y-auto"
          style={{
            width: 180,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <SidebarLabel>Quick Access</SidebarLabel>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCat(cat);
                setSelected(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                background:
                  filterCat === cat ? "rgba(0,120,212,0.20)" : "transparent",
                borderLeft:
                  filterCat === cat
                    ? "2px solid #0078d4"
                    : "2px solid transparent",
                color: filterCat === cat ? "#e8e8f0" : "#aaa",
                fontSize: 12,
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) => {
                if (filterCat !== cat)
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (filterCat !== cat)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{cat}</span>
              <span style={{ fontSize: 10, color: "#8888aa" }}>
                {cat === "All"
                  ? CERTS.length
                  : CERTS.filter((c) => c.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Content + detail */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filterCat}-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {viewMode === "grid" ? (
                  <CertGrid
                    certs={filtered}
                    selected={selected}
                    onSelect={setSelected}
                    onOpen={openCert}
                  />
                ) : (
                  <CertList
                    certs={filtered}
                    selected={selected}
                    onSelect={setSelected}
                    onOpen={openCert}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(0,0,0,0.2)",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <CertDetail cert={selected} onClose={() => setSelected(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <StatusBar
        left={`${filtered.length} certificates`}
        right="Certificates — Sajana Senanayake"
      />
    </div>
  );
}

function CertGrid({ certs, selected, onSelect, onOpen }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
    >
      {certs.map((cert, i) => (
        <CertGridCard
          key={cert.id}
          cert={cert}
          index={i}
          isSel={selected?.id === cert.id}
          onSelect={onSelect}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

function CertGridCard({ cert, index, isSel, onSelect, onOpen }) {
  const clickTimer = useRef(null);

  function handleClick() {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onOpen(cert);
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        onSelect(isSel ? null : cert);
      }, 280);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={handleClick}
      className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer"
      style={{
        background: isSel ? cert.color + "18" : "rgba(255,255,255,0.04)",
        border: `1.5px solid ${isSel ? cert.color + "55" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.18s",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{
            background: `radial-gradient(circle, ${cert.color}33, ${cert.color}11)`,
            border: `2px solid ${cert.color}55`,
            boxShadow: isSel ? `0 0 20px ${cert.color}44` : "none",
          }}
        >
          {cert.icon}
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
          style={{
            background: "#107c41",
            border: "1.5px solid rgba(0,0,0,0.5)",
          }}
        >
          ✓
        </div>
      </div>
      <div className="text-center">
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#e8e8f0",
            lineHeight: 1.4,
          }}
        >
          {cert.title}
        </p>
        <p style={{ fontSize: 10, color: "#8888aa", marginTop: 3 }}>
          {cert.issuer}
        </p>
        <span
          className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs"
          style={{ background: cert.color + "22", color: cert.color }}
        >
          {cert.date}
        </span>
      </div>
      <p style={{ fontSize: 9, color: "#555", marginTop: 2 }}>
        double-click to view
      </p>
    </motion.div>
  );
}

function CertList({ certs, selected, onSelect, onOpen }) {
  return (
    <div className="space-y-2">
      {certs.map((cert, i) => (
        <CertListRow
          key={cert.id}
          cert={cert}
          index={i}
          isSel={selected?.id === cert.id}
          onSelect={onSelect}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

function CertListRow({ cert, index, isSel, onSelect, onOpen }) {
  const clickTimer = useRef(null);

  function handleClick() {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onOpen(cert);
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        onSelect(isSel ? null : cert);
      }, 280);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleClick}
      className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer"
      style={{
        background: isSel ? cert.color + "15" : "rgba(255,255,255,0.04)",
        border: `1px solid ${isSel ? cert.color + "44" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.12s",
      }}
      onMouseEnter={(e) => {
        if (!isSel) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
      }}
      onMouseLeave={(e) => {
        if (!isSel) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{
          background: cert.color + "22",
          border: `1px solid ${cert.color}44`,
        }}
      >
        {cert.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}>
          {cert.title}
        </p>
        <p style={{ fontSize: 11, color: "#8888aa" }}>{cert.issuer}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className="px-2 py-0.5 rounded text-xs"
          style={{ background: cert.color + "22", color: cert.color }}
        >
          {cert.category}
        </span>
        <span style={{ fontSize: 11, color: "#8888aa" }}>{cert.date}</span>
      </div>
    </motion.div>
  );
}

function CertDetail({ cert, onClose }) {
  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: 250 }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span style={{ fontSize: 13, color: "#8888aa", fontWeight: 600 }}>
          Certificate
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#8888aa",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ×
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{
                background: `radial-gradient(circle, ${cert.color}33, ${cert.color}11)`,
                border: `2px solid ${cert.color}55`,
                boxShadow: `0 0 24px ${cert.color}33`,
              }}
            >
              {cert.icon}
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-sm"
              style={{
                background: "#107c41",
                border: "2px solid rgba(0,0,0,0.5)",
              }}
            >
              ✓
            </div>
          </div>
          <div className="text-center">
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.4,
              }}
            >
              {cert.title}
            </p>
            <p style={{ fontSize: 11, color: "#8888aa", marginTop: 2 }}>
              {cert.issuer}
            </p>
          </div>
        </div>

        <Divider />
        <DetailSection label="Description">
          <p style={{ fontSize: 12, color: "#bbb", lineHeight: 1.7 }}>
            {cert.desc}
          </p>
        </DetailSection>
        <Divider />
        <DetailSection label="Skills">
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: cert.color + "22",
                  color: cert.color,
                  border: `1px solid ${cert.color}33`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </DetailSection>
        <Divider />
        <div className="space-y-2">
          <MetaRow label="Category" value={cert.category} />
          <MetaRow label="Issued" value={cert.date} />
          <MetaRow label="Status" value="Verified ✓" />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <ActionBtn
            icon="👁️"
            label="View Certificate"
            onClick={() => window.open(cert.file, "_blank")}
            color="#0078d4"
          />
        </div>
      </div>
    </div>
  );
}
