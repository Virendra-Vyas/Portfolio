import type { ElementType, ReactNode } from "react";
import styles from "./InkBand.module.css";

/** The dark "control room" band that opens every page, with a faint equipment-rack grid. */
export function InkBand({ children, as: Tag = "header" }: { children: ReactNode; as?: ElementType }) {
  return <Tag className={styles.band}>{children}</Tag>;
}
