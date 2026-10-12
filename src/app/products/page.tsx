import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about-hero";
import { ContactBand, HomeFaq } from "@/components/home-sections";
import { ProductOrder } from "@/components/product-order";
import { Check, Reveal } from "@/components/ui";
import { getHome, getProducts } from "@/lib/content";

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
  const home = await getHome();

  return (
    <main>
      <AboutHero hero={page.hero} />
      <section className="bg-white px-6 pb-8 pt-8">
        <div className="mx-auto flex max-w-[1000px] flex-col">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex rounded-md border-b border-white bg-mist px-3 py-3 text-[12px] font-normal leading-none text-black shadow-md">
              {page.intro.chip}
            </span>
            <h2 className="max-w-[700px] text-balance text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
              {page.intro.title}
            </h2>
          </Reveal>
          <div className="mt-16 flex flex-col gap-6">
            {page.items.map((item) => {
              const reversed = item.align === "right";
              const textCol = reversed ? "lg:col-start-2" : "lg:col-start-1";
              const imageCol = reversed ? "lg:col-start-1" : "lg:col-start-2";

              return (
                <article
                  key={item.name}
                  id={item.name.toLowerCase().replaceAll(" ", "-")}
                  className={`grid scroll-mt-32 grid-cols-1 items-start rounded-[30px] p-4 sm:p-6 lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:p-8 ${wash[item.tone]}`}
                >
                  <Reveal className={`order-1 ${textCol} lg:row-start-1`}>
                    <h2 className="max-w-md text-[clamp(26px,3vw,34px)] font-normal leading-[1.2] tracking-[-0.04em] text-ink">{item.name}</h2>
                  </Reveal>
                  <Reveal
                    delay={0.08}
                    className={`order-2 mt-8 w-full lg:order-none lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center ${imageCol}`}
                  >
                    <div className="relative aspect-[1.35] w-full overflow-hidden rounded-[22px] bg-white/40">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 420px, calc(100vw - 48px)"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                  <Reveal className={`order-3 mt-8 lg:mt-4 ${textCol} lg:row-start-2`}>
                    <p className="max-w-md text-[16px] leading-6 text-zinc-600">{item.summary}</p>
                    <ul className="mt-6 max-w-md space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-6 text-ink">
                          <Check />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <ProductOrder name={item.name} summary={item.summary} points={item.points} />
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ContactBand contact={home.contact} />
      <HomeFaq faq={home.faq} />
    </main>
  );
}
