import type { Diagram } from "@/content/schema";
import styles from "./ArchitectureDiagram.module.css";

type ArchitectureDiagramProps = {
  diagram: Diagram;
  heading: string;
  /** Short accessible name for the image; the full description sits in the expandable text below. */
  alt: string;
  descriptionLabel: string;
  fullSizeLabel: string;
};

export function ArchitectureDiagram({ diagram, heading, alt, descriptionLabel, fullSizeLabel }: ArchitectureDiagramProps) {
  return (
    <figure className={styles.figure}>
      <h2 className={styles.heading}>{heading}</h2>
      {/* Scrolls sideways on narrow screens so labels stay readable instead of shrinking. */}
      <div className={styles.frame} tabIndex={0} role="region" aria-label={heading}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, SVG needs no optimisation */}
        <img
          src={diagram.src}
          alt={alt}
          width={diagram.width}
          height={diagram.height}
          className={styles.image}
          style={{ maxWidth: diagram.width }}
          loading="lazy"
        />
      </div>
      <figcaption className={styles.caption}>
        <details>
          <summary>{descriptionLabel}</summary>
          <p className={styles.description}>{diagram.description}</p>
        </details>
        <a href={diagram.src}>{fullSizeLabel}</a>
      </figcaption>
    </figure>
  );
}
