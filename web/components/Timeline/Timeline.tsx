import Link from "next/link";
import type { TimelineEntry } from "@/content/schema";
import { formatYearMonth, isoYearMonth } from "@/lib/dates";
import styles from "./Timeline.module.css";

type TimelineProps = {
  entries: TimelineEntry[];
  presentLabel: string;
  caseStudyLinkLabel: string;
};

export function Timeline({ entries, presentLabel, caseStudyLinkLabel }: TimelineProps) {
  return (
    <ol className={styles.list}>
      {entries.map((entry) => (
        <li
          key={`${entry.organisation}-${entry.role}`}
          className={entry.end ? styles.entry : `${styles.entry} ${styles.current}`}
        >
          <p className={styles.dates}>
            <time dateTime={isoYearMonth(entry.start)}>{formatYearMonth(entry.start)}</time>
            {" to "}
            {entry.end ? <time dateTime={isoYearMonth(entry.end)}>{formatYearMonth(entry.end)}</time> : presentLabel}
          </p>
          <div className={styles.body}>
            <h3 className={styles.role}>{entry.role}</h3>
            <p className={styles.organisation}>{entry.organisation}</p>
            <p className={styles.summary}>{entry.summary}</p>
            {entry.caseStudy ? (
              <Link href={entry.caseStudy} className={styles.link}>
                {caseStudyLinkLabel}
                <span className={styles.visuallyHidden}>: {entry.organisation}</span>
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
