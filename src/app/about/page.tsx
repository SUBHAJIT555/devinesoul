import type { Metadata } from "next";
import { Closing, Plans, Ribbon } from "@/components/home-sections";
import { PageClose, PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/ui";
import { getAbout, getHome } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAbout();
  return { title: page.title, description: page.description };
}

export default async function AboutPage() {
  const page = await getAbout();
  const home = await getHome();

  return (
    <main>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} body={page.hero.body} />
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="text-[clamp(28px,3vw,40px)] font-medium leading-[1.2] tracking-[-0.03em]">{page.story.title}</h2>
            <div className="mt-6 space-y-4">
              {page.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-xl text-[16px] leading-7 text-zinc-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="rounded-[28px] bg-mist p-8 text-[24px] font-normal leading-[1.35] tracking-[-0.03em]">
              {page.story.aside}
            </blockquote>
          </Reveal>
        </div>
      </section>
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em]">
              {page.values.title}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.values.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full rounded-[28px] border border-black/8 p-7">
                  <h3 className="text-[22px] font-medium tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-6 text-zinc-600">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em]">{page.path.title}</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-6 text-zinc-600">{page.path.body}</p>
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {page.path.items.map((item) => (
              <li key={item.index}>
                <p className="font-meta text-[13px] tracking-normal text-zinc-400">{item.index}</p>
                <h3 className="mt-3 text-[28px] font-normal tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-zinc-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Plans plans={home.plans} />
      <Ribbon items={home.ribbon} />
      <Closing closing={home.closing} />
      <PageClose title={page.closing.title} body={page.closing.body} cta={page.closing.cta} href={page.closing.href} />
    </main>
  );
}
