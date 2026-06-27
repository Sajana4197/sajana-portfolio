import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INBOX = [
  {
    id: "e1",
    from: "You",
    to: "visitor@portfolio.com",
    subject: "👋 Welcome to My Portfolio",
    preview:
      "Thanks for visiting! Feel free to explore my projects and reach out...",
    body: `Hi there,\n\nWelcome to my portfolio! I'm Sajana Senanayake — an Electrical & Information Engineering undergraduate and full-stack developer from Sri Lanka.\n\nFeel free to explore my projects, skills, and experience. If you're interested in working together or just want to say hi, hit Reply or use the Contact window.\n\nLooking forward to connecting!\n\nBest,\nSajana`,
    time: "Now",
    read: false,
    tag: "welcome",
    starred: true,
  },
  {
    id: "e2",
    from: "Sajana",
    to: "recruiter@company.com",
    subject: "💼 Open to Opportunities",
    preview:
      "I am currently available for internships, full-time roles, and freelance projects...",
    body: `Hi,\n\nI'm currently open to:\n• Full-time software / network engineering roles\n• Internship opportunities\n• Freelance web development projects\n• Remote collaborations\n\nMy core stack: React, Vite, Tailwind CSS, Supabase, Node.js\nTelecom: 4G/5G, RF, Cisco, SDN\n\nFeel free to reach out via the Contact window or WhatsApp.\n\nBest regards,\nSajana Senanayake\nUniversity of Ruhuna`,
    time: "2h ago",
    read: true,
    tag: "hiring",
    starred: false,
  },
  {
    id: "e3",
    from: "Project Bot",
    to: "you@portfolio.com",
    subject: "🚀 Latest Project: Windows 11 Portfolio",
    preview:
      "New project completed — A fully interactive OS-style portfolio built with React...",
    body: `Project Update\n\n✅ Windows 11 Portfolio — COMPLETED\n\nStack: React + Vite + Framer Motion + Zustand + Tailwind CSS\n\nFeatures:\n• Full window management (drag, resize, minimize, maximize)\n• Boot screen + login screen\n• Desktop with icons and right-click menu\n• Taskbar with search and start menu\n• About, Projects, Skills, Experience, Education windows\n• Resume PDF viewer\n• Certificates viewer\n• Contact, Email, WhatsApp windows\n\nStatus: Production Ready 🎉`,
    time: "1d ago",
    read: true,
    tag: "project",
    starred: true,
  },
  {
    id: "e4",
    from: "ZTE Lanka",
    to: "sajana@portfolio.com",
    subject: "📡 Internship Completion — Network Engineering",
    preview:
      "Congratulations on completing your network engineering internship at ZTE Lanka...",
    body: `Dear Sajana,\n\nCongratulations on successfully completing your Network Engineering internship at ZTE Lanka.\n\nDuring your tenure you demonstrated excellent skills in:\n• 4G/5G NR site integration\n• RF drive testing and optimization\n• Transport network configuration\n• Network performance analysis\n\nWe wish you all the best in your engineering career.\n\nBest regards,\nZTE Lanka Team`,
    time: "2024",
    read: true,
    tag: "work",
    starred: true,
  },
];

const FOLDERS = [
  { id: "inbox", label: "Inbox", icon: "📥", count: 2 },
  { id: "starred", label: "Starred", icon: "⭐", count: 2 },
  { id: "sent", label: "Sent", icon: "📤", count: 0 },
  { id: "drafts", label: "Drafts", icon: "📝", count: 1 },
  { id: "archive", label: "Archive", icon: "📦", count: 0 },
];

