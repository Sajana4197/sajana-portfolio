import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesktopStore } from "../../store/desktopStore";

export default function WindowFrame({ win }) {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updateWindowPos,
    updateWindowSize,
    activeWindowId,
  } = useDesktopStore();

  const isActive = activeWindowId === win.id;
  const frameRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const [isSnapped, setIsSnapped] = useState(false);

  /* ── DRAG ── */
  function onTitleMouseDown(e) {
    if (e.button !== 0) return;
    if (win.maximized) return;
    e.preventDefault();
    focusWindow(win.id);

    const startX = e.clientX - win.x;
    const startY = e.clientY - win.y;

    function onMove(ev) {
      let nx = ev.clientX - startX;
      let ny = ev.clientY - startY;
      // clamp inside screen
      nx = Math.max(-win.width + 120, Math.min(nx, window.innerWidth - 120));
      ny = Math.max(0, Math.min(ny, window.innerHeight - 48));
      updateWindowPos(win.id, nx, ny);
      setIsSnapped(false);
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  /* ── RESIZE ── */
  function onResizeMouseDown(e, direction) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    focusWindow(win.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const origW = win.width;
    const origH = win.height;
    const origX = win.x;
    const origY = win.y;

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let nw = origW,
        nh = origH,
        nx = origX,
        ny = origY;

      if (direction.includes("e")) nw = Math.max(400, origW + dx);
      if (direction.includes("s")) nh = Math.max(300, origH + dy);
      if (direction.includes("w")) {
        nw = Math.max(400, origW - dx);
        nx = origX + (origW - nw);
      }
      if (direction.includes("n")) {
        nh = Math.max(300, origH - dy);
        ny = origY + (origH - nh);
      }

      updateWindowSize(win.id, nw, nh);
      updateWindowPos(win.id, nx, ny);
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  /* ── MAXIMIZE / SNAP ── */
  function handleMaximizeClick() {
    toggleMaximize(win.id);
    setIsSnapped(false);
  }

  /* double-click title = maximize */
  function onTitleDblClick() {
    toggleMaximize(win.id);
  }

  /* computed geometry */
  const style = win.maximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 48px)",
        borderRadius: 0,
      }
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  if (win.minimized) return null;

  const Component = win.component;

  return (
    <motion.div
      ref={frameRef}
      className="fixed flex flex-col overflow-hidden"
      style={{
        ...style,
        zIndex: win.zIndex,
        borderRadius: win.maximized ? 0 : 10,
        background: "rgba(16,16,26,0.94)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: isActive
          ? "1px solid rgba(0,120,212,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isActive
          ? "0 12px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,120,212,0.2)"
          : "0 8px 32px rgba(0,0,0,0.6)",
        transition: win.maximized
          ? "all 0.22s cubic-bezier(0.4,0,0.2,1)"
          : "box-shadow 0.15s, border 0.15s",
      }}
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 8 }}
      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* ── TITLE BAR ── */}
      <div
        className="flex items-center justify-between px-4 shrink-0"
        style={{
          height: 38,
          background: isActive
            ? "rgba(0,120,212,0.12)"
            : "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          cursor: win.maximized ? "default" : "move",
          userSelect: "none",
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={onTitleDblClick}
      >
        {/* Left — icon + title */}
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 15 }}>{win.icon}</span>
          <span
            style={{
              fontSize: 13,
              color: isActive ? "#e8e8f0" : "#8888aa",
              fontWeight: 500,
            }}
          >
            {win.title}
          </span>
        </div>

        {/* Right — window controls */}
        <div
          className="flex items-center"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Minimize */}
          <WinBtn
            onClick={() => minimizeWindow(win.id)}
            hoverBg="rgba(255,255,255,0.10)"
            title="Minimize"
          >
            <svg width="10" height="1" viewBox="0 0 10 1">
              <rect width="10" height="1" fill="currentColor" />
            </svg>
          </WinBtn>

          {/* Maximize / Restore */}
          <WinBtn
            onClick={handleMaximizeClick}
            hoverBg="rgba(255,255,255,0.10)"
            title={win.maximized ? "Restore" : "Maximize"}
          >
            {win.maximized ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect
                  x="2"
                  y="0"
                  width="8"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <rect
                  x="0"
                  y="2"
                  width="8"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  style={{ fill: "rgba(16,16,26,0.94)" }}
                />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect
                  x="0.6"
                  y="0.6"
                  width="8.8"
                  height="8.8"
                  rx="1.2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            )}
          </WinBtn>

          {/* Close */}
          <WinBtn
            onClick={() => closeWindow(win.id)}
            hoverBg="rgba(196,43,28,0.85)"
            title="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path
                d="M1 1l8 8M9 1l-8 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </WinBtn>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 overflow-hidden">{Component && <Component />}</div>

      {/* ── RESIZE HANDLES (hidden when maximized) ── */}
      {!win.maximized && (
        <>
          {/* edges */}
          <ResizeHandle
            dir="e"
            onMouseDown={onResizeMouseDown}
            style={{
              top: 8,
              right: -3,
              width: 6,
              bottom: 8,
              cursor: "ew-resize",
            }}
          />
          <ResizeHandle
            dir="s"
            onMouseDown={onResizeMouseDown}
            style={{
              bottom: -3,
              left: 8,
              right: 8,
              height: 6,
              cursor: "ns-resize",
            }}
          />
          <ResizeHandle
            dir="w"
            onMouseDown={onResizeMouseDown}
            style={{
              top: 8,
              left: -3,
              width: 6,
              bottom: 8,
              cursor: "ew-resize",
            }}
          />
          <ResizeHandle
            dir="n"
            onMouseDown={onResizeMouseDown}
            style={{
              top: -3,
              left: 8,
              right: 8,
              height: 6,
              cursor: "ns-resize",
            }}
          />
          {/* corners */}
          <ResizeHandle
            dir="se"
            onMouseDown={onResizeMouseDown}
            style={{
              bottom: -4,
              right: -4,
              width: 12,
              height: 12,
              cursor: "nwse-resize",
            }}
          />
          <ResizeHandle
            dir="sw"
            onMouseDown={onResizeMouseDown}
            style={{
              bottom: -4,
              left: -4,
              width: 12,
              height: 12,
              cursor: "nesw-resize",
            }}
          />
          <ResizeHandle
            dir="ne"
            onMouseDown={onResizeMouseDown}
            style={{
              top: -4,
              right: -4,
              width: 12,
              height: 12,
              cursor: "nesw-resize",
            }}
          />
          <ResizeHandle
            dir="nw"
            onMouseDown={onResizeMouseDown}
            style={{
              top: -4,
              left: -4,
              width: 12,
              height: 12,
              cursor: "nwse-resize",
            }}
          />
        </>
      )}
    </motion.div>
  );
}

/* ── helpers ── */

function WinBtn({ onClick, hoverBg, title, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 46,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hov ? hoverBg : "transparent",
        border: "none",
        cursor: "pointer",
        color: hov ? "#fff" : "#aaa",
        transition: "background 0.12s, color 0.12s",
        borderRadius: 0,
      }}
    >
      {children}
    </button>
  );
}

function ResizeHandle({ dir, onMouseDown, style }) {
  return (
    <div
      style={{ position: "absolute", zIndex: 20, ...style }}
      onMouseDown={(e) => onMouseDown(e, dir)}
    />
  );
}
