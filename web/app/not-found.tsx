import Link from "next/link";
import { PageHeader } from "@/components/PageHeader/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="Page not found"
      intro={<Link href="/">Back to the home page</Link>}
    />
  );
}
