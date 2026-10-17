import styles from "./TagList.module.css";

type TagListProps = {
  tags: string[];
  /** Accessible name for the list, e.g. "Technologies". */
  label: string;
};

export function TagList({ tags, label }: TagListProps) {
  return (
    <ul className={styles.list} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
