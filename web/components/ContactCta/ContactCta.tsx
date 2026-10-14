import type { AnyLink, Profile, Site } from "@/content/schema";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import styles from "./ContactCta.module.css";

type ContactCtaProps = {
  profile: Profile;
  contact: Site["contact"];
  primaryAction: AnyLink;
};

export function ContactCta({ profile, contact, primaryAction }: ContactCtaProps) {
  return (
    <div className={styles.cta}>
      <div>
        <p className={styles.availability}>{profile.availability}</p>
        <ul className={styles.arrangements}>
          {profile.workingArrangements.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className={styles.routes}>
        <ButtonLink link={primaryAction} />
        <p className={styles.email}>{contact.email}</p>
        <ul className={styles.links}>
          {contact.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="me noopener">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
