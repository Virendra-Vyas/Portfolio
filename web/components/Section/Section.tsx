import type { ReactNode } from "react";
import type { SectionCopy } from "@/content/schema";
import { Container } from "@/components/Container/Container";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  copy: SectionCopy;
  children: ReactNode;
  tone?: "plain" | "tinted" | "dark";
};

/** A page section with a heading, optional intro and optional "see more" link, labelled for assistive tech. */
export function Section({ id, copy, children, tone = "plain" }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={tone === "plain" ? styles.section : `${styles.section} ${styles[tone]}`}>
      <Container>
        <div className={styles.head}>
          <h2 id={headingId} className={styles.heading}>
            {copy.heading}
          </h2>
          {copy.link ? (
            <SmartLink href={copy.link.href} className={styles.more}>
              {copy.link.label}
            </SmartLink>
          ) : null}
        </div>
        {copy.intro ? <p className={styles.intro}>{copy.intro}</p> : null}
        <div className={styles.body}>{children}</div>
      </Container>
    </section>
  );
}
