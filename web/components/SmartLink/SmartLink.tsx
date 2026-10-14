import Link from "next/link";
import type { ReactNode } from "react";
import type { AnyLink } from "@/content/schema";

type SmartLinkProps = {
  href: AnyLink["href"];
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** Internal paths use client-side navigation; external and mailto links are plain anchors. */
export function SmartLink({ href, children, className, ...rest }: SmartLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("https://");
  return (
    <a
      href={href}
      className={className}
      {...(external ? { rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
