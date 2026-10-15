import type { ProofPoint } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import styles from "./ProofPoints.module.css";

export function ProofPoints({ points }: { points: ProofPoint[] }) {
  return (
    <ol className={styles.list}>
      {points.map((point) => (
        <li key={point.title} className={styles.item}>
          <h3 className={styles.title}>{point.title}</h3>
          <p className={styles.detail}>{point.detail}</p>
          <SmartLink href={point.link.href} className={styles.link}>
            {point.link.label}
          </SmartLink>
        </li>
      ))}
    </ol>
  );
}
