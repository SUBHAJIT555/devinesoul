import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about-hero";
import { Bento, ContactBand, HomeFaq, Spotlight } from "@/components/home-sections";
import { Button, Check, Reveal } from "@/components/ui";
import { getAbout, getHome, getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAbout();
  return { title: page.title, description: page.description };
}

export default async function AboutPage() {
  const page = await getAbout();
  const home = await getHome();
  const site = getSite();

  return (
    <main>
      <AboutHero hero={page.hero} tone="about" />
      <section className="bg-white px-6 pb-12 pt-16">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-28">
          {page.features.map((feature) => {
            const reversed = feature.align === "right";
            const textCol = reversed ? "lg:col-start-2" : "lg:col-start-1";
            const imageCol = reversed ? "lg:col-start-1" : "lg:col-start-2";

            return (
              <article
                key={feature.title}
                className={`grid grid-cols-1 items-start lg:items-center lg:justify-between lg:gap-x-[60px] ${
                  reversed
                    ? "lg:grid-cols-[minmax(0,420px)_minmax(0,405px)]"
                    : "lg:grid-cols-[minmax(0,405px)_minmax(0,420px)]"
                }`}
              >
                <Reveal className={`order-1 ${textCol} lg:row-start-1`}>
                  <h2 className="max-w-md text-[clamp(26px,3vw,34px)] font-normal leading-[1.2] tracking-[-0.04em] text-ink">
                    {feature.title}
                  </h2>
                </Reveal>
                <Reveal
                  delay={0.08}
                  className={`order-2 mt-8 w-full lg:order-none lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center ${imageCol}`}
                >
                  <div
                    className={`relative aspect-[1.12766] w-full overflow-hidden rounded-[30px] shadow-[inset_0_0_28px_#fff] ${feature.tone === "violet" ? "bg-[#ece9fe]" : "bg-[#dff2fe]"}`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 420px, calc(100vw - 48px)"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <Reveal className={`order-3 mt-8 lg:mt-4 ${textCol} lg:row-start-2`}>
                  <div className="max-w-md space-y-4">
                    {feature.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[16px] leading-6 text-zinc-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {feature.actions.map((action) => (
                      <Button key={action.label} href={action.href} variant={action.variant} external={action.external}>
                        {action.variant === "whatsapp" ? (
                          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.9c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.49.24.57.82 1.98.89 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z"
                            />
                          </svg>
                        ) : null}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em] text-ink lg:text-center">
              {page.conquests.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {page.conquests.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article
                  className={`flex h-full flex-col rounded-[30px] p-3 ${
                    item.tone === "violet" ? "bg-[#ece9fe]" : item.tone === "peach" ? "bg-[#ffedd4]" : "bg-[#dff2fe]"
                  }`}
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[22px]">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={`object-cover ${item.tone === "violet" ? "object-[center_22%]" : "object-center"}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
                    <h3 className="text-[26px] font-medium leading-[1.2] tracking-[-0.04em] text-ink">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-6 text-zinc-600">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Spotlight
        spotlight={{
          title: page.story.title,
          aside: page.story.aside,
          mark: site.name,
          actions: [
            { label: site.cta.label, href: site.cta.href, variant: "primary" },
            { label: "Products", href: "/products", variant: "secondary" },
          ],
        }}
      />
      <Bento bento={{ eyebrow: "", title: page.values.title, items: page.values.items }} />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="lg:text-center">
            <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em]">{page.path.title}</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-6 text-zinc-600 lg:mx-auto">{page.path.body}</p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-[radial-gradient(50%_50%,#d8d8d8_0%,#fff_100%)] md:grid-cols-3">
            {page.path.items.map((item, index) => (
              <Reveal key={item.index} delay={index * 0.04} className="h-full bg-white">
                <article className={`flex h-full flex-col py-8 ${index === 0 ? "md:pr-8" : "md:px-8"}`}>
                  {item.figure ? (
                    <p className="text-[56px] font-medium leading-none tracking-[-0.04em] text-ink">{item.figure}</p>
                  ) : null}
                  <h3
                    className={`font-medium tracking-[-0.03em] text-ink ${item.figure ? "mt-4 text-[18px]" : "max-w-[16ch] text-[32px] leading-[1.15]"}`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-6 text-zinc-500">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="lg:text-center">
            <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
              {page.purpose.title}
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-6 text-zinc-600 lg:mx-auto">{page.purpose.body}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {page.purpose.items.map((item, index) => {
              const dark = item.tone === "dark";
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article
                    className={`flex h-full flex-col rounded-[28px] p-8 ${dark ? "bg-[#27272a] text-white" : "border border-black/8 bg-mist"}`}
                  >
                    <h3 className="text-[22px] font-medium tracking-[-0.03em]">{item.title}</h3>
                    <p className={`mt-4 text-[16px] leading-6 ${dark ? "text-white/70" : "text-zinc-600"}`}>{item.body}</p>
                    <ul className="mt-8 space-y-3">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-6">
                          <Check light={dark} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
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
