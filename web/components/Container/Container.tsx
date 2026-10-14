import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  /** "prose" narrows to a comfortable reading measure. */
  width?: "page" | "prose";
  className?: string;
};

export function Container({ children, as: Tag = "div", width = "page", className }: ContainerProps) {
  const classes = [styles.container, width === "prose" ? styles.prose : undefined, className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
