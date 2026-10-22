import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about-hero";
import { Bento, ContactBand, HomeFaq, Spotlight } from "@/components/home-sections";
import MorphGallery from "@/components/morph-gallery";
import { Button, Check, ExploreIcon, Reveal, WhatsAppIcon } from "@/components/ui";
import { getAbout, getSite, withChannels } from "@/lib/content";
import type { AboutContent } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAbout();
  return { title: page.title, description: page.description };
}

export default async function AboutPage() {
  const page = await getAbout();
  const site = getSite();

  return (
    <main>
      <AboutHero hero={page.hero} tone="about" />
      <section className="bg-white px-6 pb-12 pt-16">
        <div className="mx-auto max-w-[1000px]">
          <FeatureArticle feature={page.features[0]} />
        </div>
      </section>
      <AboutGallery gallery={page.gallery} />
      <section className="bg-white px-6 pb-12 pt-16">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-28">
          {page.features.slice(1).map((feature) => (
            <FeatureArticle key={feature.title} feature={feature} />
          ))}
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
            { label: "Contact Now", href: "/contacts", variant: "primary" },
            { label: "WhatsApp", href: "https://wa.me/917668648224", variant: "whatsapp" },
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
                  {item.actions?.length ? (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {item.actions.map((action) => (
                        <Button key={action.label} href={action.href} variant={action.variant} external={action.external}>
                          {action.variant === "whatsapp" ? <WhatsAppIcon /> : null}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  ) : null}
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
      <ContactBand contact={withChannels(page.contact)} />
      <HomeFaq faq={page.faq} />
    </main>
  );
}

function FeatureArticle({ feature }: { feature: AboutContent["features"][number] }) {
  const reversed = feature.align === "right";
  const textCol = reversed ? "lg:col-start-2" : "lg:col-start-1";
  const imageCol = reversed ? "lg:col-start-1" : "lg:col-start-2";

  return (
    <article
      className={`grid grid-cols-1 items-start lg:items-center lg:justify-between lg:gap-x-[60px] ${
        reversed ? "lg:grid-cols-[minmax(0,420px)_minmax(0,405px)]" : "lg:grid-cols-[minmax(0,405px)_minmax(0,420px)]"
      }`}
    >
      <Reveal className={`order-1 ${textCol} lg:row-start-1`}>
        <h2 className="max-w-md text-[clamp(26px,3vw,34px)] font-normal leading-[1.2] tracking-[-0.04em] text-ink">
          {feature.title}
        </h2>
      </Reveal>
      <Reveal delay={0.08} className={`order-2 mt-8 w-full lg:order-none lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center ${imageCol}`}>
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
              {action.href === "/services" ? <ExploreIcon /> : null}
              {action.variant === "whatsapp" ? <WhatsAppIcon /> : null}
              {action.label}
            </Button>
          ))}
        </div>
      </Reveal>
    </article>
  );
}

function AboutGallery({ gallery }: { gallery: AboutContent["gallery"] }) {
  return (
    <section className="bg-white px-6 pb-8 pt-4">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
            {gallery.title}
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-zinc-600">{gallery.body}</p>
        </Reveal>
        <div className="relative mt-10 w-full overflow-hidden rounded-[30px]">
          <MorphGallery items={gallery.items} height="min(68svh, 640px)" autoplay={4500} />
        </div>
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={gallery.href}>{gallery.cta}</Button>
          <Button href={gallery.whatsappHref} variant="whatsapp" external>
            <WhatsAppIcon />
            {gallery.whatsapp}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
