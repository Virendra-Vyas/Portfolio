import Link from "next/link";
import type { CaseStudy, WorkPage } from "@/content/schema";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Container } from "@/components/Container/Container";
import { InkBand } from "@/components/InkBand/InkBand";
import { FactList } from "@/components/FactList/FactList";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { TagList } from "@/components/TagList/TagList";
import { endpoints } from "@/lib/publicApi";
import styles from "./CaseStudyHeader.module.css";

type CaseStudyHeaderProps = {
  study: CaseStudy;
  labels: WorkPage["labels"];
};

export function CaseStudyHeader({ study, labels }: CaseStudyHeaderProps) {
  return (
    <InkBand>
      <Container className={styles.header}>
        <div className={styles.topRow}>
          <Link href="/work/" className={styles.back}>
            <span aria-hidden="true">← </span>
            {labels.backToWork}
          </Link>
          {/* A plain anchor: the target is a JSON file, not a page. */}
          <a href={endpoints.caseStudy(study.slug)} className={styles.json}>
            {labels.viewAsJson}
          </a>
        </div>
        <div className={styles.status}>
          <StatusBadge status={study.status} tone="ink" />
        </div>
        <h1 className={styles.title}>{study.title}</h1>
        <p className={styles.summary}>{study.summary}</p>
        {study.links.length > 0 ? (
          <div className={styles.links}>
            {study.links.map((link, index) => (
              <ButtonLink
                key={link.href}
                link={link}
                variant={index === 0 ? "onInk" : "onInkSecondary"}
              />
            ))}
          </div>
        ) : null}
        <FactList
          facts={[
            { term: labels.role, detail: study.role },
            { term: labels.context, detail: study.context },
            { term: labels.period, detail: study.period },
          ]}
          tone="ink"
        />
        <div className={styles.tech}>
          <h2 className={styles.techHeading}>{labels.technologies}</h2>
          <TagList tags={study.tech} label={labels.technologies} tone="ink" />
        </div>
      </Container>
    </InkBand>
  );
}
