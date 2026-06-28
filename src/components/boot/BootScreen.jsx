import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";
import { useWindowSize } from "../../hooks/useWindowSize";

const BOOT_STEPS = [
  { id: "logo", duration: 2200 },
  { id: "login", duration: 0 },
];

export default function BootScreen() {
  const setPhase = useDesktopStore((s) => s.setPhase);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [step, setStep] = useState("logo"); // 'logo' | 'login'
  const [dotCount, setDots] = useState(0);
  const [unlocking, setUnlock] = useState(false);
  const [time, setTime] = useState(new Date());

  /* Spinning dots on logo screen */
  useEffect(() => {
    if (step !== "logo") return;
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 420);
    const go = setTimeout(() => setStep("login"), BOOT_STEPS[0].duration);
    return () => {
      clearInterval(t);
      clearTimeout(go);
    };
  }, [step]);

  /* Clock on login screen */
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  function handleUnlock() {
    if (unlocking) return;
    setUnlock(true);
    setTimeout(() => setPhase("desktop"), 900);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleUnlock();
  }

  const timeStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = time.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatePresence mode="wait">
      {/* ── LOGO / BOOT SCREEN ── */}
      {step === "logo" && (
        <motion.div
          key="logo"
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            background: isMobile
              ? "linear-gradient(160deg, #0a1628 0%, #0d1f0d 50%, #0a1628 100%)"
              : "#0a0a0f",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: isMobile ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.7)",
            }}
          />

          <div className="relative flex flex-col items-center">
            {isMobile ? <AndroidLogo /> : <WindowsLogo />}

            {/* Brand text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 24,
                fontSize: isMobile ? 15 : 13,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {isMobile ? "Android" : "Windows 11"}
            </motion.p>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-2 mt-10"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ opacity: dotCount === i ? 1 : 0.18 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── LOGIN SCREEN ── */}
      {step === "login" && !unlocking && (
        <motion.div
          key="login"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: isMobile
              ? "url(/wallpaper-mobile.jpg)"
              : "url(/wallpaper-login.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleUnlock}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          {/* Clock */}
          <motion.div
            className="text-center mb-12 select-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="text-8xl font-thin text-white tracking-tight leading-none mb-3"
              style={{
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: 100,
              }}
            >
              {timeStr}
            </div>
            <div className="text-xl text-white/60 font-light tracking-wide">
              {dateStr}
            </div>
          </motion.div>

          {/* Avatar + name */}
          <motion.div
            className="flex flex-col items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20 shadow-2xl">
              <img
                src="/avatar.png"
                alt="Sajana"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="text-center">
              <div className="text-white text-xl font-medium">
                Sajana Senanayake
              </div>
              <div className="text-white/50 text-sm mt-0.5">Local Account</div>
            </div>
          </motion.div>

          {/* PIN / click to unlock */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer transition-all duration-200 select-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
              onClick={handleUnlock}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="3"
                  y="7"
                  width="10"
                  height="8"
                  rx="1.5"
                  stroke="white"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 7V5a3 3 0 016 0v2"
                  stroke="white"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-white/70 text-sm">Click to sign in</span>
            </div>
            <p className="text-white/30 text-xs tracking-wider">
              Press <span className="text-white/50">Enter</span> or click
              anywhere
            </p>
          </motion.div>

          {/* Bottom system icons */}
          <motion.div
            className="absolute bottom-6 right-6 flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[<NetworkIcon />, <BatteryIcon />, <AccessibilityIcon />].map(
              (icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded flex items-center justify-center transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)")
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  {icon}
                </button>
              ),
            )}
          </motion.div>

          {/* Power icon */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              className="w-9 h-9 rounded flex items-center justify-center transition-colors duration-150"
              style={{ background: "rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
              onClick={(e) => e.stopPropagation()}
            >
              <PowerIcon />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ── UNLOCK TRANSITION ── */}
      {unlocking && (
        <motion.div
          key="unlocking"
          className="fixed inset-0 bg-[#0a0a0f]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  );
}

/* ── SVG ICONS ── */

function NetworkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M1 13.5C3.5 11 6.1 9.8 9 9.8s5.5 1.2 8 3.7"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M3.5 11C5.3 9.4 7 8.6 9 8.6s3.7.8 5.5 2.4"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 8.5C7 7.8 8 7.4 9 7.4s2 .4 3 1.1"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="9" cy="15" r="1.2" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect
        x="1.5"
        y="5.5"
        width="13"
        height="7"
        rx="1.5"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      <rect
        x="3"
        y="7"
        width="8"
        height="4"
        rx="0.5"
        fill="white"
        fillOpacity="0.6"
      />
      <path
        d="M15.5 7.5v3"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle
        cx="9"
        cy="9"
        r="7.5"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      <circle cx="9" cy="6" r="1.2" fill="white" fillOpacity="0.6" />
      <path
        d="M6 9h6M9 9v4"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 3v5"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M5.5 5.5A6 6 0 1012.5 5.5"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Windows Logo (existing, keep as is) ── */
function WindowsLogo() {
  return (
    <svg width="72" height="72" viewBox="0 0 88 88" fill="none">
      <rect
        x="4"
        y="4"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="47"
        y="4"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="4"
        y="47"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="47"
        y="47"
        width="37"
        height="37"
        rx="3"
        fill="white"
        fillOpacity="0.95"
      />
    </svg>
  );
}

/* ── Android Logo ── */
function AndroidLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center"
    >
      {/* Android robot SVG */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {/* Antenna left */}
        <line
          x1="26"
          y1="18"
          x2="18"
          y2="8"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="17" cy="7" r="3" fill="white" />
        {/* Antenna right */}
        <line
          x1="54"
          y1="18"
          x2="62"
          y2="8"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="63" cy="7" r="3" fill="white" />
        {/* Head */}
        <path
          d="M18 24 Q18 18 24 18 H56 Q62 18 62 24 V38 Q62 44 56 44 H24 Q18 44 18 38 Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Eyes */}
        <circle cx="30" cy="31" r="3.5" fill="#0a1628" />
        <circle cx="50" cy="31" r="3.5" fill="#0a1628" />
        {/* Body */}
        <path
          d="M14 48 Q14 44 18 44 H62 Q66 44 66 48 V66 Q66 72 60 72 H20 Q14 72 14 66 Z"
          fill="white"
          fillOpacity="0.90"
        />
        {/* Left arm */}
        <path
          d="M14 46 Q8 46 8 52 V62 Q8 68 14 68"
          stroke="white"
          strokeOpacity="0.90"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right arm */}
        <path
          d="M66 46 Q72 46 72 52 V62 Q72 68 66 68"
          stroke="white"
          strokeOpacity="0.90"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left leg */}
        <path
          d="M28 72 V78 Q28 82 24 82 Q20 82 20 78 V72"
          fill="white"
          fillOpacity="0.85"
        />
        {/* Right leg */}
        <path
          d="M52 72 V78 Q52 82 56 82 Q60 82 60 78 V72"
          fill="white"
          fillOpacity="0.85"
        />
        {/* Body buttons */}
        <circle cx="40" cy="54" r="2" fill="rgba(0,0,0,0.2)" />
        <circle cx="40" cy="62" r="2" fill="rgba(0,0,0,0.2)" />
      </svg>

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(61,220,132,0.25) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
      />
    </motion.div>
  );
}
