import type { Metadata } from "next";
import { CourseBoard } from "@/components/course-board";
import { PageClose, PageHero } from "@/components/page-hero";
import { getCourses } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCourses();
  return { title: page.title, description: page.description };
}

export default async function CoursesPage() {
  const page = await getCourses();

  return (
    <main>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} body={page.hero.body} />
      <CourseBoard filters={page.filters} items={page.items} />
      <PageClose title={page.closing.title} body={page.closing.body} cta={page.closing.cta} href={page.closing.href} />
    </main>
  );
}
