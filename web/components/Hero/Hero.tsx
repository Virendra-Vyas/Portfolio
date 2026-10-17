import type { AnyLink, CaseStudy, Fact, HomePage, Profile } from "@/content/schema";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Container } from "@/components/Container/Container";
import { FactList } from "@/components/FactList/FactList";
import { InkBand } from "@/components/InkBand/InkBand";
import { StatusBoard } from "@/components/StatusBoard/StatusBoard";
import styles from "./Hero.module.css";

type HeroProps = {
  name: string;
  profile: Profile;
  facts: Fact[];
  studies: CaseStudy[];
  board: HomePage["board"];
  primaryAction: AnyLink;
  secondaryAction: AnyLink;
  cvAction: AnyLink;
};

export function Hero({ name, profile, facts, studies, board, primaryAction, secondaryAction, cvAction }: HeroProps) {
  return (
    <InkBand>
      <Container className={styles.grid}>
        <div className={styles.copy}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.headline}>{profile.hero.headline}</p>
          <p className={styles.summary}>{profile.hero.summary}</p>
          <div className={styles.actions}>
            <ButtonLink link={primaryAction} variant="onInk" />
            <ButtonLink link={secondaryAction} variant="onInkSecondary" />
            <ButtonLink link={cvAction} variant="onInkSecondary" />
          </div>
        </div>
        <StatusBoard studies={studies} copy={board} />
        <div className={styles.facts}>
          <FactList facts={facts} tone="ink" />
        </div>
      </Container>
    </InkBand>
  );
}
