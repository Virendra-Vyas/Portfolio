import type { Metadata } from "next";
import { contact } from "@/content/contact";
import { profile, profileFacts } from "@/content/profile";
import { site } from "@/content/site";
import { ContactRoutes } from "@/components/ContactRoutes/ContactRoutes";
import { FactList } from "@/components/FactList/FactList";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Section } from "@/components/Section/Section";
import styles from "./page.module.css";

export const metadata: Metadata = { title: contact.title, description: contact.intro };

// The contact form and CV download are added with the contact API (build step 8).
export default function ContactPage() {
  return (
    <>
      <PageHeader title={contact.title} intro={contact.intro} />
      <Section id="routes" copy={{ heading: contact.routesHeading }}>
        <ContactRoutes contact={site.contact} copy={contact} />
      </Section>
      <Section id="arrangements" copy={{ heading: contact.arrangementsHeading }}>
        <ul className={styles.arrangements}>
          {profile.workingArrangements.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <FactList facts={profileFacts} />
      </Section>
    </>
  );
}
