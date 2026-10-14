import type { ReactNode } from "react";
import { Container } from "@/components/Container/Container";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
  /** Optional short label above the title, e.g. a section name. */
  eyebrow?: string;
  intro?: ReactNode;
};

export function PageHeader({ title, eyebrow, intro }: PageHeaderProps) {
  return (
    <Container as="header" className={styles.header}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      {intro ? <div className={styles.intro}>{intro}</div> : null}
    </Container>
  );
}
