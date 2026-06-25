import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";

const BOOT_STEPS = [
  { id: "logo", duration: 2200 },
  { id: "login", duration: 0 },
];

export default function BootScreen() {
  const setPhase = useDesktopStore((s) => s.setPhase);
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
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Windows logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-10"
          >
            <WindowsLogo />
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2"
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
        </motion.div>
      )}

      {/* ── LOGIN SCREEN ── */}
      {step === "login" && !unlocking && (
        <motion.div
          key="login"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              "linear-gradient(135deg, #0d0d1a 0%, #0a1628 50%, #0d0d1a 100%)",
          }}
          onClick={handleUnlock}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          {/* Ambient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,120,212,0.12) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(100,60,200,0.10) 0%, transparent 70%)",
              }}
            />
          </div>

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
            <div
              className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #0078d4, #4b2fa0)",
              }}
            >
              {/* Replace with <img src="/avatar.jpg" className="w-full h-full object-cover" /> */}
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white">
                SS
              </div>
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
