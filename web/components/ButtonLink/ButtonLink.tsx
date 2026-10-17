import type { AnyLink } from "@/content/schema";
import { SmartLink } from "@/components/SmartLink/SmartLink";
import { LinkIcon } from "@/lib/icons";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  link: AnyLink;
  variant?: "primary" | "secondary" | "inverse";
};

export function ButtonLink({ link, variant = "primary" }: ButtonLinkProps) {
  return (
    <SmartLink href={link.href} className={`${styles.button} ${styles[variant]}`}>
      <LinkIcon href={link.href} />
      {link.label}
    </SmartLink>
  );
}
