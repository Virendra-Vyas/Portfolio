import type { AiPractice } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import styles from "./PracticeList.module.css";

export function PracticeList({ practices }: { practices: AiPractice[] }) {
  return (
    <ol className={styles.list}>
      {practices.map((practice) => (
        <li key={practice.heading} className={styles.item}>
          <h2 className={styles.heading}>{practice.heading}</h2>
          <p className={styles.body}>{practice.body}</p>
          {practice.evidence ? (
            <SmartLink href={practice.evidence.href} className={styles.link}>
              {practice.evidence.label}
            </SmartLink>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
