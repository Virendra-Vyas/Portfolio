import type {
  Article,
  CaseStudy,
  CvCopy,
  OpenSourceContribution,
  Profile,
  ProjectCard,
  Site,
  SkillGroup,
  TimelineEntry,
} from "@/content/schema";
import { formatYearMonth } from "@/lib/dates";
import styles from "./CvDocument.module.css";

type CvDocumentProps = {
  copy: CvCopy;
  site: Site;
  profile: Profile;
  timeline: TimelineEntry[];
  caseStudies: CaseStudy[];
  projects: ProjectCard[];
  skills: SkillGroup[];
  articles: Article[];
  openSource: OpenSourceContribution[];
};

/**
 * Bullet points for a role: its case study's outcome, or its further-work card's points,
 * leaving out any point the role summary already says.
 */
function highlights(entry: TimelineEntry, caseStudies: CaseStudy[], projects: ProjectCard[]): string[] {
  const study = caseStudies.find((item) => `/work/${item.slug}/` === entry.caseStudy);
  const points = study ? (study.outcome.points ?? []) : (projects.find((item) => item.title === entry.project)?.points ?? []);
  return points.filter((point) => !entry.summary.includes(point));
}

const bare = (href: string) => href.replace(/^https:\/\/(www\.)?/, "");

export function CvDocument(props: CvDocumentProps) {
  const { copy, site, profile, timeline, caseStudies, projects, skills, articles, openSource } = props;
  const origin = site.url ?? "";

  return (
    <article className={styles.cv}>
      <header className={styles.header}>
        <h1 className={styles.name}>{site.name}</h1>
        <p className={styles.role}>{site.role}</p>
        <ul className={styles.contact}>
          <li>{profile.location}</li>
          <li>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </li>
          {origin ? (
            <li>
              <a href={origin}>{copy.websiteLabel}</a>
            </li>
          ) : null}
          {site.contact.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{bare(link.href)}</a>
            </li>
          ))}
        </ul>
        <p className={styles.status}>
          {profile.rightToWork} {profile.availability} {profile.workingArrangements.join(" ")}
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.heading}>{copy.headings.summary}</h2>
        <p>{profile.hero.summary}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>{copy.headings.achievements}</h2>
        <ul className={styles.bullets}>
          {profile.proofPoints.map((point) => (
            <li key={point.title}>
              <strong>{point.title}.</strong> {point.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>{copy.headings.experience}</h2>
        {timeline.map((entry) => {
          const points = highlights(entry, caseStudies, projects);
          return (
            <div key={`${entry.organisation}-${entry.role}`} className={styles.entry}>
              <div className={styles.roleHead}>
                <h3 className={styles.roleTitle}>
                  {entry.role}, <span className={styles.org}>{entry.organisation}</span>
                </h3>
                <p className={styles.dates}>
                  {formatYearMonth(entry.start)} to {entry.end ? formatYearMonth(entry.end) : copy.presentLabel}
                </p>
              </div>
              <p className={styles.roleSummary}>{entry.summary}</p>
              {points.length > 0 ? (
                <ul className={styles.bullets}>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {entry.caseStudy && origin ? (
                <p className={styles.more}>
                  <a href={`${origin}${entry.caseStudy}`}>{bare(`${origin}${entry.caseStudy}`)}</a>
                </p>
              ) : null}
            </div>
          );
        })}
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>{copy.headings.skills}</h2>
        <dl className={styles.skills}>
          {skills.map((group) => (
            <div key={group.name}>
              <dt>{group.name}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>{copy.headings.writing}</h2>
        <ul className={styles.bullets}>
          {articles.map((article) => (
            <li key={article.title}>
              {article.href ? <a href={article.href}>{article.title}</a> : article.title} ({article.platform})
            </li>
          ))}
          {openSource.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.title}</a>, merged into {item.project}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.columns}`}>
        <div>
          <h2 className={styles.heading}>{copy.headings.education}</h2>
          <ul className={styles.plain}>
            {profile.education.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>, {item.institution}, {item.period}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>{copy.headings.certifications}</h2>
          <ul className={styles.plain}>
            {profile.certifications.map((item) => (
              <li key={item.title}>
                {item.title}
                {item.note ? ` (${item.note})` : null}
              </li>
            ))}
          </ul>
          <h2 className={styles.heading}>{copy.headings.languages}</h2>
          <p>{profile.languages.join(", ")}</p>
        </div>
      </section>

      <p className={styles.footnote}>{copy.footnote}</p>
    </article>
  );
}
