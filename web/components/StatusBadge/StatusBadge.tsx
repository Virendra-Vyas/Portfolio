import type { Status } from "@/content/schema";
import styles from "./StatusBadge.module.css";

export function StatusBadge({ status, tone = "plain" }: { status: Status; tone?: "plain" | "ink" }) {
  const classes = [styles.badge, styles[status.tone], tone === "ink" ? styles.ink : ""].filter(Boolean).join(" ");
  return <span className={classes}>{status.label}</span>;
}
