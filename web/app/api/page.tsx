import type { Metadata } from "next";
import { apiPage } from "@/content/apiPage";
import { ApiExplorer } from "@/components/ApiExplorer/ApiExplorer";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Section } from "@/components/Section/Section";
import { caseStudySlugs, operations } from "@/lib/openapi";
import styles from "./page.module.css";

export const metadata: Metadata = { title: apiPage.title, description: apiPage.intro };

export default function ApiPage() {
  // Only the fields the explorer needs; the schemas stay in the OpenAPI document.
  const explorerOperations = operations.map(({ operationId, path, summary, description }) => ({
    operationId,
    path,
    summary,
    description,
  }));

  return (
    <>
      <PageHeader
        eyebrow={apiPage.eyebrow}
        title={apiPage.title}
        intro={
          <>
            <p>{apiPage.intro}</p>
            <div className={styles.actions}>
              <ButtonLink link={apiPage.openapiLink} variant="secondary" />
            </div>
          </>
        }
      />
      <Section id="how" copy={{ heading: apiPage.howHeading }}>
        <ul className={styles.points}>
          {apiPage.howPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Section>
      <Section id="endpoints" copy={{ heading: apiPage.endpointsHeading }} tone="tinted">
        <ApiExplorer operations={explorerOperations} slugs={caseStudySlugs} labels={apiPage.labels} />
      </Section>
    </>
  );
}
