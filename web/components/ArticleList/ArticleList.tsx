import type { Article, OpenSourceContribution } from "@/content/schema";
import styles from "./ArticleList.module.css";

type ArticleListProps =
  | { kind: "articles"; items: Article[]; pendingNote: string }
  | { kind: "openSource"; items: OpenSourceContribution[] };

export function ArticleList(props: ArticleListProps) {
  return (
    <ul className={styles.list}>
      {props.kind === "articles"
        ? props.items.map((article) => (
            <li key={article.title} className={styles.item}>
              <h3 className={styles.title}>
                {article.href ? <a href={article.href}>{article.title}</a> : article.title}
              </h3>
              <p className={styles.summary}>{article.summary}</p>
              <p className={styles.meta}>
                {article.platform}
                {article.href ? null : ` · ${props.pendingNote}`}
              </p>
            </li>
          ))
        : props.items.map((item) => (
            <li key={item.href} className={styles.item}>
              <h3 className={styles.title}>
                <a href={item.href}>{item.title}</a>
              </h3>
              <p className={styles.summary}>{item.summary}</p>
              <p className={styles.meta}>{item.project}</p>
            </li>
          ))}
    </ul>
  );
}
