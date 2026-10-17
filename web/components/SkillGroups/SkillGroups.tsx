import type { SkillGroup } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import { Icon } from "@/lib/icons";
import styles from "./SkillGroups.module.css";

export function SkillGroups({ groups, evidenceLabel }: { groups: SkillGroup[]; evidenceLabel: string }) {
  return (
    <div className={styles.grid}>
      {groups.map((group) => (
        <section key={group.name} className={styles.group}>
          <h3 className={styles.name}>
            <span className={styles.icon}>
              <Icon name={group.icon} size={18} />
            </span>
            {group.name}
          </h3>
          <ul className={styles.items}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.evidence}>
            <span className={styles.evidenceLabel}>{evidenceLabel}:</span>{" "}
            {group.evidence.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? ", " : null}
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </span>
            ))}
          </p>
        </section>
      ))}
    </div>
  );
}
