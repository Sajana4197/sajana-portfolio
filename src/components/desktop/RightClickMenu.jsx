import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";

const DESKTOP_ITEMS = [
  { label: "View", icon: "👁️", dividerAfter: false },
  { label: "Sort by", icon: "↕️", dividerAfter: true },
  {
    label: "Refresh",
    icon: "🔄",
    dividerAfter: true,
    action: () => window.location.reload(),
  },
  { label: "New Folder", icon: "📁", dividerAfter: false },
  { label: "Display settings", icon: "🖥️", dividerAfter: true },
  { label: "Personalise", icon: "🎨", dividerAfter: false },
];

const ICON_ITEMS = (def, openWindow) => [
  {
    label: `Open "${def?.label}"`,
    icon: "↗️",
    action: () => openWindow && openWindow(def),
    dividerAfter: false,
  },
  { label: "Open in new window", icon: "🪟", dividerAfter: true },
  { label: "Copy", icon: "📋", dividerAfter: false },
  { label: "Create shortcut", icon: "🔗", dividerAfter: true },
  { label: "Properties", icon: "ℹ️", dividerAfter: false },
];

export default function RightClickMenu({ menu, onOpen, onClose }) {
  const { openWindow } = useDesktopStore();
  const ref = useRef(null);

  /* keep menu inside viewport */
  const menuW = 220,
    menuH = 280;
  const x = Math.min(menu.x, window.innerWidth - menuW - 8);
  const y = Math.min(menu.y, window.innerHeight - menuH - 8);

  const items =
    menu.type === "icon" ? ICON_ITEMS(menu.def, onOpen) : DESKTOP_ITEMS;

  function handleItem(item) {
    if (item.action) item.action();
    onClose();
  }

  return (
    <motion.div
      ref={ref}
      className="fixed z-[9999] py-1.5 rounded-xl overflow-hidden"
      style={{
        left: x,
        top: y,
        width: menuW,
        background: "rgba(28,28,42,0.95)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      initial={{ opacity: 0, scale: 0.93, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((item, i) => (
        <div key={i}>
          <div
            className="flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors duration-100"
            style={{ fontSize: 13, color: "#e8e8f0" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,120,212,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            onClick={() => handleItem(item)}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
          {item.dividerAfter && (
            <div
              className="my-1 mx-3"
              style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