export default function EmailWindow() {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(INBOX[0]);
  const [composing, setComposing] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [searchVal, setSearchVal] = useState("");

  const filtered = INBOX.filter((e) =>
    activeFolder === "starred" ? e.starred : true,
  ).filter((e) =>
    searchVal
      ? e.subject.toLowerCase().includes(searchVal.toLowerCase()) ||
        e.preview.toLowerCase().includes(searchVal.toLowerCase())
      : true,
  );

  return (
    <div
      className="flex flex-col h-full"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Outlook-style toolbar ── */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* New mail */}
        <motion.button
          onClick={() => setComposing(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 6,
            border: "none",
            background: "#0078d4",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
          whileHover={{ background: "#1a8fe3" }}
          whileTap={{ scale: 0.97 }}
        >
          <span>✏️</span> New Mail
        </motion.button>

        <div
          style={{ width: 1, height: 20, background: "rgba(255,255,255,0.10)" }}
        />

        {/* Toolbar actions */}
        {["Reply", "Forward", "Delete"].map((action) => (
          <ToolbarBtn key={action}>{action}</ToolbarBtn>
        ))}

        <div className="flex-1" />

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-md"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            width: 200,
          }}
        >
          <SearchSVG />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search mail..."
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

      {/* ── 3-pane layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Pane 1 — Folder tree */}
        <div
          className="flex flex-col py-3 gap-1 shrink-0"
          style={{
            width: 160,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
              }}
            >
              S
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f0" }}>
              Sajana
            </span>
          </div>

          <div className="mt-2 flex flex-col gap-0.5">
            {FOLDERS.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 12px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background:
                    activeFolder === folder.id
                      ? "rgba(0,120,212,0.22)"
                      : "transparent",
                  borderLeft:
                    activeFolder === folder.id
                      ? "2px solid #0078d4"
                      : "2px solid transparent",
                  color: activeFolder === folder.id ? "#e8e8f0" : "#aaa",
                  fontSize: 13,
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (activeFolder !== folder.id)
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (activeFolder !== folder.id)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 14 }}>{folder.icon}</span>
                  <span>{folder.label}</span>
                </div>
                {folder.count > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs"
                    style={{
                      background: "#0078d4",
                      color: "#fff",
                      fontSize: 10,
                    }}
                  >
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div
            className="mt-auto px-3 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p
              style={{
                fontSize: 10,
                color: "#8888aa",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Tags
            </p>
            {["welcome", "hiring", "project", "work"].map((tag) => (
              <div key={tag} className="flex items-center gap-2 py-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background:
                      tag === "hiring"
                        ? "#107c41"
                        : tag === "project"
                          ? "#0078d4"
                          : tag === "work"
                            ? "#c43e1c"
                            : "#8764b8",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: "#8888aa",
                    textTransform: "capitalize",
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pane 2 — Email list */}
        <div
          className="flex flex-col shrink-0 overflow-y-auto"
          style={{
            width: 260,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.10)",
          }}
        >
          <div
            className="px-3 py-2 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}>
              {FOLDERS.find((f) => f.id === activeFolder)?.label}
            </p>
            <p style={{ fontSize: 11, color: "#8888aa" }}>
              {filtered.length} messages
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <span style={{ fontSize: 32 }}>📭</span>
              <p style={{ fontSize: 13, color: "#8888aa" }}>No messages</p>
            </div>
          ) : (
            filtered.map((email) => {
              const isSel = selectedEmail?.id === email.id;
              return (
                <motion.div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 py-3 cursor-pointer"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: isSel ? "rgba(0,120,212,0.18)" : "transparent",
                    borderLeft: isSel
                      ? "3px solid #0078d4"
                      : "3px solid transparent",
                    transition: "all 0.12s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSel)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSel)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: email.read ? 400 : 700,
                        color: email.read ? "#aaa" : "#fff",
                      }}
                      className="truncate"
                    >
                      {email.from}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {email.starred && (
                        <span style={{ fontSize: 10 }}>⭐</span>
                      )}
                      <span
                        style={{
                          fontSize: 10,
                          color: "#8888aa",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {email.time}
                      </span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: email.read ? 400 : 600,
                      color: email.read ? "#aaa" : "#e8e8f0",
                      marginBottom: 3,
                    }}
                    className="truncate"
                  >
                    {email.subject}
                  </p>
                  <p
                    style={{ fontSize: 11, color: "#8888aa", lineHeight: 1.4 }}
                    className="truncate"
                  >
                    {email.preview}
                  </p>
                  {!email.read && (
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1"
                      style={{ background: "#0078d4" }}
                    />
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Pane 3 — Reading pane / Compose */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {composing ? (
              <motion.div
                key="compose"
                className="flex flex-col h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Compose header */}
                <div
                  className="flex items-center justify-between px-4 py-3 shrink-0"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}
                  >
                    New Message
                  </span>
                  <button
                    onClick={() => setComposing(false)}
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
                <div className="flex flex-col gap-0 flex-1 overflow-hidden">
                  {/* To */}
                  <ComposeField
                    label="To"
                    value={composeData.to}
                    onChange={(v) => setComposeData((d) => ({ ...d, to: v }))}
                  />
                  <ComposeField
                    label="Subject"
                    value={composeData.subject}
                    onChange={(v) =>
                      setComposeData((d) => ({ ...d, subject: v }))
                    }
                  />
                  {/* Body */}
                  <div className="flex-1 p-4">
                    <textarea
                      value={composeData.body}
                      onChange={(e) =>
                        setComposeData((d) => ({ ...d, body: e.target.value }))
                      }
                      placeholder="Write your message..."
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        color: "#e8e8f0",
                        fontSize: 13,
                        fontFamily: "'Segoe UI', sans-serif",
                        lineHeight: 1.7,
                      }}
                    />
                  </div>
                </div>
                {/* Send bar */}
                <div
                  className="flex items-center gap-3 px-4 py-3 shrink-0"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <motion.button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 18px",
                      borderRadius: 6,
                      border: "none",
                      background: "#0078d4",
                      color: "#fff",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                    whileHover={{ background: "#1a8fe3" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setComposing(false);
                      setComposeData({ to: "", subject: "", body: "" });
                    }}
                  >
                    📨 Send
                  </motion.button>
                  <ToolbarBtn>💾 Save Draft</ToolbarBtn>
                  <ToolbarBtn>📎 Attach</ToolbarBtn>
                  <div className="flex-1" />
                  <button
                    onClick={() => setComposing(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#8888aa",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Discard
                  </button>
                </div>
              </motion.div>
            ) : selectedEmail ? (
              <motion.div
                key={selectedEmail.id}
                className="flex flex-col h-full overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {/* Email header */}
                <div
                  className="px-6 py-4 shrink-0"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#fff",
                        lineHeight: 1.3,
                      }}
                    >
                      {selectedEmail.subject}
                    </h2>
                    {selectedEmail.starred && (
                      <span style={{ fontSize: 18 }}>⭐</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                      }}
                    >
                      {selectedEmail.from[0]}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#e8e8f0",
                        }}
                      >
                        {selectedEmail.from}
                      </p>
                      <p style={{ fontSize: 11, color: "#8888aa" }}>
                        To: {selectedEmail.to} · {selectedEmail.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email body */}
                <div className="px-6 py-5 flex-1">
                  <div
                    style={{
                      fontSize: 14,
                      color: "#ccc",
                      lineHeight: 1.9,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {selectedEmail.body}
                  </div>
                </div>

                {/* Reply bar */}
                <div
                  className="px-6 py-3 shrink-0"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => {
                        setComposeData({
                          to: selectedEmail.from,
                          subject: `Re: ${selectedEmail.subject}`,
                          body: "",
                        });
                        setComposing(true);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "7px 14px",
                        borderRadius: 6,
                        border: "none",
                        background: "#0078d4",
                        color: "#fff",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                      whileHover={{ background: "#1a8fe3" }}
                    >
                      ↩ Reply
                    </motion.button>
                    <ToolbarBtn>↪ Forward</ToolbarBtn>
                    <ToolbarBtn>🗑 Delete</ToolbarBtn>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <span style={{ fontSize: 48 }}>📭</span>
                <p style={{ color: "#8888aa", fontSize: 14 }}>
                  Select an email to read
                </p>
              </div>
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
          {INBOX.length} messages · {INBOX.filter((e) => !e.read).length} unread
        </span>
        <span>Outlook — Sajana Senanayake</span>
      </div>
    </div>
  );
}

function ToolbarBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "5px 10px",
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.10)",
        background: hov ? "rgba(255,255,255,0.10)" : "transparent",
        color: "#e8e8f0",
        fontSize: 12,
        cursor: "pointer",
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  );
}

function ComposeField({ label, value, onChange }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 shrink-0"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <span
        style={{ fontSize: 12, color: "#8888aa", width: 48, flexShrink: 0 }}
      >
        {label}:
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
