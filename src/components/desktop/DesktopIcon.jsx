import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AppIcon } from "../icons/AppIcons";

export default function DesktopIcon({ def, index, onOpen, onRightClick }) {
  const [selected, setSelected] = useState(false);
  const [pos, setPos] = useState(null); // {x,y} when dragged
  const clickTimer = useRef(null);
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });
  const containerRef = useRef(null);

  /* double-click detection */
  function handleClick(e) {
    if (dragRef.current.dragging) return;
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onOpen();
      setSelected(false);
    } else {
      setSelected(true);
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
      }, 300);
    }
  }

  /* deselect on outside click */
  useEffect(() => {
    function handler(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSelected(false);
      }
    }
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  /* drag */
  function handleMouseDown(e) {
    if (e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = pos?.x ?? 0;
    const origY = pos?.y ?? 0;
    let moved = false;
    dragRef.current = { dragging: false, startX, startY, origX, origY };

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      moved = true;
      dragRef.current.dragging = true;
      setPos({ x: origX + dx, y: origY + dy });
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setTimeout(() => {
        dragRef.current.dragging = false;
      }, 50);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  const style = pos
    ? {
        position: "relative",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex: 50,
      }
    : {};

  return (
    <motion.div
      ref={containerRef}
      className="w-20 flex flex-col items-center gap-1 px-1 py-1.5 rounded-lg cursor-pointer"
      style={{
        ...style,
        background: selected ? "rgba(0,120,212,0.25)" : "transparent",
        border: selected
          ? "1px solid rgba(0,120,212,0.5)"
          : "1px solid transparent",
        transition: "background 0.12s, border 0.12s",
      }}
      initial={{ opacity: 0, scale: 0.7, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.25,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      onClick={handleClick}
      onContextMenu={onRightClick}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Icon */}
      <AppIcon id={def.icon} size={28} />

      {/* Label */}
      <span
        className="text-center text-white leading-tight"
        style={{
          fontSize: 11,
          fontWeight: 400,
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          background: selected ? "transparent" : "transparent",
          wordBreak: "break-word",
          maxWidth: 72,
        }}
      >
        {def.label}
      </span>
    </motion.div>
  );
}
