import type { AnyLink } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  link: AnyLink;
  variant?: "primary" | "secondary" | "onInk" | "onInkSecondary";
};

export function ButtonLink({ link, variant = "primary" }: ButtonLinkProps) {
  return (
    <SmartLink href={link.href} className={`${styles.button} ${styles[variant]}`}>
      {link.label}
    </SmartLink>
  );
}
