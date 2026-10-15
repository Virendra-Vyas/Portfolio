import type { Section } from "@/content/schema";
import styles from "./ProseSection.module.css";

type ProseSectionProps = {
  section: Section;
  headingLevel?: "h2" | "h3";
  /** "callout" frames the section, used for the honest status note. */
  tone?: "plain" | "callout";
};

export function ProseSection({ section, headingLevel: Heading = "h2", tone = "plain" }: ProseSectionProps) {
  return (
    <section className={[styles.section, tone === "callout" ? styles.callout : "", styles[Heading]].filter(Boolean).join(" ")}>
      <Heading className={styles.heading}>{section.heading}</Heading>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
      {section.points ? (
        <ul className={styles.points}>
          {section.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
