import type { Stat } from "@/content/schema";
import { CountUp } from "@/components/CountUp/CountUp";
import { Icon } from "@/lib/icons";
import styles from "./Stats.module.css";

/** Headline numbers that count up as they come into view. Each one says in words what it counts. */
export function Stats({ items, label }: { items: Stat[]; label: string }) {
  return (
    <ul className={styles.stats} aria-label={label}>
      {items.map((item, index) => (
        <li key={item.label} className={`${styles.stat} kind-${item.kind}`} data-reveal style={{ ["--reveal-i" as string]: index }}>
          <span className={styles.icon}>
            <Icon name={item.icon} size={20} />
          </span>
          <span className={styles.value}>
            <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
          </span>
          <span className={styles.label}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
