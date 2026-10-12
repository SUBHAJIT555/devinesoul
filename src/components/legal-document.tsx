import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Button, Reveal, WhatsAppIcon } from "@/components/ui";
import legalData from "@/data/legal.json";

type LegalKey = keyof typeof legalData;

type LegalBlock = {
  title: string;
  paragraphs?: string[];
  points?: string[];
};

type LegalPage = {
  title: string;
  description: string;
  updated: string;
  hero: { eyebrow: string; title: string; body: string };
  sections: LegalBlock[];
};

export function legalMetadata(key: LegalKey): Metadata {
  const page = legalData[key] as LegalPage;
  return { title: page.title, description: page.description };
}

export function LegalDocument({ pageKey }: { pageKey: LegalKey }) {
  const page = legalData[pageKey] as LegalPage;

  return (
    <main>
      <PageHero eyebrow="" title={page.hero.title} body={page.hero.body} width="max-w-4xl" align="center" />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center font-meta text-[12px] leading-[18px] text-zinc-500">Last updated: {page.updated}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pb-10">
            <Button href="/contacts">Contact us now</Button>
            <Button href="https://wa.me/917668648224" variant="whatsapp" external>
              <WhatsAppIcon />
              Chat on WhatsApp
            </Button>
          </div>
          <div className="border-b border-black/8">
            {page.sections.map((section) => (
              <Reveal key={section.title}>
                <article id={anchor(section.title)} className="scroll-mt-32 border-t border-black/8 py-10">
                  <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.03em] text-ink">{section.title}</h2>
                  <Block paragraphs={section.paragraphs} points={section.points} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Block({ paragraphs, points }: { paragraphs?: string[]; points?: string[] }) {
  return (
    <>
      {paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-[16px] leading-7 text-zinc-600">
          {paragraph}
        </p>
      ))}
      {points?.length ? (
        <ul className="mt-5 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-[16px] leading-6 text-zinc-600">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00a7f5]" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function anchor(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
