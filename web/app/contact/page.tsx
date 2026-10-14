import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/PageHeader/PageHeader";

// Placeholder: real page arrives in a later build step.
const label = site.nav.find((item) => item.href === "/contact/")?.label ?? "";

export const metadata: Metadata = { title: label };

export default function Page() {
  return <PageHeader title={label} />;
}
