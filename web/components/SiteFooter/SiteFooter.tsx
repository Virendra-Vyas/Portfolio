import type { Site } from "@/content/schema";
import { Container } from "@/components/Container/Container";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ site }: { site: Site }) {
  const { contact, footer } = site;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
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
