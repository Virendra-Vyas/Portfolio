import Link from "next/link";
import type { CaseStudy, HomePage } from "@/content/schema";
import styles from "./StatusBoard.module.css";

type StatusBoardProps = {
  studies: CaseStudy[];
  copy: HomePage["board"];
};

/**
 * Every case study as a running system with a status light. The light's colour is the project's real
 * status (live and in production are green, a proof of concept is amber, finished or unlaunched work is
 * grey) and the label always says it in words, so colour is never the only signal.
 */
export function StatusBoard({ studies, copy }: StatusBoardProps) {
  return (
    <figure className={styles.board} aria-labelledby="status-board-heading">
      <figcaption className={styles.head}>
        <h2 id="status-board-heading" className={styles.heading}>
          {copy.heading}
        </h2>
        <p className={styles.caption}>{copy.caption}</p>
      </figcaption>
      <table className={styles.table}>
        <thead className={styles.visuallyHidden}>
          <tr>
            <th scope="col">{copy.systemLabel}</th>
            <th scope="col">{copy.statusLabel}</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study, index) => (
            <tr key={study.slug} className={styles.row} style={{ "--i": index } as React.CSSProperties}>
              <th scope="row" className={styles.system}>
                <span className={`${styles.light} ${styles[study.status.tone]}`} aria-hidden="true" />
                <span className={styles.text}>
                  <Link href={`/work/${study.slug}/`} className={styles.link}>
                    {study.title}
                  </Link>
                  <span className={styles.context}>{study.context}</span>
                </span>
              </th>
              <td className={`${styles.status} ${styles[`${study.status.tone}Text`]}`}>{study.status.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
