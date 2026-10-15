import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { work } from "@/content/work";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram/ArchitectureDiagram";
import { CaseStudyHeader } from "@/components/CaseStudyHeader/CaseStudyHeader";
import { Container } from "@/components/Container/Container";
import { NextLink } from "@/components/NextLink/NextLink";
import { ProseSection } from "@/components/ProseSection/ProseSection";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

// Only the case studies in /content exist; anything else is a 404 in the static export.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: study.title, description: study.summary } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const { labels } = work;
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];

  return (
    <article>
      <CaseStudyHeader study={study} labels={labels} />
      <Container className={styles.body}>
        <ProseSection section={study.problem} />

        {study.diagram ? (
          <ArchitectureDiagram
            diagram={study.diagram}
            heading={labels.diagramHeading}
            alt={`${study.title} architecture diagram`}
            descriptionLabel={labels.diagramDescription}
            fullSizeLabel={labels.diagramFullSize}
          />
        ) : null}

        <section className={styles.group} aria-labelledby="what-i-did">
          <h2 id="what-i-did" className={styles.groupHeading}>
            {labels.whatIDid}
          </h2>
          {study.whatIDid.map((section) => (
            <ProseSection key={section.heading} section={section} headingLevel="h3" />
          ))}
        </section>

        <ProseSection section={study.outcome} />
        <ProseSection section={study.honestStatus} tone="callout" />
        {study.next ? <ProseSection section={study.next} /> : null}
      </Container>
      <NextLink study={next} label={labels.nextCaseStudy} />
    </article>
  );
}
