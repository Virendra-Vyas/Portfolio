import type { ProjectCard } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import { TagList } from "@/components/TagList/TagList";
import styles from "./WorkCard.module.css";

export function WorkCard({ project, technologiesLabel }: { project: ProjectCard; technologiesLabel: string }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.meta}>
        {project.context}
        {project.period ? `. ${project.period}` : null}
      </p>
      <p>{project.summary}</p>
      <ul className={styles.points}>
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {project.links.length > 0 ? (
        <ul className={styles.links}>
          {project.links.map((link) => (
            <li key={link.href}>
              <SmartLink href={link.href}>{link.label}</SmartLink>
            </li>
          ))}
        </ul>
      ) : null}
      <div className={styles.tags}>
        <TagList tags={project.tech} label={technologiesLabel} />
      </div>
    </article>
  );
}
