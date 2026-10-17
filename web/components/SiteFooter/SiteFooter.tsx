import type { Site } from "@/content/schema";
import Link from "next/link";
import { Container } from "@/components/Container/Container";
import { Monogram } from "@/components/Monogram/Monogram";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ site }: { site: Site }) {
  const { contact, footer } = site;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <Monogram size={40} />
        <ul className={styles.links} aria-label="Contact links">
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          {contact.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="me noopener">
                {link.label}
              </a>
            </li>
          ))}
          {footer.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <p className={styles.company}>
          {footer.company}
          {footer.companyNumber ? `, company number ${footer.companyNumber}` : null}.
        </p>
        <p className={styles.note}>{footer.privacyNote}</p>
      </Container>
    </footer>
  );
}
