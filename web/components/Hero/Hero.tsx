import type { AnyLink, Profile } from "@/content/schema";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Container } from "@/components/Container/Container";
import { FactList } from "@/components/FactList/FactList";
import styles from "./Hero.module.css";

type HeroProps = {
  name: string;
  profile: Profile;
  primaryAction: AnyLink;
  secondaryAction: AnyLink;
};

export function Hero({ name, profile, primaryAction, secondaryAction }: HeroProps) {
  return (
    <Container as="header" className={styles.hero}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.headline}>{profile.hero.headline}</p>
      <p className={styles.summary}>{profile.hero.summary}</p>
      <div className={styles.actions}>
        <ButtonLink link={primaryAction} />
        <ButtonLink link={secondaryAction} variant="secondary" />
      </div>
      <FactList
        facts={[
          { term: "Based in", detail: profile.location },
          { term: "Right to work", detail: profile.rightToWork },
          { term: "Availability", detail: profile.availability },
        ]}
      />
    </Container>
  );
}
