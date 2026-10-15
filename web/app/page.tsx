import { ai } from "@/content/ai";
import { featuredCaseStudies } from "@/content/caseStudies";
import { home } from "@/content/home";
import { profile, profileFacts } from "@/content/profile";
import { site } from "@/content/site";
import { AiTeaser } from "@/components/AiTeaser/AiTeaser";
import { CaseStudyCard } from "@/components/CaseStudyCard/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta/ContactCta";
import { Hero } from "@/components/Hero/Hero";
import { ProofPoints } from "@/components/ProofPoints/ProofPoints";
import { Section } from "@/components/Section/Section";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero
        name={site.name}
        profile={profile}
        facts={profileFacts}
        primaryAction={home.primaryAction}
        secondaryAction={home.secondaryAction}
      />
      <Section id="proof" copy={home.proof} tone="tinted">
        <ProofPoints points={profile.proofPoints} />
      </Section>
      <Section id="work" copy={home.work}>
        <ul className={styles.cards}>
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
      <Section id="contact" copy={home.contact}>
        <ContactCta profile={profile} contact={site.contact} primaryAction={home.primaryAction} />
      </Section>
    </>
  );
}
