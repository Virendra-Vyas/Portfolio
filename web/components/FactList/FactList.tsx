import type { Fact } from "@/content/schema";
import styles from "./FactList.module.css";

export function FactList({ facts, tone = "plain" }: { facts: Fact[]; tone?: "plain" | "ink" }) {
  return (
    <dl className={tone === "ink" ? `${styles.list} ${styles.ink}` : styles.list}>
      {facts.map((fact) => (
        <div key={fact.term} className={styles.item}>
          <dt className={styles.term}>{fact.term}</dt>
          <dd className={styles.detail}>{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
