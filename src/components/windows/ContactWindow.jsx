import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavBtn,
  AddressBar,
  TabBar,
  StatusBar,
  SectionHeader,
} from "./_shared.jsx";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "sajana@example.com",
    icon: "📧",
    color: "#0078d4",
    href: "mailto:sajana@example.com",
  },
  {
    label: "WhatsApp",
    value: "+94 XX XXX XXXX",
    icon: "💬",
    color: "#25d366",
    href: "https://wa.me/94XXXXXXXXX",
  },
  {
    label: "GitHub",
    value: "github.com/Sajana4197",
    icon: "🐙",
    color: "#8888aa",
    href: "https://github.com/Sajana4197",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sajana",
    icon: "🔗",
    color: "#0077b5",
    href: "https://linkedin.com/in/sajana",
  },
  {
    label: "Location",
    value: "Sri Lanka 🇱🇰",
    icon: "📍",
    color: "#c43e1c",
    href: null,
  },
];

export default function ContactWindow() {
  const [activeTab, setActiveTab] = useState("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  function handleChange(e) {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1800);
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
        <AddressBar crumbs={["This PC", "Portfolio", "Contact"]} />
      </div>

      <TabBar
        tabs={["Contact", "Message", "Map"]}
        active={activeTab}
        onChange={setActiveTab}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="flex flex-col py-4 gap-2 shrink-0"
          style={{
            width: 200,
            borderRight: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          {/* Avatar */}
          <div
            className="flex flex-col items-center gap-3 px-4 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
                boxShadow: "0 4px 20px rgba(0,120,212,0.4)",
              }}
            >
              SS
            </div>
            <div className="text-center">
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                Sajana Senanayake
              </p>
              <div className="flex items-center gap-1.5 justify-center mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span style={{ fontSize: 11, color: "#4ade80" }}>
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="px-3 flex flex-col gap-1">
            {CONTACT_LINKS.map((link) => (
              <button
                key={link.label}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => link.href && window.open(link.href, "_blank")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 10px",
                  border: "none",
                  borderRadius: 8,
                  cursor: link.href ? "pointer" : "default",
                  textAlign: "left",
                  background:
                    hoveredLink === link.label && link.href
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  transition: "background 0.12s",
                }}
              >
                <span style={{ fontSize: 16 }}>{link.icon}</span>
                <div className="min-w-0">
                  <div
                    style={{
                      fontSize: 10,
                      color: "#8888aa",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {link.label}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "#e8e8f0" }}
                    className="truncate"
                  >
                    {link.value}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="p-6 h-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "Contact" && (
                <div className="max-w-lg">
                  <SectionHeader icon="📬" title="Get In Touch" />

                  {/* Contact cards */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {CONTACT_LINKS.filter((l) => l.href).map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center gap-3 p-4 rounded-xl no-underline"
                        style={{
                          background: link.color + "10",
                          border: `1px solid ${link.color}33`,
                          transition: "all 0.18s",
                          textDecoration: "none",
                        }}
                        whileHover={{
                          scale: 1.03,
                          background: link.color + "20",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{
                            background: link.color + "22",
                            border: `1.5px solid ${link.color}44`,
                          }}
                        >
                          {link.icon}
                        </div>
                        <div className="min-w-0">
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#fff",
                            }}
                          >
                            {link.label}
                          </p>
                          <p
                            style={{ fontSize: 11, color: "#8888aa" }}
                            className="truncate"
                          >
                            {link.value}
                          </p>
                        </div>
                        <span
                          style={{
                            marginLeft: "auto",
                            color: "#8888aa",
                            fontSize: 12,
                          }}
                        >
                          ↗
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Response time */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{
                      background: "rgba(0,120,212,0.08)",
                      border: "1px solid rgba(0,120,212,0.20)",
                    }}
                  >
                    <span style={{ fontSize: 24 }}>⚡</span>
                    <div>
                      <p
                        style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                      >
                        Fast Response
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#aaa",
                          lineHeight: 1.6,
                          marginTop: 2,
                        }}
                      >
                        I typically respond within 24 hours. For urgent matters,
                        WhatsApp is the fastest way to reach me.
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === "Message" && (
                <div className="max-w-lg">
                  <SectionHeader icon="✉️" title="Send a Message" />

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 gap-4"
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                          style={{
                            background: "rgba(16,124,65,0.2)",
                            border: "2px solid #107c4166",
                          }}
                        >
                          ✅
                        </div>
                        <p
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#fff",
                          }}
                        >
                          Message Sent!
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#8888aa",
                            textAlign: "center",
                          }}
                        >
                          Thanks for reaching out. I'll get back to you soon.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <FormField
                            label="Your Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                          />
                          <FormField
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            type="email"
                          />
                        </div>
                        <FormField
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Project inquiry / Collaboration / Hire"
                        />
                        <div>
                          <label
                            style={{
                              fontSize: 12,
                              color: "#8888aa",
                              display: "block",
                              marginBottom: 6,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project, idea, or opportunity..."
                            rows={5}
                            style={{
                              width: "100%",
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 8,
                              padding: "10px 12px",
                              color: "#e8e8f0",
                              fontSize: 13,
                              fontFamily: "'Segoe UI', sans-serif",
                              resize: "vertical",
                              outline: "none",
                              transition: "border 0.15s",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor =
                                "rgba(0,120,212,0.6)")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor =
                                "rgba(255,255,255,0.12)")
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <p style={{ fontSize: 12, color: "#8888aa" }}>
                            * All fields except subject are required
                          </p>
                          <motion.button
                            onClick={handleSubmit}
                            disabled={sending}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "9px 20px",
                              borderRadius: 8,
                              border: "none",
                              background: sending
                                ? "rgba(0,120,212,0.5)"
                                : "#0078d4",
                              color: "#fff",
                              fontSize: 13,
                              fontWeight: 500,
                              cursor: sending ? "default" : "pointer",
                              transition: "all 0.15s",
                            }}
                            whileHover={!sending ? { scale: 1.03 } : {}}
                            whileTap={!sending ? { scale: 0.97 } : {}}
                          >
                            {sending ? (
                              <>
                                <SpinnerIcon />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <span>📨</span>
                                <span>Send Message</span>
                              </>
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {activeTab === "Map" && (
                <div className="max-w-lg">
                  <SectionHeader icon="📍" title="Location" />
                  <div
                    className="rounded-2xl overflow-hidden mb-4"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                      height: 280,
                    }}
                  >
                    <iframe
                      title="Sri Lanka Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4046715.2883896897!2d78.4!3d7.8731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        filter: "invert(90%) hue-rotate(180deg)",
                      }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ fontSize: 24 }}>📍</span>
                    <div>
                      <p
                        style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}
                      >
                        Sri Lanka 🇱🇰
                      </p>
                      <p style={{ fontSize: 12, color: "#8888aa" }}>
                        Open to remote work worldwide &amp; local opportunities
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <StatusBar left="5 contact methods" right="Contact — Sajana Senanayake" />
    </div>
  );
}

/* ── Helpers ── */
function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          fontSize: 12,
          color: "#8888aa",
          display: "block",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${focused ? "rgba(0,120,212,0.6)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 8,
          padding: "9px 12px",
          color: "#e8e8f0",
          fontSize: 13,
          fontFamily: "'Segoe UI', sans-serif",
          outline: "none",
          transition: "border 0.15s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ animation: "spin 1s linear infinite" }}
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      <path
        d="M7 2a5 5 0 015 5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
