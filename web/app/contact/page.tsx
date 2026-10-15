import type { Metadata } from "next";
import { contact } from "@/content/contact";
import { profile, profileFacts } from "@/content/profile";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { ContactRoutes } from "@/components/ContactRoutes/ContactRoutes";
import { FactList } from "@/components/FactList/FactList";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Section } from "@/components/Section/Section";
import { contactApiUrl } from "@/lib/config";
import styles from "./page.module.css";

export const metadata: Metadata = { title: contact.title, description: contact.intro };

export default function ContactPage() {
  return (
    <>
      <PageHeader title={contact.title} intro={contact.intro} />
      <Section id="form" copy={{ heading: contact.form.heading, intro: contact.form.intro }}>
        <ContactForm copy={contact.form} apiUrl={contactApiUrl} email={site.contact.email} />
      </Section>
      <Section id="routes" copy={{ heading: contact.routesHeading }} tone="tinted">
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
