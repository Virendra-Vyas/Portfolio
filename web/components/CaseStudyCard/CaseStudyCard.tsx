import Link from "next/link";
import type { CaseStudy } from "@/content/schema";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { TagList } from "@/components/TagList/TagList";
import { Icon } from "@/lib/icons";
import { caseStudyKind } from "@/lib/trace";
import styles from "./CaseStudyCard.module.css";

type CaseStudyCardProps = {
  study: CaseStudy;
  /** Heading level for the title, so the row fits the page outline. */
  headingLevel?: "h2" | "h3";
  /** How many technologies to show before truncating. */
  maxTags?: number;
};

/**
 * One row in the index of systems: what it is, status, name, summary and stack. The whole row is the
 * link, and it takes the colour of the kind of engagement, as on the career trace.
 */
export function CaseStudyCard({ study, headingLevel: Heading = "h3", maxTags = 5 }: CaseStudyCardProps) {
  const tags = study.tech.slice(0, maxTags);
  const hidden = study.tech.length - tags.length;

  return (
    <article className={`${styles.row} kind-${caseStudyKind(study.slug)}`}>
      <div className={styles.lead}>
        <span className={styles.icon}>
          <Icon name={study.icon} size={24} />
        </span>
        <div className={styles.name}>
          <StatusBadge status={study.status} />
          <Heading className={styles.title}>
            <Link href={`/work/${study.slug}/`} className={styles.link}>
              {study.title}
            </Link>
          </Heading>
          <p className={styles.meta}>
            {study.role}. {study.context}.
          </p>
        </div>
      </div>
      <p className={styles.summary}>{study.summary}</p>
      <div className={styles.tags}>
        <TagList tags={hidden > 0 ? [...tags, `+${hidden} more`] : tags} label="Technologies" />
      </div>
    </article>
  );
}
