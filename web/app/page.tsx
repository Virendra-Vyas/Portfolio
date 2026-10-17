import { apiPage } from "@/content/apiPage";
import { featuredCaseStudies } from "@/content/caseStudies";
import { home } from "@/content/home";
import { profile, profileFacts } from "@/content/profile";
import { site } from "@/content/site";
import { skillYears, skills } from "@/content/skills";
import { about } from "@/content/about";
import { ApiTeaser } from "@/components/ApiTeaser/ApiTeaser";
import { CaseStudyCard } from "@/components/CaseStudyCard/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta/ContactCta";
import { Founder } from "@/components/Founder/Founder";
import { Hero } from "@/components/Hero/Hero";
import { Outcomes } from "@/components/Outcomes/Outcomes";
import { Section } from "@/components/Section/Section";
import { SkillGroups } from "@/components/SkillGroups/SkillGroups";
import { SkillYears } from "@/components/SkillYears/SkillYears";
import { endpoints, profileResponse } from "@/lib/publicApi";
import styles from "./page.module.css";

export default function Home() {
  // A real excerpt of the profile endpoint, so the teaser shows exactly what the API returns.
  const { data } = profileResponse();
  const excerpt = JSON.stringify(
    {
      data: {
        name: data.name,
        role: data.role,
        location: data.location,
        availability: data.availability,
      },
    },
    null,
    2,
  );

  return (
    <>
      <Hero
        name={site.name}
        profile={profile}
        facts={profileFacts}
        trace={home.trace}
        primaryAction={home.primaryAction}
        secondaryAction={home.secondaryAction}
        cvAction={home.cvAction}
      />
      <Section id="founder" copy={home.founder}>
        <Founder founder={home.founder} />
      </Section>
      <Section id="experience" copy={home.experience} tone="tinted">
        <div className={styles.experience}>
          <SkillYears
            items={skillYears}
            heading={home.experience.yearsHeading}
            caption={home.experience.yearsCaption}
          />
          <div>
            <h3 className={styles.subheading}>
              {home.experience.groupsHeading}
            </h3>
            <SkillGroups
              groups={home.experience.groups.map((name) => {
                const group = skills.find((item) => item.name === name);
                if (!group)
                  throw new Error(
                    `Unknown skill group "${name}" in content/home.ts`,
                  );
                return group;
              })}
              evidenceLabel={about.evidenceLabel}
            />
          </div>
        </div>
      </Section>
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
      <Section id="api" copy={apiPage.teaser}>
        <ApiTeaser
          request={`GET ${endpoints.profile}`}
          excerpt={excerpt}
          status={apiPage.teaserStatus}
        />
      </Section>
      <Section id="contact" copy={home.contact} tone="dark">
        <ContactCta
          profile={profile}
          contact={site.contact}
          primaryAction={home.primaryAction}
        />
      </Section>
    </>
  );
}
