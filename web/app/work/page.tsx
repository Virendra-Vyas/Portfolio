import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { projects } from "@/content/projects";
import { work } from "@/content/work";
import { CaseStudyCard } from "@/components/CaseStudyCard/CaseStudyCard";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Section } from "@/components/Section/Section";
import { WorkCard } from "@/components/WorkCard/WorkCard";
import styles from "./page.module.css";

export const metadata: Metadata = { title: work.title, description: work.intro };

export default function WorkIndex() {
  return (
    <>
      <PageHeader title={work.title} intro={work.intro} />
      <Section id="case-studies" copy={work.caseStudies}>
        <ul className={styles.grid}>
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <CaseStudyCard study={study} maxTags={8} />
            </li>
          ))}
        </ul>
      </Section>
      <Section id="further-work" copy={work.furtherWork} tone="tinted">
        <ul className={styles.grid}>
          {projects.map((project) => (
            <li key={project.title}>
              <WorkCard project={project} technologiesLabel={work.labels.technologies} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
