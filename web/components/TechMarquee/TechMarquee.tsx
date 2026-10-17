import styles from "./TechMarquee.module.css";

/**
 * The core stack as a slowly scrolling strip. Screen readers get the list once; the second copy that
 * makes the loop seamless is hidden from them. It pauses on hover and stands still with reduced motion.
 */
export function TechMarquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <ul className={styles.list} aria-label={label}>
          {items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
        <ul className={styles.list} aria-hidden="true">
          {items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
