import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppIcon } from "../icons/AppIcons";
import AndroidWindow from "./AndroidWindow";

import AboutWindow from "../windows/AboutWindow";
import ProjectsWindow from "../windows/ProjectsWindow";
import SkillsWindow from "../windows/SkillsWindow";
import ExperienceWindow from "../windows/ExperienceWindow";
import EducationWindow from "../windows/EducationWindow";
import ResumeWindow from "../windows/ResumeWindow";
import CertificatesWindow from "../windows/CertificatesWindow";
import ContactWindow from "../windows/ContactWindow";

const ALL_APPS = [
  { id: "about", label: "About Me", icon: "about", component: AboutWindow },
  {
    id: "projects",
    label: "Projects",
    icon: "projects",
    component: ProjectsWindow,
  },
  { id: "skills", label: "Skills", icon: "skills", component: SkillsWindow },
  {
    id: "experience",
    label: "Experience",
    icon: "experience",
    component: ExperienceWindow,
  },
  {
    id: "education",
    label: "Education",
    icon: "education",
    component: EducationWindow,
  },
  { id: "resume", label: "Resume", icon: "resume", component: ResumeWindow },
  {
    id: "certificates",
    label: "Certificates",
    icon: "certificates",
    component: CertificatesWindow,
  },
  {
    id: "contact",
    label: "Contact",
    icon: "contact",
    component: ContactWindow,
  },
  { id: "email", label: "Email", icon: "email", href: "mailto:your@email.com" },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "whatsapp",
    href: "https://wa.me/94XXXXXXXXX",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "github",
    href: "https://github.com/Sajana4197",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://linkedin.com/in/sajana",
  },
];

const DOCK_APPS = [
  { id: "about", label: "About", icon: "about", component: AboutWindow },
  {
    id: "projects",
    label: "Projects",
    icon: "projects",
    component: ProjectsWindow,
  },
  {
    id: "contact",
    label: "Contact",
    icon: "contact",
    component: ContactWindow,
  },
  {
    id: "github",
    label: "GitHub",
    icon: "github",
    href: "https://github.com/Sajana4197",
  },
];

const WALLPAPER = "linear-gradient(160deg,#0d0d1f 0%,#071428 50%,#0d0a1f 100%)";

