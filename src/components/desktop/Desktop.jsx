import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";
import DesktopIcon from "./DesktopIcon";
import RightClickMenu from "./RightClickMenu";
import Taskbar from "../taskbar/Taskbar";
import WindowFrame from "../windows/WindowFrame";
import StartMenu from "../taskbar/StartMenu";
import { AppIcon } from "../icons/AppIcons";

/* ── icon registry ── */
import AboutWindow from "../windows/AboutWindow";
import ProjectsWindow from "../windows/ProjectsWindow";
import SkillsWindow from "../windows/SkillsWindow";
import ExperienceWindow from "../windows/ExperienceWindow";
import EducationWindow from "../windows/EducationWindow";
import ResumeWindow from "../windows/ResumeWindow";
import ContactWindow from "../windows/ContactWindow";
import CertificatesWindow from "../windows/CertificatesWindow";

export const ICON_DEFS = [
  { id: "thispc", label: "This PC", icon: "thispc", component: AboutWindow },
  { id: "recycle", label: "Recycle Bin", icon: "recycle", component: null },
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
  {
    id: "email",
    label: "Email",
    icon: "email",
    href: "mailto:sjnsenanayake@gmail.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "whatsapp",
    href: "https://wa.me/94766671613?text=Hi%20Sajana!",
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
    href: "https://linkedin.com/in/sajana-senanayake",
  },
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
        backgroundImage: "url(/wallpaper.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "rgba(0,0,0,0)" }}
    />
  );
}
