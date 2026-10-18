import type { Photo } from "@/content/schema";
import styles from "./Portrait.module.css";

type PortraitProps = {
  photo: Photo;
  /** The rendered width at each breakpoint, so the browser picks the smallest file that is sharp enough. */
  sizes: string;
  /** Above the fold: load it straight away instead of lazily. */
  priority?: boolean;
  className?: string;
};

/** A photo framed as a portrait card, served as AVIF or WebP with a JPEG fallback. */
export function Portrait({ photo, sizes, priority = false, className }: PortraitProps) {
  const srcSet = (ext: string) => photo.widths.map((w) => `${photo.src}-${w}.${ext} ${w}w`).join(", ");
  const width = photo.fallbackWidth;
  const height = Math.round((width * photo.aspect.height) / photo.aspect.width);

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          className={styles.image}
          src={`${photo.src}-${width}.jpg`}
          alt={photo.alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
        />
      </picture>
    </div>
  );
}
