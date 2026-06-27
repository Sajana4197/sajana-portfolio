import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: "sajana",
    time: "10:00 AM",
    text: "👋 Hey! Welcome to my portfolio.",
  },
  {
    id: 2,
    from: "sajana",
    time: "10:00 AM",
    text: "I'm Sajana — an Engineering undergrad & full-stack developer from Sri Lanka 🇱🇰",
  },
  {
    id: 3,
    from: "sajana",
    time: "10:01 AM",
    text: "Feel free to explore my projects and skills. If you'd like to work together or just chat, send me a message! 🚀",
  },
];

const AUTO_REPLIES = [
  "Thanks for reaching out! I'll get back to you soon 😊",
  "That sounds interesting! Let me know more about your project.",
  "Great to hear from you! I'm currently available for new opportunities.",
  "Sure, I'd love to collaborate! Drop me an email at sajana@example.com",
  "Thanks! Feel free to check out my GitHub for more projects 🐙",
];

const QUICK_MSGS = [
  "👋 Hi Sajana!",
  "💼 I have a project for you",
  "🤝 Let's collaborate",
  "📄 Can I see your resume?",
];

export default function WhatsAppWindow() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const newMsg = {
      id: Date.now(),
      from: "visitor",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: msg,
    };
    setMessages((m) => [...m, newMsg]);

    // Auto reply
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        const reply = {
          id: Date.now() + 1,
          from: "sajana",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        };
        setMessages((m) => [...m, reply]);
      },
      1500 + Math.random() * 1000,
    );
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ color: "#e8e8f0", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Left panel — chats list ── */}
      <div
        className="flex flex-col shrink-0"
        style={{
          width: 240,
          borderRight: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(10,10,18,0.6)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #25d366, #128c7e)",
              }}
            >
              S
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f0" }}>
              WhatsApp
            </span>
          </div>
          <div className="flex items-center gap-2">
            <WAIconBtn title="New chat">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 3v12M3 9h12"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </WAIconBtn>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2 shrink-0">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.08)" }}
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
            <input
              placeholder="Search or start chat"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e8e8f0",
                fontSize: 12,
                width: "100%",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {/* Active chat */}
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer"
            style={{
              background: "rgba(0,120,212,0.15)",
              borderLeft: "3px solid #25d366",
            }}
          >
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                }}
              >
                SS
              </div>
              {online && (
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                  style={{ background: "#25d366", borderColor: "#0a0a12" }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}
                >
                  Sajana Senanayake
                </span>
                <span style={{ fontSize: 10, color: "#8888aa" }}>
                  {messages[messages.length - 1]?.time}
                </span>
              </div>
              <p
                style={{ fontSize: 11, color: "#8888aa" }}
                className="truncate"
              >
                {messages[messages.length - 1]?.text}
              </p>
            </div>
          </div>

          {/* Empty state other chats */}
          <div className="flex flex-col items-center justify-center py-12 gap-2 px-4">
            <span style={{ fontSize: 32 }}>💬</span>
            <p style={{ fontSize: 12, color: "#8888aa", textAlign: "center" }}>
              No other chats yet. Start a conversation!
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel — chat window ── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div className="relative shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
              style={{
                background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                fontSize: 14,
              }}
            >
              SS
            </div>
            {online && (
              <div
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: "#25d366", borderColor: "#0a0a12" }}
              />
            )}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}>
              Sajana Senanayake
            </p>
            <p style={{ fontSize: 11, color: "#25d366" }}>
              {typing ? "typing..." : online ? "online" : "last seen recently"}
            </p>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <WAIconBtn title="Video call">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <rect
                  x="1"
                  y="4"
                  width="11"
                  height="10"
                  rx="2"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.3"
                />
                <path
                  d="M12 7l5-3v10l-5-3V7z"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </WAIconBtn>
            <WAIconBtn title="Voice call">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 4a1 1 0 011-1h2.5l1 3-1.5 1.5a10 10 0 004.5 4.5L12 10.5l3 1V14a1 1 0 01-1 1A13 13 0 013 4z"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </WAIconBtn>
          </div>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2"
          style={{
            background: "rgba(0,0,0,0.15)",
            backgroundImage:
              "radial-gradient(rgba(0,120,212,0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Date badge */}
          <div className="flex justify-center">
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{ background: "rgba(255,255,255,0.08)", color: "#8888aa" }}
            >
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
              className={`flex ${msg.from === "visitor" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "sajana" && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-auto shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                  }}
                >
                  S
                </div>
              )}
              <div className="max-w-[70%]">
                <div
                  className="px-3 py-2 rounded-2xl"
                  style={{
                    background:
                      msg.from === "visitor"
                        ? "rgba(0,120,212,0.35)"
                        : "rgba(255,255,255,0.10)",
                    borderRadius:
                      msg.from === "visitor"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                  }}
                >
                  <p
                    style={{ fontSize: 13, color: "#e8e8f0", lineHeight: 1.5 }}
                  >
                    {msg.text}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 10,
                    color: "#8888aa",
                    marginTop: 3,
                    textAlign: msg.from === "visitor" ? "right" : "left",
                  }}
                >
                  {msg.time}
                  {msg.from === "visitor" && (
                    <span style={{ marginLeft: 4, color: "#25d366" }}>✓✓</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div
                className="flex items-end gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                  }}
                >
                  S
                </div>
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-1"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    borderRadius: "18px 18px 18px 4px",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#8888aa",
                      }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        delay: i * 0.15,
                        repeat: Infinity,
                        duration: 0.6,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Quick message chips */}
        <div
          className="flex items-center gap-2 px-4 py-2 overflow-x-auto shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {QUICK_MSGS.map((msg) => (
            <button
              key={msg}
              onClick={() => sendMessage(msg)}
              style={{
                padding: "4px 12px",
                borderRadius: 16,
                fontSize: 12,
                border: "1px solid rgba(37,211,102,0.3)",
                background: "rgba(37,211,102,0.08)",
                color: "#e8e8f0",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.12s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(37,211,102,0.18)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(37,211,102,0.08)")
              }
            >
              {msg}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <WAIconBtn title="Emoji">😊</WAIconBtn>
          <WAIconBtn title="Attach">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M16 9l-7 7a5 5 0 01-7-7l7-7a3 3 0 014 4L6 14a1 1 0 01-2-1l7-7"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </WAIconBtn>

          <div
            className="flex-1 flex items-center px-3 py-2 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message"
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

          <motion.button
            onClick={() => sendMessage()}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "none",
              background: input.trim() ? "#25d366" : "rgba(255,255,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 9l14-7-7 14V9H2z"
                fill={input.trim() ? "white" : "rgba(255,255,255,0.4)"}
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function WAIconBtn({ children, title }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.10)" : "transparent",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 16,
        flexShrink: 0,
        transition: "background 0.12s",
      }}
    >
      {children}
    </button>
  );
}
