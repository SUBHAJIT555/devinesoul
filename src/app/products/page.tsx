import type { Metadata } from "next";
import { PageClose, PageHero } from "@/components/page-hero";
import { Check, Reveal } from "@/components/ui";
import { getProducts } from "@/lib/content";

const wash = {
  blue: "bg-[#dff2fe]",
  orange: "bg-[#ffedd4]",
  violet: "bg-[#ece9fe]",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProducts();
  return { title: page.title, description: page.description };
}

export default async function ProductsPage() {
  const page = await getProducts();

  return (
    <main>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} body={page.hero.body} />
      <section className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          {page.items.map((item, index) => (
            <article key={item.name} className="grid items-center gap-8 rounded-[32px] bg-white lg:grid-cols-2">
              <Reveal className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className={`flex min-h-[320px] items-end rounded-[28px] p-8 ${wash[item.tone]}`}>
                  <div className="w-full rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(24,24,27,0.06)]">
                    <p className="text-[13px] font-medium text-zinc-500">Product</p>
                    <p className="mt-6 text-[28px] font-medium tracking-[-0.04em]">{item.name}</p>
                    <div className="mt-4 h-2 w-24 rounded-full bg-accent" />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="text-[clamp(32px,4vw,44px)] font-medium leading-[1.15] tracking-[-0.03em]">{item.name}</h2>
                <p className="mt-4 max-w-md text-[16px] leading-7 text-zinc-600">{item.summary}</p>
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
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em]">{page.specs.title}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {page.specs.items.map((item) => (
              <article key={item.title} className="rounded-3xl bg-mist p-6">
                <h3 className="text-[18px] font-medium tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-zinc-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageClose title={page.closing.title} body={page.closing.body} cta={page.closing.cta} href={page.closing.href} />
    </main>
  );
}
