/**
 * The one place Lucide icons are imported, so content can name an icon without importing React.
 * Icons are always decorative here: the text next to each one carries the meaning.
 */
import {
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Bug,
  Building2,
  Calculator,
  CalendarClock,
  Cloud,
  CodeXml,
  Database,
  Download,
  FlaskConical,
  FolderGit2,
  Gauge,
  Landmark,
  Mail,
  MapPin,
  Moon,
  PanelsTopLeft,
  Pause,
  Play,
  Plug,
  Repeat,
  Router,
  ServerCog,
  ShieldCheck,
  Store,
  Sun,
  Terminal,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/schema";

const icons: Record<IconName, LucideIcon> = {
  landmark: Landmark,
  router: Router,
  bot: Bot,
  store: Store,
  calculator: Calculator,
  "map-pin": MapPin,
  "badge-check": BadgeCheck,
  "calendar-clock": CalendarClock,
  flask: FlaskConical,
  repeat: Repeat,
  bug: Bug,
  "server-cog": ServerCog,
  terminal: Terminal,
  workflow: Workflow,
  gauge: Gauge,
  "user-check": UserCheck,
  plug: Plug,
  building: Building2,
  users: Users,
  code: CodeXml,
  layout: PanelsTopLeft,
  database: Database,
  cloud: Cloud,
  shield: ShieldCheck,
};

type IconProps = { name: IconName; size?: number; className?: string };

export function Icon({ name, size = 20, className }: IconProps) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.75} className={className} aria-hidden="true" focusable="false" />;
}

/** Icons for links, chosen by where the link goes. */
export function LinkIcon({ href, size = 18, className }: { href: string; size?: number; className?: string }) {
  const Component = href.startsWith("mailto:")
    ? Mail
    : href.endsWith(".pdf")
      ? Download
      : href.includes("linkedin.com")
        ? BriefcaseBusiness
        : href.includes("github.com")
          ? FolderGit2
          : null;
  return Component ? (
    <Component size={size} strokeWidth={1.75} className={className} aria-hidden="true" focusable="false" />
  ) : null;
}

/** Pause and play glyphs for media-style toggles. */
export function PlaybackIcon({ playing, size = 16 }: { playing: boolean; size?: number }) {
  const Component = playing ? Pause : Play;
  return <Component size={size} strokeWidth={2} aria-hidden="true" focusable="false" />;
}

/** The theme switch's glyph: a moon to offer dark, a sun to offer light. */
export function ThemeIcon({ dark, size = 18 }: { dark: boolean; size?: number }) {
  const Component = dark ? Sun : Moon;
  return <Component size={size} strokeWidth={1.9} aria-hidden="true" focusable="false" />;
}
