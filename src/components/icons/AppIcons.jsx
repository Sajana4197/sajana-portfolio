import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFolder,
  faGear,
  faBriefcase,
  faGraduationCap,
  faFileAlt,
  faTrophy,
  faEnvelope,
  faAddressBook,
  faDesktop,
  faTrash,
  faMagnifyingGlass,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const ICON_MAP = {
  vscode: {
    icon: faCode,
    bg: "linear-gradient(135deg,#007ACC,#005a9e)",
    shadow: "#007ACC44",
  },
  about: {
    icon: faUser,
    bg: "linear-gradient(135deg,#0078d4,#4b2fa0)",
    shadow: "#0078d444",
  },
  projects: {
    icon: faFolder,
    bg: "linear-gradient(135deg,#e3a21a,#c47a00)",
    shadow: "#e3a21a44",
  },
  skills: {
    icon: faGear,
    bg: "linear-gradient(135deg,#0078d4,#005a9e)",
    shadow: "#0078d444",
  },
  experience: {
    icon: faBriefcase,
    bg: "linear-gradient(135deg,#107c41,#0a5c30)",
    shadow: "#107c4144",
  },
  education: {
    icon: faGraduationCap,
    bg: "linear-gradient(135deg,#8764b8,#5c3d99)",
    shadow: "#8764b844",
  },
  resume: {
    icon: faFileAlt,
    bg: "linear-gradient(135deg,#c43e1c,#9e2f12)",
    shadow: "#c43e1c44",
  },
  certificates: {
    icon: faTrophy,
    bg: "linear-gradient(135deg,#e3a21a,#b87d00)",
    shadow: "#e3a21a44",
  },
  contact: {
    icon: faAddressBook,
    bg: "linear-gradient(135deg,#0078d4,#005a9e)",
    shadow: "#0078d444",
  },
  email: {
    icon: faEnvelope,
    bg: "linear-gradient(135deg,#0078d4,#1a5fa8)",
    shadow: "#0078d444",
  },
  whatsapp: {
    icon: faWhatsapp,
    bg: "linear-gradient(135deg,#25d366,#128c7e)",
    shadow: "#25d36644",
  },
  github: {
    icon: faGithub,
    bg: "linear-gradient(135deg,#333,#555)",
    shadow: "#33333344",
  },
  linkedin: {
    icon: faLinkedin,
    bg: "linear-gradient(135deg,#0077b5,#005885)",
    shadow: "#0077b544",
  },
  thispc: {
    icon: faDesktop,
    bg: "linear-gradient(135deg,#0078d4,#4b2fa0)",
    shadow: "#0078d444",
  },
  recycle: {
    icon: faTrash,
    bg: "linear-gradient(135deg,#555,#333)",
    shadow: "#55555544",
  },
  search: { icon: faMagnifyingGlass, bg: "transparent", shadow: "none" },
  figma: {
    icon: faFigma,
    bg: "linear-gradient(135deg,#f24e1e,#a259ff)",
    shadow: "#f24e1e44",
  },
};

export function AppIcon({ id, size = 32, rounded = true }) {
  const def = ICON_MAP[id];
  if (!def) return <span style={{ fontSize: size * 0.7 }}>📁</span>;

  const boxSize = size * 1.5;

  return (
    <div
      style={{
        width: boxSize,
        height: boxSize,
        background: def.bg,
        borderRadius: rounded ? boxSize * 0.28 : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: def.shadow !== "none" ? `0 4px 16px ${def.shadow}` : "none",
        flexShrink: 0,
      }}
    >
      <FontAwesomeIcon
        icon={def.icon}
        style={{ color: "#fff", fontSize: size * 0.55 }}
      />
    </div>
  );
}

/* Taskbar icon — smaller, no bg box */
export function TaskbarIcon({ id, size = 20 }) {
  const def = ICON_MAP[id];
  if (!def) return null;
  return (
    <div
      style={{
        width: size * 1.6,
        height: size * 1.6,
        background: def.bg,
        borderRadius: size * 0.3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <FontAwesomeIcon
        icon={def.icon}
        style={{ color: "#fff", fontSize: size * 0.55 }}
      />
    </div>
  );
}

export { ICON_MAP };
