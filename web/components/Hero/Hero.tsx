import type { AnyLink, Fact, HomePage, Profile } from "@/content/schema";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Container } from "@/components/Container/Container";
import { FactList } from "@/components/FactList/FactList";
import { Stats } from "@/components/Stats/Stats";
import { TechMarquee } from "@/components/TechMarquee/TechMarquee";
import { Trace } from "@/components/Trace/Trace";
import { buildTrace } from "@/lib/trace";
import styles from "./Hero.module.css";

type HeroProps = {
  name: string;
  profile: Profile;
  facts: Fact[];
  home: HomePage;
  primaryAction: AnyLink;
  secondaryAction: AnyLink;
  cvAction: AnyLink;
};

export function Hero({ name, profile, facts, home, primaryAction, secondaryAction, cvAction }: HeroProps) {
  // Built when the site is built, so "present" means the month of the latest deploy.
  const data = buildTrace();
  const current = data.spans.find((span) => span.current && span.kind === "employment") ?? data.spans[0];

  return (
    <header className={styles.hero}>
      <Container>
        <p className={styles.status}>
          <span className={styles.pulse} aria-hidden="true" />
          {profile.availability}
        </p>
        <div className={styles.top}>
          <h1 className={styles.name}>
            {name.split(" ").map((word, index, words) => (
              <span key={word} className={styles.word}>
                {word}
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
        </div>
        <div className={styles.intro}>
          <p className={styles.headline}>{profile.hero.headline}</p>
          <div className={styles.side}>
            <p className={styles.summary}>{profile.hero.summary}</p>
            <div className={styles.actions}>
              <ButtonLink link={primaryAction} variant="primary" />
              <ButtonLink link={secondaryAction} variant="secondary" />
              <ButtonLink link={cvAction} variant="secondary" />
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <Stats items={home.stats} label={home.statsLabel} />
        </div>
      </Container>
      <div className={styles.marquee}>
        <TechMarquee items={home.marquee} label={home.marqueeLabel} />
      </div>
      <Container>
        <div className={styles.facts}>
          <FactList facts={facts} />
        </div>
        <div className={styles.trace} data-reveal>
          <Trace trace={data} copy={home.trace} initialId={current.id} />
        </div>
      </Container>
    </header>
  );
}
