import styles from "./Monogram.module.css";

/**
 * The mark: a three-span waterfall, the career trace reduced to its shape, in ink at three strengths.
 * The same drawing as app/icon.svg.
 */
export function Monogram({ size = 32 }: { size?: number }) {
  return (
    <svg className={styles.mark} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect className={styles.employment} x="4" y="10" width="32" height="12" rx="6" />
      <rect className={styles.company} x="16" y="26" width="38" height="12" rx="6" />
      <rect className={styles.freelance} x="30" y="42" width="30" height="12" rx="6" />
    </svg>
  );
}
