import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppIcon } from "../icons/AppIcons";

export default function DesktopIcon({ def, index, onOpen, onRightClick }) {
  const [selected, setSelected] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [tooltipBelow, setTooltipBelow] = useState(false);
  const [pos, setPos] = useState(null); // {x,y} when dragged
  const clickTimer = useRef(null);
  const hintTimer = useRef(null);
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
      // Double click
      clearTimeout(clickTimer.current);
      clickTimer.current = null;

      clearTimeout(hintTimer.current);
      setShowHint(false);

      onOpen();
      setSelected(false);
    } else {
      // Single click
      setSelected(true);
      setShowHint(false);

      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;

        // Decide whether the tooltip should appear above or below
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();

          // Show below if there's not enough room above
          setTooltipBelow(rect.top < 70);
        }

        // Show hint
        setShowHint(true);

        // Hide after 2 seconds
        hintTimer.current = setTimeout(() => {
          setShowHint(false);
        }, 2000);
      }, 300);
    }
  }

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(clickTimer.current);
      clearTimeout(hintTimer.current);
    };
  }, []);

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
      className="w-20 flex flex-col items-center gap-1 px-1 py-1.5 rounded-lg cursor-pointer relative"
      style={{
        ...style,
        background: selected ? "rgba(0,120,212,0.25)" : "transparent",
        border: selected
          ? "1px solid rgba(0,120,212,0.5)"
          : "1px solid transparent",
        transition: "background 0.12s, border 0.12s",
        zIndex: showHint ? 99999 : selected ? 100 : 1,
      }}
      initial={{ opacity: 0, scale: 0.7, y: -8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        zIndex: showHint ? 99999 : selected ? 100 : 1,
      }}
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
      {/* ── Double-click hint tooltip ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: tooltipBelow ? -4 : 4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipBelow ? -4 : 4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",

              top: tooltipBelow ? "calc(100% + 8px)" : "auto",
              bottom: tooltipBelow ? "auto" : "calc(100% + 8px)",

              background: "rgba(28,28,42,0.97)",
              border: "1px solid rgba(0,120,212,0.4)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 11,
              color: "#e8e8f0",
              whiteSpace: "nowrap",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,120,212,0.2)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <div className="flex items-center gap-1.5">
              <span>Double-click to open</span>
            </div>

            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                left: "10%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 8,
                height: 8,
                background: "rgba(28,28,42,0.97)",
                border: "1px solid rgba(0,120,212,0.4)",

                ...(tooltipBelow
                  ? {
                      top: -5,
                      borderBottom: "none",
                      borderRight: "none",
                    }
                  : {
                      bottom: -5,
                      borderTop: "none",
                      borderLeft: "none",
                    }),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon — unchanged */}
      <AppIcon id={def.icon} size={28} />

      {/* Label — unchanged */}
      <span
        className="text-center text-white leading-tight"
        style={{
          fontSize: 11,
          fontWeight: 400,
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          wordBreak: "break-word",
          maxWidth: 72,
        }}
      >
        {def.label}
      </span>
    </motion.div>
  );
}
