import type { Fact } from "@/content/schema";
import { Icon } from "@/lib/icons";
import styles from "./FactList.module.css";

export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className={styles.list}>
      {facts.map((fact) => (
        <div key={fact.term} className={fact.icon ? `${styles.item} ${styles.withIcon}` : styles.item}>
          <dt className={styles.term}>
            {fact.icon ? (
              <span className={styles.icon}>
                <Icon name={fact.icon} size={18} />
              </span>
            ) : null}
            {fact.term}
          </dt>
          <dd className={styles.detail}>{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
