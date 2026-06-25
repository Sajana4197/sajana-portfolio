import { create } from "zustand";

export const useDesktopStore = create((set, get) => ({
  /* ── Boot ── */
  phase: "boot",
  setPhase: (phase) => set({ phase }),

  /* ── Windows ── */
  windows: [],
  activeWindowId: null,

  openWindow: (id, title, component, icon) => {
    const { windows } = get();
    const exists = windows.find((w) => w.id === id);

    if (exists) {
      const maxZ = Math.max(...windows.map((w) => w.zIndex), 99);
      set({
        windows: windows.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: maxZ + 1 } : w,
        ),
        activeWindowId: id,
      });
      return;
    }

    const maxZ = windows.length
      ? Math.max(...windows.map((w) => w.zIndex))
      : 99;
    const offset = (windows.length % 8) * 28;

    set({
      windows: [
        ...windows,
        {
          id,
          title,
          component,
          icon,
          x: 100 + offset,
          y: 60 + offset,
          width: 860,
          height: 560,
          minimized: false,
          maximized: false,
          zIndex: maxZ + 1,
        },
      ],
      activeWindowId: id,
    });
  },

  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      activeWindowId:
        s.activeWindowId === id
          ? (s.windows.filter((w) => w.id !== id).slice(-1)[0]?.id ?? null)
          : s.activeWindowId,
    })),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w,
      ),
      activeWindowId:
        s.activeWindowId === id
          ? (s.windows.filter((w) => w.id !== id && !w.minimized).slice(-1)[0]
              ?.id ?? null)
          : s.activeWindowId,
    })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w,
      ),
    })),

  focusWindow: (id) =>
    set((s) => {
      const maxZ = Math.max(...s.windows.map((w) => w.zIndex), 99);
      return {
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1 } : w,
        ),
        activeWindowId: id,
      };
    }),

  updateWindowPos: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),

  updateWindowSize: (id, width, height) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w,
      ),
    })),

  /* ── Start Menu ── */
  startMenuOpen: false,
  toggleStartMenu: () => set((s) => ({ startMenuOpen: !s.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),

  /* ── Right-click menu ── */
  contextMenu: null,
  setContextMenu: (menu) => set({ contextMenu: menu }),
  closeContextMenu: () => set({ contextMenu: null }),
}));
