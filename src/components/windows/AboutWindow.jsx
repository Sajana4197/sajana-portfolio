export default function AboutWindow() {
  return (
    <div
      style={{
        padding: 32,
        color: "#e8e8f0",
        height: "100%",
        overflow: "auto",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
        Sajana Senanayake
      </h1>
      <p style={{ color: "#8888aa" }}>
        Electrical & Information Engineering Undergraduate
      </p>
      <p style={{ marginTop: 16, color: "#aaa", lineHeight: 1.7 }}>
        Window system is working! Drag the title bar, resize from edges/corners,
        minimize, maximize, and close. Phase 5 brings the Taskbar.
      </p>
    </div>
  );
}
