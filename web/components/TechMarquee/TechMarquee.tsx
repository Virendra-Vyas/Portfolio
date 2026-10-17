"use client";

import { useState } from "react";
import { PlaybackIcon } from "@/lib/icons";
import styles from "./TechMarquee.module.css";

type TechMarqueeProps = {
  items: string[];
  label: string;
  controls: { pause: string; play: string };
};

/**
 * The core stack as a slowly scrolling strip. Screen readers get the list once; the second copy that
 * makes the loop seamless is hidden from them. A button pauses and restarts it for keyboard and touch
 * users (WCAG 2.2.2); it also pauses on hover, and stands still with reduced motion.
 */
export function TechMarquee({ items, label, controls }: TechMarqueeProps) {
  const [playing, setPlaying] = useState(true);

  return (
    <div className={`${styles.marquee} ${playing ? "" : styles.paused}`}>
      <div className={styles.viewport}>
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
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={!playing}
        aria-label={controls.pause}
        title={playing ? controls.pause : controls.play}
        onClick={() => setPlaying((value) => !value)}
      >
        <PlaybackIcon playing={playing} />
      </button>
    </div>
  );
}
