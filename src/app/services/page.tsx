import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about-hero";
import { ContactBand, HomeFaq } from "@/components/home-sections";
import { Button, ExploreIcon, Lines, PointGrid, Reveal, WhatsAppIcon } from "@/components/ui";
import { catalogMarquee, getServices, offeringHref, withChannels } from "@/lib/content";
import { serviceEnquiry } from "@/lib/whatsapp";

const wash = {
  blue: "bg-[#dff2fe]",
  violet: "bg-[#ece9fe]",
  peach: "bg-[#ffedd4]",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServices();
  return { title: page.title, description: page.description };
}

export default async function ServicesPage() {
  const page = await getServices();

  return (
    <main>
      <AboutHero
        hero={page.hero}
        tone="services"
        marqueeRows={[catalogMarquee("service")]}
      />
      <section className="bg-white px-6 pb-20 pt-8">
        <div className="mx-auto flex max-w-[1000px] flex-col">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex rounded-md border-b border-white bg-mist px-3 py-3 text-[12px] font-normal leading-none text-black shadow-md">
              {page.intro.chip}
            </span>
            <h2 className="max-w-[700px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
              <Lines text={page.intro.title} />
            </h2>
          </Reveal>
          <div className="mt-16 flex flex-col gap-6">
            {page.features.map((feature) => {
              const reversed = feature.align === "right";
              const textCol = reversed ? "lg:col-start-2" : "lg:col-start-1";
              const imageCol = reversed ? "lg:col-start-1" : "lg:col-start-2";

              return (
                <article
                  key={feature.id}
                  id={feature.id}
                  className={`grid scroll-mt-32 grid-cols-1 items-start rounded-[var(--card-radius)] p-[var(--card-padding)] lg:grid-cols-2 lg:items-center lg:gap-x-10 [--card-radius:30px] [--card-padding:1rem] sm:[--card-padding:1.5rem] lg:[--card-padding:2rem] [--card-inner-radius:max(16px,calc(var(--card-radius)-var(--card-padding)))] ${wash[feature.tone]}`}
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
                    <div className="relative aspect-[1.35] w-full overflow-hidden rounded-[var(--card-inner-radius)] bg-white/40">
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
                    <p className="max-w-lg text-[16px] leading-6 text-zinc-600">{feature.body}</p>
                    {feature.points.length ? <PointGrid points={feature.points} className="mt-5" /> : null}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href={offeringHref("service", feature.title)}>
                        <ExploreIcon />
                        See this sitting
                      </Button>
                      <Button href={serviceEnquiry(feature.title)} variant="whatsapp" external>
                        <WhatsAppIcon />
                        WhatsApp
                      </Button>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ContactBand contact={withChannels(page.contact)} />
      <HomeFaq faq={page.faq} />
    </main>
  );
}
