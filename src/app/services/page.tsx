import type { Metadata } from "next";
import { PageClose, PageHero } from "@/components/page-hero";
import { Check, Reveal } from "@/components/ui";
import { getServices } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServices();
  return { title: page.title, description: page.description };
}

export default async function ServicesPage() {
  const page = await getServices();

  return (
    <main>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} body={page.hero.body} />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ol className="space-y-2">
              {page.items.map((item) => (
                <li key={item.index}>
                  <a href={`#service-${item.index}`} className="flex items-baseline gap-3 rounded-2xl px-3 py-2 text-[15px] hover:bg-mist">
                    <span className="font-meta text-[12px] tracking-normal text-zinc-400">{item.index}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-20">
            {page.items.map((item) => (
              <article key={item.index} id={`service-${item.index}`} className="scroll-mt-32">
                <Reveal>
                  <p className="font-meta text-[13px] tracking-normal text-zinc-400">{item.index}</p>
                  <h2 className="mt-3 max-w-xl text-[clamp(32px,4vw,44px)] font-medium leading-[1.18] tracking-[-0.03em]">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-[16px] leading-7 text-zinc-600">{item.body}</p>
                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[15px] leading-6">
                        <Check />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em]">
              {page.method.title}
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-6 text-zinc-600">{page.method.body}</p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {page.method.items.map((item) => (
              <article key={item.index}>
                <p className="font-meta text-[13px] tracking-normal text-zinc-400">{item.index}</p>
                <h3 className="mt-3 text-[24px] font-normal tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-zinc-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageClose title={page.closing.title} body={page.closing.body} cta={page.closing.cta} href={page.closing.href} />
    </main>
  );
}
