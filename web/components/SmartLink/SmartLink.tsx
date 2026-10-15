import Link from "next/link";
import type { ReactNode } from "react";
import type { AnyLink } from "@/content/schema";

type SmartLinkProps = {
  href: AnyLink["href"];
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** A path ending in a file extension (/og.png, /api/openapi.json) is a file, not a page. */
const isFile = (href: string) => /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);

/** Internal pages use client-side navigation; files, external and mailto links are plain anchors. */
export function SmartLink({ href, children, className, ...rest }: SmartLinkProps) {
  if (href.startsWith("/") && !isFile(href)) {
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
