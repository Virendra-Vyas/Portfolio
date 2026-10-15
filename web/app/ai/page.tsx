import type { Metadata } from "next";
import { ai } from "@/content/ai";
import { Container } from "@/components/Container/Container";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { PracticeList } from "@/components/PracticeList/PracticeList";
import styles from "./page.module.css";

export const metadata: Metadata = { title: ai.title, description: ai.intro };

export default function AiPage() {
  return (
    <>
      <PageHeader title={ai.title} intro={ai.intro} />
      <Container className={styles.body}>
        <PracticeList practices={ai.practices} />
      </Container>
    </>
  );
}
