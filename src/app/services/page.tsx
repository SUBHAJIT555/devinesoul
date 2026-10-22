import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about-hero";
import { CourseCards } from "@/components/course-cards";
import { ContactBand, HomeFaq } from "@/components/home-sections";
import { ServiceBook } from "@/components/service-book";
import { Check, Reveal } from "@/components/ui";
import { getCourses, getHome, getServices, offeringMarquee } from "@/lib/content";

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
  const courses = await getCourses();
  const home = await getHome();

  return (
    <main>
      <AboutHero
        hero={page.hero}
        tone="services"
        marqueeRows={[
          offeringMarquee(page.features, "Service", (id) => `#${id}`),
          offeringMarquee(courses.items, "Course", (id) => `#course-${id}`),
        ]}
      />
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
          {page.features.map((feature) => {
            const reversed = feature.align === "right";
            const textCol = reversed ? "lg:col-start-2" : "lg:col-start-1";
            const imageCol = reversed ? "lg:col-start-1" : "lg:col-start-2";

            return (
              <article
                key={feature.id}
                id={feature.id}
                className={`grid scroll-mt-32 grid-cols-1 items-start rounded-[30px] p-4 sm:p-6 lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:p-8 ${wash[feature.tone]}`}
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
                  <div className="relative aspect-[1.35] w-full overflow-hidden rounded-[22px] bg-white/40">
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
                  <p className="max-w-md text-[16px] leading-6 text-zinc-600">{feature.body}</p>
                  {feature.points.length ? (
                    <ul className="mt-6 max-w-md space-y-3">
                      {feature.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-6 text-ink">
                          <Check />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <ServiceBook title={feature.title} body={feature.body} points={feature.points} />
                </Reveal>
              </article>
            );
          })}
          </div>
        </div>
      </section>
      <section id="courses" className="scroll-mt-32 bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <span className="inline-flex rounded-md border-b border-white bg-mist px-3 py-3 text-[12px] font-normal leading-none text-black shadow-md">
              {courses.hero.eyebrow}
            </span>
            <h2 className="max-w-3xl text-balance text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
              {courses.hero.title}
            </h2>
            <p className="max-w-xl text-[16px] leading-6 text-zinc-600">{courses.hero.body}</p>
          </Reveal>
          <CourseCards items={courses.items} />
        </div>
      </section>
      <ContactBand contact={home.contact} />
      <HomeFaq faq={home.faq} />
    </main>
  );
}
