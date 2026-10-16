import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHeader } from "@/components/PageHeader/PageHeader";

export const metadata: Metadata = { title: site.notFound.title };

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title={site.notFound.title}
      intro={<Link href="/">{site.notFound.linkLabel}</Link>}
    />
  );
}
