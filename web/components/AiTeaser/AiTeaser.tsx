import type { AiPage } from "@/content/schema";
import { Icon } from "@/lib/icons";
import styles from "./AiTeaser.module.css";

export function AiTeaser({ ai }: { ai: AiPage }) {
  return (
    <div className={styles.teaser}>
      <p className={styles.intro}>{ai.intro}</p>
      <ul className={styles.list}>
        {ai.practices.map((practice) => (
          <li key={practice.heading} className={styles.item}>
            <span className={styles.icon}>
              <Icon name={practice.icon} size={18} />
            </span>
            {practice.heading}
          </li>
        ))}
      </ul>
    </div>
  );
}
