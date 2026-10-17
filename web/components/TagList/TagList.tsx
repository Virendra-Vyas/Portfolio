import styles from "./TagList.module.css";

type TagListProps = {
  tags: string[];
  /** Accessible name for the list, e.g. "Technologies". */
  label: string;
  tone?: "plain" | "ink";
};

export function TagList({ tags, label, tone = "plain" }: TagListProps) {
  return (
    <ul className={tone === "ink" ? `${styles.list} ${styles.ink}` : styles.list} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