export default function MobileOS() {
  const [time, setTime] = useState(new Date());
  const [openApp, setOpenApp] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = time.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  /* apps per page on home screen (first 8) */
  const homeApps = ALL_APPS.slice(0, 8);
  const pages = [];
  for (let i = 0; i < homeApps.length; i += 8)
    pages.push(homeApps.slice(i, i + 8));

  function launchApp(app) {
    setDrawerOpen(false);
    if (app.href) {
      window.open(app.href, "_blank");
      return;
    }
    if (app.component) setOpenApp(app);
  }

  function handleDragEnd(e, info) {
    if (info.offset.x < -50 && page < pages.length - 1) setPage((p) => p + 1);
    if (info.offset.x > 50 && page > 0) setPage((p) => p - 1);
    if (info.offset.y < -60) setDrawerOpen(true);
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: WALLPAPER, fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Ambient ── */}
      <Ambient />

      {/* ── Status Bar ── */}
      <AndroidStatusBar
        time={timeStr}
        onNotif={() => setNotifOpen((n) => !n)}
      />

      {/* ── Notification Shade ── */}
      <AnimatePresence>
        {notifOpen && (
          <NotificationShade
            onClose={() => setNotifOpen(false)}
            time={timeStr}
            date={dateStr}
          />
        )}
      </AnimatePresence>

      {/* ── Home Screen ── */}
      <AnimatePresence>
        {!drawerOpen && (
          <motion.div
            className="absolute inset-0 flex flex-col"
            style={{ paddingTop: 28 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Clock widget */}
            <motion.div
              className="text-center px-6 py-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 200,
                  color: "#fff",
                  letterSpacing: -3,
                  lineHeight: 1,
                }}
              >
                {timeStr}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  marginTop: 6,
                  fontWeight: 300,
                }}
              >
                {dateStr}
              </div>
              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>
                  Available for hire
                </span>
              </motion.div>
            </motion.div>

            {/* App grid — NOT draggable, separate swipe up zone */}
            <div className="flex-1 overflow-hidden px-4">
              <div
                style={{
                  display: "flex",
                  width: `${pages.length * 100}%`,
                  transform: `translateX(-${page * (100 / pages.length)}%)`,
                  transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                  height: "100%",
                }}
              >
                {pages.map((pageApps, pi) => (
                  <div
                    key={pi}
                    style={{ width: `${100 / pages.length}%`, flexShrink: 0 }}
                  >
                    <div className="grid grid-cols-4 gap-x-2 gap-y-5 pt-2">
                      {pageApps.map((app, i) => (
                        <HomeIcon
                          key={app.id}
                          app={app}
                          index={i}
                          onLaunch={() => launchApp(app)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Page dots */}
            {pages.length > 1 && (
              <div className="flex justify-center gap-1.5 pb-2">
                {pages.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === page ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === page ? "#fff" : "rgba(255,255,255,0.3)",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Swipe up zone — dedicated touch area */}
            <motion.div
              className="flex flex-col items-center pb-2"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.3}
              onDragEnd={(e, info) => {
                if (info.offset.y < -30) setDrawerOpen(true);
              }}
              onClick={() => setDrawerOpen(true)}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ cursor: "grab", touchAction: "none" }}
            >
              <div
                style={{
                  width: 32,
                  height: 3,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.3)",
                  marginBottom: 4,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em",
                }}
              >
                SWIPE UP FOR ALL APPS
              </span>
            </motion.div>

            {/* Dock */}
            <AndroidDock apps={DOCK_APPS} onLaunch={launchApp} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── App Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <AppDrawer
            apps={ALL_APPS}
            onLaunch={launchApp}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Open App ── */}
      <AnimatePresence>
        {openApp && (
          <AndroidWindow app={openApp} onClose={() => setOpenApp(null)} />
        )}
      </AnimatePresence>

      {/* ── Navigation Bar ── */}
      <AndroidNavBar
        onHome={() => {
          setOpenApp(null);
          setDrawerOpen(false);
        }}
        onBack={() => {
          if (openApp) setOpenApp(null);
          else if (drawerOpen) setDrawerOpen(false);
        }}
        onRecents={() => {}}
      />
    </div>
  );
}

/* ══ Home Icon ══ */
function HomeIcon({ app, index, onLaunch }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="flex flex-col items-center gap-1.5"
      onClick={onLaunch}
    >
      <motion.div whileTap={{ scale: 0.82 }} style={{ cursor: "pointer" }}>
        <AppIcon id={app.icon} size={30} />
      </motion.div>
      <span
        style={{
          fontSize: 11,
          color: "#fff",
          textAlign: "center",
          textShadow: "0 1px 6px rgba(0,0,0,0.8)",
          lineHeight: 1.3,
          maxWidth: 68,
          wordBreak: "break-word",
        }}
      >
        {app.label}
      </span>
    </motion.div>
  );
}

