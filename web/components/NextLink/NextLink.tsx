import Link from "next/link";
import type { CaseStudy } from "@/content/schema";
import { Container } from "@/components/Container/Container";
import styles from "./NextLink.module.css";

export function NextLink({ study, label }: { study: CaseStudy; label: string }) {
  return (
    <Container as="nav" aria-label={label} className={styles.nav}>
      <Link href={`/work/${study.slug}/`} className={styles.link}>
        <span className={styles.label}>{label}</span>
        <span className={styles.title}>
          {study.title} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </Container>
  );
}
