import { useDesktopStore } from "./store/desktopStore";
import BootScreen from "./components/boot/BootScreen";
import Desktop from "./components/desktop/Desktop";

export default function App() {
  const phase = useDesktopStore((s) => s.phase);

  return (
    <div className="w-full h-full overflow-hidden">
      {phase !== "desktop" && <BootScreen />}
      {phase === "desktop" && <Desktop />}
    </div>
  );
}
