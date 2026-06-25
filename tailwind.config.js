/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        win: {
          bg: "#0a0a0f",
          surface: "#12121a",
          glass: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.10)",
          accent: "#0078d4",
          accentHov: "#1a8fe3",
          text: "#e8e8f0",
          muted: "#8888aa",
          taskbar: "rgba(10,10,18,0.85)",
          window: "rgba(18,18,28,0.92)",
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "system-ui", "sans-serif"],
        mono: ["'Cascadia Code'", "'Fira Code'", "monospace"],
      },
      backdropBlur: {
        win: "20px",
      },
      boxShadow: {
        window: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
        icon: "0 4px 16px rgba(0,120,212,0.3)",
        glow: "0 0 20px rgba(0,120,212,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease",
        "scale-in": "scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        "slide-up": "slideUp 0.3s ease",
        "boot-text": "bootText 1s ease forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        scaleIn: {
          from: { opacity: 0, transform: "scale(0.92)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        bootText: {
          from: { opacity: 0, letterSpacing: "0.5em" },
          to: { opacity: 1, letterSpacing: "0.05em" },
        },
      },
    },
  },
  plugins: [],
};
