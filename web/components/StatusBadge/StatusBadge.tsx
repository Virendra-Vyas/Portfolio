import type { Status } from "@/content/schema";
import styles from "./StatusBadge.module.css";

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`${styles.badge} ${styles[status.tone]}`}>{status.label}</span>;
}
