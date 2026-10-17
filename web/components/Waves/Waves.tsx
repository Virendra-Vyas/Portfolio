import styles from "./Waves.module.css";

/**
 * Two layers of slow ocean swell, used as a divider. `to` is the colour of the band below the waves.
 * Each path repeats exactly every half of its width, with matching tangents at the joins, so sliding a
 * layer by half its width loops without a seam. Purely decorative.
 */
export function Waves({ to }: { to: "dark" | "sunk" }) {
  return (
    <div className={`${styles.waves} ${styles[to]}`} aria-hidden="true">
      <svg className={`${styles.layer} ${styles.back}`} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 40 C 120 10 240 70 360 40 C 480 10 600 70 720 40 C 840 10 960 70 1080 40 C 1200 10 1320 70 1440 40 V80 H0 Z" />
      </svg>
      <svg className={`${styles.layer} ${styles.front}`} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 52 C 80 34 160 70 240 52 C 320 34 400 70 480 52 C 560 34 640 70 720 52 C 800 34 880 70 960 52 C 1040 34 1120 70 1200 52 C 1280 34 1360 70 1440 52 V80 H0 Z" />
      </svg>
    </div>
  );
}
