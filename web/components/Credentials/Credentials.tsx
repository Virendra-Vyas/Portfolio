import type { AboutPage, Profile } from "@/content/schema";
import styles from "./Credentials.module.css";

type CredentialsProps = {
  profile: Pick<Profile, "education" | "certifications" | "languages">;
  copy: Pick<AboutPage, "educationHeading" | "certificationsHeading" | "languagesHeading">;
};

export function Credentials({ profile, copy }: CredentialsProps) {
  return (
    <div className={styles.grid}>
      <section className={styles.column}>
        <h3 className={styles.heading}>{copy.educationHeading}</h3>
        <ul className={styles.list}>
          {profile.education.map((item) => (
            <li key={item.title}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.detail}>
                {item.institution}, {item.period}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.column}>
        <h3 className={styles.heading}>{copy.certificationsHeading}</h3>
        <ul className={styles.list}>
          {profile.certifications.map((item) => (
            <li key={item.title}>
              <span className={styles.title}>{item.title}</span>
              {item.note ? <span className={styles.detail}>{item.note}</span> : null}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.column}>
        <h3 className={styles.heading}>{copy.languagesHeading}</h3>
        <p className={styles.title}>{profile.languages.join(", ")}</p>
      </section>
    </div>
  );
}
