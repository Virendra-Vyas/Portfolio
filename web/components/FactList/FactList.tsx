import styles from "./FactList.module.css";

export type Fact = { term: string; detail: string };

export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className={styles.list}>
      {facts.map((fact) => (
        <div key={fact.term} className={styles.item}>
          <dt className={styles.term}>{fact.term}</dt>
          <dd className={styles.detail}>{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
