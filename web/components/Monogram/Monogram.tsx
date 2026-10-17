import styles from "./Monogram.module.css";

/** The VV mark: the same drawing as app/icon.svg. The bar under the letters is a trace span. */
export function Monogram({ size = 32 }: { size?: number }) {
  return (
    <svg className={styles.mark} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect className={styles.tile} width="64" height="64" rx="8" />
      <path
        className={styles.letters}
        d="M9 12 L17.5 40 L26 12 M38 12 L46.5 40 L55 12"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect className={styles.span} x="9" y="49" width="38" height="6" rx="3" />
    </svg>
  );
}
