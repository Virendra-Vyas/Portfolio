import type { CSSProperties } from "react";
import type { InternalHref } from "@/content/schema";
import { buildTrace, kindLabels } from "@/lib/trace";
import styles from "./TraceStrip.module.css";

type TraceStripProps = {
  /** Case study whose role is highlighted. */
  caseStudy: InternalHref;
  label: string;
};

/** A minimap of the home page's career trace, with this case study's role picked out. */
export function TraceStrip({ caseStudy, label }: TraceStripProps) {
  const trace = buildTrace();
  const span = trace.spans.find((item) => item.caseStudy === caseStudy);
  if (!span) return null;
  const pct = (month: number) => `${(month / trace.months) * 100}%`;

  return (
    <figure className={styles.strip} style={{ "--months": trace.months } as CSSProperties}>
      <figcaption className={styles.caption}>
        {label}: {span.role}, {span.organisation}, {span.period} ({kindLabels[span.kind].toLowerCase()})
      </figcaption>
      <div className={styles.plot} aria-hidden="true">
        {trace.spans.map((item) => (
          <span key={item.id} className={styles.row}>
            <span
              className={`${styles.bar} ${item.id === span.id ? `${styles.on} ${styles[item.kind]}` : ""}`}
              style={{ left: pct(item.start), width: pct(item.end - item.start) }}
            />
          </span>
        ))}
        <span className={styles.years}>
          {trace.years.map((year, index) => (
            <span key={year} style={{ left: pct(index * 12) }}>
              {year}
            </span>
          ))}
        </span>
      </div>
    </figure>
  );
}
