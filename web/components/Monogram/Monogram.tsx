import styles from "./Monogram.module.css";

/** The VV mark: the same drawing as app/icon.svg, with a status light that is always "live". */
export function Monogram({ size = 32 }: { size?: number }) {
  return (
    <svg className={styles.mark} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect className={styles.tile} width="64" height="64" rx="14" />
      <path
        className={styles.letters}
        d="M9 17 L17.5 45 L26 17 M36 17 L44.5 45 L53 17"
        fill="none"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className={styles.light} cx="54" cy="51" r="4.5" />
    </svg>
  );
}
