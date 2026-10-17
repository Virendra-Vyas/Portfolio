import { ai } from "@/content/ai";
import { apiPage } from "@/content/apiPage";
import { caseStudies, featuredCaseStudies } from "@/content/caseStudies";
import { home } from "@/content/home";
import { profile, profileFacts } from "@/content/profile";
import { site } from "@/content/site";
import { AiTeaser } from "@/components/AiTeaser/AiTeaser";
import { ApiTeaser } from "@/components/ApiTeaser/ApiTeaser";
import { CaseStudyCard } from "@/components/CaseStudyCard/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta/ContactCta";
import { Hero } from "@/components/Hero/Hero";
import { Outcomes } from "@/components/Outcomes/Outcomes";
import { Section } from "@/components/Section/Section";
import { endpoints, profileResponse } from "@/lib/publicApi";
import styles from "./page.module.css";

export default function Home() {
  // A real excerpt of the profile endpoint, so the teaser shows exactly what the API returns.
  const { data } = profileResponse();
  const excerpt = JSON.stringify(
    { data: { name: data.name, role: data.role, location: data.location, availability: data.availability } },
    null,
    2,
  );

  return (
    <>
      <Hero
        name={site.name}
        profile={profile}
        facts={profileFacts}
        studies={caseStudies}
        board={home.board}
        primaryAction={home.primaryAction}
        secondaryAction={home.secondaryAction}
        cvAction={home.cvAction}
      />
      <Section id="outcomes" copy={home.outcomes}>
        <Outcomes items={home.outcomes.items} />
      </Section>
      <Section id="work" copy={home.work}>
        <ul className={styles.index}>
          {featuredCaseStudies.map((study) => (
            <li key={study.slug}>
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
      </Section>
      <Section id="ai" copy={home.ai} tone="tinted">
        <AiTeaser ai={ai} />
      </Section>
      <Section id="api" copy={apiPage.teaser}>
        <ApiTeaser request={`GET ${endpoints.profile}`} excerpt={excerpt} status={apiPage.teaserStatus} />
      </Section>
      <Section id="contact" copy={home.contact} tone="tinted">
        <ContactCta profile={profile} contact={site.contact} primaryAction={home.primaryAction} />
      </Section>
    </>
  );
}
