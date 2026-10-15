import type { ContactPage, Site } from "@/content/schema";
import styles from "./ContactRoutes.module.css";

type ContactRoutesProps = {
  contact: Site["contact"];
  copy: Pick<ContactPage, "emailLabel">;
};

export function ContactRoutes({ contact, copy }: ContactRoutesProps) {
  return (
    <dl className={styles.list}>
      <div className={styles.row}>
        <dt className={styles.term}>{copy.emailLabel}</dt>
        <dd className={styles.detail}>
          <a href={`mailto:${contact.email}`} className={styles.email}>
            {contact.email}
          </a>
        </dd>
      </div>
      {contact.links.map((link) => (
        <div key={link.href} className={styles.row}>
          <dt className={styles.term}>{link.label}</dt>
          <dd className={styles.detail}>
            <a href={link.href} rel="me noopener">
              {link.href.replace(/^https:\/\/(www\.)?/, "")}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
