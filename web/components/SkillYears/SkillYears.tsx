import type { CSSProperties } from "react";
import type { SkillYears as SkillYearsData } from "@/content/schema";
import styles from "./SkillYears.module.css";

type SkillYearsProps = {
  items: SkillYearsData[];
  heading: string;
  caption: string;
};

const AXIS_YEARS = 10;

/**
 * Years of commercial use for the core stack, drawn to scale on one 0–10 year axis. A single series,
 * so no legend: each bar is labelled directly, and the list reads in full without the bars.
 */
export function SkillYears({ items, heading, caption }: SkillYearsProps) {
  return (
    <figure className={styles.chart} aria-labelledby="skill-years-heading">
      <figcaption className={styles.head}>
        <h3 id="skill-years-heading" className={styles.heading}>
          {heading}
        </h3>
        <p className={styles.caption}>{caption}</p>
      </figcaption>
      <ol className={styles.rows} style={{ "--axis": AXIS_YEARS } as CSSProperties}>
        {items.map((item) => (
          <li key={item.skill} className={styles.row}>
            <span className={styles.skill}>{item.skill}</span>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.bar} style={{ width: `${(item.years / AXIS_YEARS) * 100}%` }} />
            </span>
            <span className={styles.value}>{item.label}</span>
          </li>
        ))}
      </ol>
      <div className={styles.axis} aria-hidden="true">
        {Array.from({ length: AXIS_YEARS / 2 + 1 }, (_, i) => i * 2).map((year) => (
          <span key={year} style={{ left: `${(year / AXIS_YEARS) * 100}%` }}>
            {year}
          </span>
        ))}
      </div>
    </figure>
  );
}