/* ══ Dock ══ */
function AndroidDock({ apps, onLaunch }) {
  return (
    <div className="px-6 pb-16">
      <div
        className="flex items-center justify-around px-4 py-3 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {apps.map((app) => (
          <motion.div
            key={app.id}
            onClick={() => onLaunch(app)}
            whileTap={{ scale: 0.82 }}
            className="flex flex-col items-center gap-1"
            style={{ cursor: "pointer" }}
          >
            <AppIcon id={app.icon} size={26} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>
              {app.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══ App Drawer ══ */
function AppDrawer({ apps, onLaunch, onClose }) {
  const [search, setSearch] = useState("");
  const filtered = apps.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      style={{
        background: "rgba(10,10,20,0.96)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        paddingTop: 28,
      }}
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
    >
      {/* Handle */}
      <div className="flex justify-center pt-2 pb-4">
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.25)",
          }}
        />
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <circle
              cx="7.5"
              cy="7.5"
              r="5"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.4"
            />
            <path
              d="M11.5 11.5l3.5 3.5"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apps..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 15,
              fontFamily: "'Segoe UI', sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* All apps label */}
      <div className="px-6 mb-2">
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {search ? `${filtered.length} results` : "All Apps"}
        </span>
      </div>

      {/* App grid */}
      <div
        className="flex-1 overflow-y-auto px-4 pb-24"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="grid grid-cols-4 gap-x-2 gap-y-6 pt-2">
          {filtered.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.03,
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
              className="flex flex-col items-center gap-1.5"
              onClick={() => onLaunch(app)}
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                style={{ cursor: "pointer" }}
              >
                <AppIcon id={app.icon} size={28} />
              </motion.div>
              <span
                style={{
                  fontSize: 11,
                  color: "#fff",
                  textAlign: "center",
                  lineHeight: 1.3,
                  maxWidth: 68,
                  wordBreak: "break-word",
                }}
              >
                {app.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══ Status Bar ══ */
function AndroidStatusBar({ time, onNotif }) {
  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center justify-between px-5"
      style={{ height: 28, zIndex: 100 }}
      onClick={onNotif}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="white" />
          <rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="white" />
          <rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="white" />
          <rect x="10.5" y="0" width="2.5" height="11" rx="0.5" fill="white" />
        </svg>
        {/* WiFi */}
        <svg width="14" height="11" viewBox="0 0 16 12" fill="none">
          <path
            d="M1 4.5C4 1.5 12 1.5 15 4.5"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M3 7C5.5 4.5 10.5 4.5 13 7"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M5.5 9.5C6.5 8.5 9.5 8.5 10.5 9.5"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="8" cy="11.5" r="1" fill="white" />
        </svg>
        {/* Battery */}
        <svg width="20" height="11" viewBox="0 0 20 11" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="16"
            height="10"
            rx="2"
            stroke="white"
            strokeWidth="1"
          />
          <rect x="2" y="2" width="11" height="7" rx="1" fill="white" />
          <path
            d="M18 3.5v4"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ══ Notification Shade ══ */
function NotificationShade({ onClose, time, date }) {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,10,20,0.96)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        paddingTop: 36,
      }}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
    >
      {/* Time + date */}
      <div className="text-center py-4">
        <div
          style={{
            fontSize: 48,
            fontWeight: 200,
            color: "#fff",
            letterSpacing: -2,
          }}
        >
          {time}
        </div>
        <div
          style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}
        >
          {date}
        </div>
      </div>

      {/* Quick toggles */}
      <div
        className="grid grid-cols-4 gap-3 px-4 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        {[
          { icon: "📶", label: "Wi-Fi", on: true },
          { icon: "📡", label: "Mobile", on: true },
          { icon: "🔵", label: "Bluetooth", on: false },
          { icon: "✈️", label: "Aeroplane", on: false },
          { icon: "🔦", label: "Torch", on: false },
          { icon: "🔄", label: "Rotate", on: true },
          { icon: "🎵", label: "Sound", on: true },
          { icon: "🌙", label: "Dark", on: true },
        ].map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
              style={{
                background: t.on
                  ? "rgba(0,120,212,0.4)"
                  : "rgba(255,255,255,0.08)",
                border: `1px solid ${t.on ? "rgba(0,120,212,0.6)" : "rgba(255,255,255,0.12)"}`,
              }}
            >
              {t.icon}
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* Brightness slider */}
      <div className="px-6 pb-2">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 14 }}>🔅</span>
          <div
            className="flex-1 h-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <div
              style={{
                width: "70%",
                height: "100%",
                borderRadius: 4,
                background: "linear-gradient(90deg, #0078d4, #4b2fa0)",
              }}
            />
          </div>
          <span style={{ fontSize: 14 }}>🔆</span>
        </div>
      </div>

      {/* Notifications */}
      <div
        className="px-4 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Notifications
        </p>
        {[
          {
            app: "Portfolio",
            msg: "Someone viewed your resume! 👀",
            time: "now",
            icon: "resume",
          },
          {
            app: "GitHub",
            msg: "New star on your repository ⭐",
            time: "2m",
            icon: "github",
          },
          {
            app: "LinkedIn",
            msg: "You have a new connection request",
            time: "15m",
            icon: "linkedin",
          },
        ].map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-2.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <AppIcon id={n.icon} size={16} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f0" }}
                >
                  {n.app}
                </span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                  {n.time}
                </span>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  marginTop: 1,
                }}
              >
                {n.msg}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Close handle */}
      <div className="flex justify-center py-3" onClick={onClose}>
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ══ Navigation Bar ══ */
function AndroidNavBar({ onBack, onHome, onRecents }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-8 py-3"
      style={{
        height: 56,
        zIndex: 100,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Back */}
      <NavBtn onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M11 4L6 9l5 5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NavBtn>

      {/* Home */}
      <NavBtn onClick={onHome}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid white",
            background: "rgba(255,255,255,0.15)",
          }}
        />
      </NavBtn>

      {/* Recents */}
      <NavBtn onClick={onRecents}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 3,
            border: "2px solid white",
            background: "transparent",
          }}
        />
      </NavBtn>
    </div>
  );
}

function NavBtn({ children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.8 }}
      style={{
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        borderRadius: 12,
      }}
    >
      {children}
    </motion.button>
  );
}

function Ambient() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-20%",
          width: 350,
          height: 350,
          background:
            "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(100,60,200,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
