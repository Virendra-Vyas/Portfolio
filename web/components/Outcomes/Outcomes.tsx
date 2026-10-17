import type { Outcome } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import { Icon } from "@/lib/icons";
import styles from "./Outcomes.module.css";

/**
 * Before-and-after pairs. Percentages get a 0–100 bar drawn to scale; the rest are shown as a change of state.
 * They all come from employed work (DeviceHub), so they wear that kind's colour.
 */
export function Outcomes({ items }: { items: Outcome[] }) {
  return (
    <ol className={`${styles.list} kind-employment`}>
      {items.map((item, index) => (
        <li key={item.label} className={styles.item} data-reveal style={{ ["--reveal-i" as string]: index }}>
          <p className={styles.label}>
            <span className={styles.icon}>
              <Icon name={item.icon} size={18} />
            </span>
            {item.label}
          </p>
          <div className={styles.change}>
            <span className={styles.before}>{item.before}</span>
            <span className={styles.arrow} aria-hidden="true" />
            <span className={styles.after}>{item.after}</span>
          </div>
          {item.note ? <p className={styles.note}>{item.note}</p> : null}
          {item.scale ? (
            <div
              className={styles.track}
              role="img"
              aria-label={`${item.label}: from ${item.scale.from}% to ${item.scale.to}% on a scale of 0 to 100%`}
            >
              <span className={styles.gain} style={{ left: `${item.scale.from}%`, width: `${item.scale.to - item.scale.from}%` }} />
              <span className={styles.base} style={{ width: `${item.scale.from}%` }} />
              <span className={styles.tick} style={{ left: `${item.scale.from}%` }}>
                {item.scale.from}%
              </span>
              <span className={`${styles.tick} ${styles.tickAfter}`} style={{ left: `${item.scale.to}%` }}>
                {item.scale.to}%
              </span>
            </div>
          ) : null}
          <SmartLink href={item.source.href} className={styles.source}>
            {item.source.label}
          </SmartLink>
        </li>
      ))}
    </ol>
  );
}
