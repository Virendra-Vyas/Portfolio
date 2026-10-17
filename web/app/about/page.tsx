import type { Metadata } from "next";
import { about } from "@/content/about";
import { profile, profileFacts } from "@/content/profile";
import { home } from "@/content/home";
import { skillYears, skills } from "@/content/skills";
import { timeline } from "@/content/timeline";
import { Credentials } from "@/components/Credentials/Credentials";
import { FactList } from "@/components/FactList/FactList";
import { Founder } from "@/components/Founder/Founder";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Section } from "@/components/Section/Section";
import { SkillGroups } from "@/components/SkillGroups/SkillGroups";
import { SkillYears } from "@/components/SkillYears/SkillYears";
import { Timeline } from "@/components/Timeline/Timeline";
import styles from "./page.module.css";

export const metadata: Metadata = { title: about.title, description: profile.about[0] };

export default function AboutPage() {
  const [lead, ...rest] = profile.about;

  return (
    <>
      <PageHeader title={about.title} intro={lead} />
      <Section id="story" copy={{ heading: about.storyHeading }}>
        <div className={styles.story}>
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <FactList facts={profileFacts} />
      </Section>
      <Section id="founder" copy={{ heading: home.founder.heading, intro: home.founder.intro }} tone="tinted">
        <Founder founder={home.founder} />
      </Section>
      <Section id="career" copy={{ heading: about.timelineHeading }}>
        <Timeline
          entries={timeline}
          presentLabel={about.presentLabel}
          caseStudyLinkLabel={about.caseStudyLinkLabel}
        />
      </Section>
      <Section id="skills" copy={{ heading: about.skillsHeading, intro: about.skillsIntro }} tone="tinted">
        <div className={styles.skills}>
          <SkillYears
            items={skillYears}
            heading={home.experience.yearsHeading}
            caption={home.experience.yearsCaption}
          />
          <SkillGroups groups={skills} evidenceLabel={about.evidenceLabel} />
        </div>
      </Section>
      <Section id="credentials" copy={{ heading: about.credentialsHeading }}>
        <Credentials profile={profile} copy={about} />
      </Section>
    </>
  );
}
