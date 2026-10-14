import { site } from "@/content/site";
import { PageHeader } from "@/components/PageHeader/PageHeader";

// Placeholder until build step 5 renders the home page from /content.
export default function Home() {
  return <PageHeader title={site.name} eyebrow={site.role} />;
}
