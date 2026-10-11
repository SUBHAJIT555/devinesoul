import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import legalData from "@/data/legal.json";

type LegalKey = keyof typeof legalData;

type LegalPage = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; body: string };
  sections: { title: string; paragraphs: string[] }[];
};

export function legalMetadata(key: LegalKey): Metadata {
  const page = legalData[key] as LegalPage;
  return { title: page.title, description: page.description };
}

export function LegalDocument({ pageKey }: { pageKey: LegalKey }) {
  const page = legalData[pageKey] as LegalPage;

  return (
    <main>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} body={page.hero.body} />
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-10">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-[22px] font-medium tracking-[-0.03em] text-ink">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-[16px] leading-6 text-zinc-600">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
          </div>
        </div>
      </section>
    </main>
  );
}
