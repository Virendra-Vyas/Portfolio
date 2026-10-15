import type { AiPage } from "@/content/schema";
import styles from "./AiTeaser.module.css";

export function AiTeaser({ ai }: { ai: AiPage }) {
  return (
    <div className={styles.teaser}>
      <p className={styles.intro}>{ai.intro}</p>
      <ul className={styles.list}>
        {ai.practices.map((practice) => (
          <li key={practice.heading} className={styles.item}>
            {practice.heading}
          </li>
        ))}
      </ul>
    </div>
  );
}
