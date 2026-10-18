import Link from "next/link";
import type { Site } from "@/content/schema";
import { Container } from "@/components/Container/Container";
import { Monogram } from "@/components/Monogram/Monogram";
import { NavLinks } from "@/components/NavLinks/NavLinks";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./SiteHeader.module.css";

export function SiteHeader({ site }: { site: Site }) {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Monogram size={34} />
          <span className={styles.text}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.role}>{site.role}</span>
          </span>
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <NavLinks items={site.nav} />
        </nav>
        <div className={styles.theme}>
          <ThemeToggle label={site.themeToggleLabel} />
        </div>
      </Container>
    </header>
  );
}
