import type { Metadata } from "next";
import { writing } from "@/content/writing";
import { ArticleList } from "@/components/ArticleList/ArticleList";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Section } from "@/components/Section/Section";

export const metadata: Metadata = { title: writing.title, description: writing.intro };

export default function WritingPage() {
  return (
    <>
      <PageHeader title={writing.title} intro={writing.intro} />
      <Section id="articles" copy={{ heading: writing.articlesHeading }}>
        <ArticleList kind="articles" items={writing.articles} pendingNote={writing.linkPendingNote} />
      </Section>
      <Section id="open-source" copy={{ heading: writing.openSourceHeading }}>
        <ArticleList kind="openSource" items={writing.openSource} />
      </Section>
    </>
  );
}
