import styles from "./ApiTeaser.module.css";

type ApiTeaserProps = {
  /** The request line, e.g. "GET /api/v1/profile.json". */
  request: string;
  /** A short excerpt of the real response, already formatted. */
  excerpt: string;
};

export function ApiTeaser({ request, excerpt }: ApiTeaserProps) {
  return (
    <figure className={styles.figure}>
      <figcaption className={styles.request}>
        <span className={styles.method}>{request.split(" ")[0]}</span> {request.split(" ").slice(1).join(" ")}
      </figcaption>
      <pre className={styles.body} tabIndex={0}>
        <code>{excerpt}</code>
      </pre>
    </figure>
  );
}
