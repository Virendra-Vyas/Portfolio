import Link from "next/link";
import type { Site } from "@/content/schema";
import { Container } from "@/components/Container/Container";
import { NavLinks } from "@/components/NavLinks/NavLinks";
import styles from "./SiteHeader.module.css";

export function SiteHeader({ site }: { site: Site }) {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>{site.role}</span>
        </Link>
        <nav aria-label="Main">
          <NavLinks items={site.nav} />
        </nav>
      </Container>
    </header>
  );
}
