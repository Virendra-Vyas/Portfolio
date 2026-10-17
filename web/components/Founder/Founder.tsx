import Link from "next/link";
import type { HomePage } from "@/content/schema";
import { FactList } from "@/components/FactList/FactList";
import { Icon } from "@/lib/icons";
import styles from "./Founder.module.css";

/**
 * My company, and what has been built through it. Own products wear the "my company" colour and client
 * work the "freelance" colour, as on the career trace.
 */
export function Founder({ founder }: { founder: HomePage["founder"] }) {
  return (
    <div className={styles.founder}>
      <div className={`${styles.company} kind-company`} data-reveal>
        <span className={styles.badge}>
          <Icon name="building" size={26} />
        </span>
        <p className={styles.name}>{founder.company}</p>
        <FactList facts={founder.facts} />
      </div>
      <div>
        <h3 className={styles.label}>{founder.venturesLabel}</h3>
        <ul className={styles.ventures}>
          {founder.ventures.map((venture, index) => (
            <li
              key={venture.name}
              className={`${styles.venture} kind-${venture.kind}`}
              data-reveal
              style={{ ["--reveal-i" as string]: index + 1 }}
            >
              <span className={styles.icon}>
                <Icon name={venture.icon} size={22} />
              </span>
              <div className={styles.text}>
                <p className={styles.kind}>{venture.label}</p>
                <h4 className={styles.title}>
                  <Link href={venture.href} className={styles.link}>
                    {venture.name}
                  </Link>
                </h4>
                <p className={styles.role}>{venture.role}</p>
                <p className={styles.detail}>{venture.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
