import { useDesktopStore } from "./store/desktopStore";
import BootScreen from "./components/boot/BootScreen";
import Desktop from "./components/desktop/Desktop";
import MobileOS from "./components/mobile/MobileOS";
import { useWindowSize } from "./hooks/useWindowSize";

export default function App() {
  const phase = useDesktopStore((s) => s.phase);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div className="w-full h-full overflow-hidden">
      {phase !== "desktop" && <BootScreen />}
      {phase === "desktop" && (isMobile ? <MobileOS /> : <Desktop />)}
    </div>
  );
}
