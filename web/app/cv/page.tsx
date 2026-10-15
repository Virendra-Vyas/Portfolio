import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { cv } from "@/content/cv";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { skills } from "@/content/skills";
import { timeline } from "@/content/timeline";
import { writing } from "@/content/writing";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Container } from "@/components/Container/Container";
import { CvDocument } from "@/components/CvDocument/CvDocument";
import styles from "./page.module.css";

// The PDF's title comes from this, so it reads "CV | Virendra Vyas" in viewers and downloads.
export const metadata: Metadata = { title: cv.title, description: profile.hero.summary };

export default function CvPage() {
  return (
    <>
      <Container className={styles.actions}>
        <ButtonLink link={cv.pdf} />
      </Container>
      <CvDocument
        copy={cv}
        site={site}
        profile={profile}
        timeline={timeline}
        caseStudies={caseStudies}
        projects={projects}
        skills={skills}
        articles={writing.articles}
        openSource={writing.openSource}
      />
    </>
  );
}
