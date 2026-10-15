"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/schema";
import styles from "./NavLinks.module.css";

/** Nav hrefs end in "/" (trailingSlash export), so a prefix match also covers child pages. */
function isCurrent(pathname: string, href: string) {
  const normalised = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return normalised.startsWith(href);
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? "/";

  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const current = isCurrent(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.link}
              aria-current={current ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
