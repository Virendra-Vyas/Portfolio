import styles from "./SkipLink.module.css";

export function SkipLink({ targetId }: { targetId: string }) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      Skip to content
    </a>
  );
}
