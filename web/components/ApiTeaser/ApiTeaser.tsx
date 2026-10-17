import type { ReactNode } from "react";
import styles from "./ApiTeaser.module.css";

type ApiTeaserProps = {
  /** The request line, e.g. "GET /api/v1/profile.json". */
  request: string;
  /** A short excerpt of the real response, already formatted as JSON. */
  excerpt: string;
  status: string;
};

/** Colours JSON at build time: keys, strings and punctuation get their own token colours. */
function highlight(json: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /("(?:[^"\\]|\\.)*")(\s*:)?|([{}[\],])/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(json))) {
    if (match.index > last) parts.push(json.slice(last, match.index));
    if (match[1] && match[2]) {
      parts.push(
        <span key={match.index} className={styles.key}>
          {match[1]}
        </span>,
        <span key={`${match.index}c`} className={styles.punct}>
          {match[2]}
        </span>,
      );
    } else if (match[1]) {
      parts.push(
        <span key={match.index} className={styles.string}>
          {match[1]}
        </span>,
      );
    } else {
      parts.push(
        <span key={match.index} className={styles.punct}>
          {match[3]}
        </span>,
      );
    }
    last = pattern.lastIndex;
  }
  parts.push(json.slice(last));
  return parts;
}

export function ApiTeaser({ request, excerpt, status }: ApiTeaserProps) {
  const [method, ...path] = request.split(" ");
  return (
    <figure className={styles.console}>
      <figcaption className={styles.bar}>
        <span className={styles.request}>
          <span className={styles.method}>{method}</span> {path.join(" ")}
        </span>
        <span className={styles.status}>{status}</span>
      </figcaption>
      <pre className={styles.body} tabIndex={0}>
        <code>{highlight(excerpt)}</code>
      </pre>
    </figure>
  );
}
