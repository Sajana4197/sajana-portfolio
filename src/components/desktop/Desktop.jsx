import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";
import DesktopIcon from "./DesktopIcon";
import RightClickMenu from "./RightClickMenu";
import Taskbar from "../taskbar/Taskbar";
import WindowFrame from "../windows/WindowFrame";
import StartMenu from "../taskbar/StartMenu";

/* ── icon registry ── */
import AboutWindow from "../windows/AboutWindow";
import ProjectsWindow from "../windows/ProjectsWindow";
import SkillsWindow from "../windows/SkillsWindow";
import ExperienceWindow from "../windows/ExperienceWindow";
import EducationWindow from "../windows/EducationWindow";
import ResumeWindow from "../windows/ResumeWindow";
import ContactWindow from "../windows/ContactWindow";
import WhatsAppWindow from "../windows/WhatsAppWindow";
import EmailWindow from "../windows/EmailWindow";
import CertificatesWindow from "../windows/CertificatesWindow";

export const ICON_DEFS = [
  { id: "about", label: "About Me", icon: "👤", component: AboutWindow },
  { id: "projects", label: "Projects", icon: "📁", component: ProjectsWindow },
  { id: "skills", label: "Skills", icon: "⚙️", component: SkillsWindow },
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
    component: ExperienceWindow,
  },
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    component: EducationWindow,
  },
  { id: "resume", label: "Resume", icon: "📄", component: ResumeWindow },
  {
    id: "certificates",
    label: "Certificates",
    icon: "🏆",
    component: CertificatesWindow,
  },
  { id: "contact", label: "Contact", icon: "📬", component: ContactWindow },
  { id: "email", label: "Email", icon: "📧", component: EmailWindow },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", component: WhatsAppWindow },
  {
    id: "github",
    label: "GitHub",
    icon: "🐙",
    href: "https://github.com/Sajana4197",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "🔗",
    href: "https://linkedin.com/in/sajana-senanayake",
  },
  { id: "thispc", label: "This PC", icon: "🖥️", component: AboutWindow },
  { id: "recycle", label: "Recycle Bin", icon: "🗑️", component: null },
];

export default function Desktop() {
  const {
    windows,
    contextMenu,
    setContextMenu,
    closeContextMenu,
    openWindow,
    startMenuOpen,
    closeStartMenu,
  } = useDesktopStore();

  /* global click → close menus */
  useEffect(() => {
    function onDown(e) {
      closeContextMenu();
      if (startMenuOpen) closeStartMenu();
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [startMenuOpen]);

  function handleDesktopRightClick(e) {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, type: "desktop" });
  }

  function handleIconOpen(def) {
    if (def.href) {
      window.open(def.href, "_blank");
      return;
    }
    if (!def.component) return;
    openWindow(def.id, def.label, def.component, def.icon);
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden no-select"
      onContextMenu={handleDesktopRightClick}
      style={{
        background:
          "linear-gradient(135deg, #0d0d1a 0%, #071428 40%, #0d0a1f 100%)",
      }}
    >
      {/* ── Wallpaper ambient ── */}
      <WallpaperAmbient />

      {/* ── Desktop Icons ── */}
      <div
        className="absolute top-4 left-4 flex flex-col flex-wrap gap-1"
        style={{ maxHeight: "calc(100vh - 56px)", width: "auto" }}
      >
        {ICON_DEFS.map((def, i) => (
          <DesktopIcon
            key={def.id}
            def={def}
            index={i}
            onOpen={() => handleIconOpen(def)}
            onRightClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setContextMenu({ x: e.clientX, y: e.clientY, type: "icon", def });
            }}
          />
        ))}
      </div>

      {/* ── Open Windows ── */}
      <AnimatePresence>
        {windows.map((win) => (
          <WindowFrame key={win.id} win={win} />
        ))}
      </AnimatePresence>

      {/* ── Right-click Menu ── */}
      <AnimatePresence>
        {contextMenu && (
          <RightClickMenu
            menu={contextMenu}
            onOpen={handleIconOpen}
            onClose={closeContextMenu}
          />
        )}
      </AnimatePresence>

      {/* ── Start Menu ── */}
      <AnimatePresence>{startMenuOpen && <StartMenu />}</AnimatePresence>

      {/* ── Taskbar ── */}
      <Taskbar />
    </div>
  );
}

function WallpaperAmbient() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* large blue glow top-right */}
      <div
        className="absolute"
        style={{
          top: "-15%",
          right: "-10%",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(0,120,212,0.13) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      {/* purple glow bottom-left */}
      <div
        className="absolute"
        style={{
          bottom: "-20%",
          left: "-5%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(100,60,200,0.10) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      {/* subtle center star */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(0,80,160,0.07) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
