import Link from "next/link";
import type { CaseStudy } from "@/content/schema";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { TagList } from "@/components/TagList/TagList";
import styles from "./CaseStudyCard.module.css";

type CaseStudyCardProps = {
  study: CaseStudy;
  /** Heading level for the title, so the card fits the page outline. */
  headingLevel?: "h2" | "h3";
  /** How many technologies to show before truncating. */
  maxTags?: number;
};

export function CaseStudyCard({ study, headingLevel: Heading = "h3", maxTags = 6 }: CaseStudyCardProps) {
  const tags = study.tech.slice(0, maxTags);
  const hidden = study.tech.length - tags.length;

  return (
    <article className={styles.card}>
      <StatusBadge status={study.status} />
      <Heading className={styles.title}>
        <Link href={`/work/${study.slug}/`} className={styles.link}>
          {study.title}
        </Link>
      </Heading>
      <p className={styles.meta}>
        {study.role}. {study.context}.
      </p>
      <p className={styles.summary}>{study.summary}</p>
      <div className={styles.tags}>
        <TagList tags={hidden > 0 ? [...tags, `+${hidden} more`] : tags} label="Technologies" />
      </div>
    </article>
  );
}
