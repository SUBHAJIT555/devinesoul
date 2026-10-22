import Image from "next/image";
import { ContactBand, HomeFaq } from "@/components/home-sections";
import { ServiceBook } from "@/components/service-book";
import { Button, PhoneIcon, PointGrid, Reveal, WhatsAppIcon } from "@/components/ui";
import { getCourses, getServices, withChannels } from "@/lib/content";
import { courseEnquiry, serviceEnquiry } from "@/lib/whatsapp";
import type { ResolvedGroup } from "@/lib/types";

const washes = ["bg-[#dff2fe]", "bg-[#ffedd4]", "bg-[#ece9fe]"] as const;

export function GroupPage({ group }: { group: ResolvedGroup }) {
  const root = group.kind === "service" ? "/services" : "/courses";
  const kindLabel = group.kind === "service" ? "Services" : "Courses";
  const sittingLabel = group.kind === "service" ? "sitting" : "course";
  const whatsapp = group.kind === "service" ? serviceEnquiry(group.title) : courseEnquiry(group.title);
  const source = group.kind === "service" ? getServices() : getCourses();
  const brief =
    group.kind === "service"
      ? getServices().features.find((feature) => feature.id === group.id)?.body ?? group.summary
      : getCourses().items.find((item) => item.id === group.id)?.body ?? group.summary;

  return (
    <main>
      <section className="bg-white px-6 pb-6 pt-[140px] sm:pt-[150px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">{kindLabel}</p>
          <h1 className="mt-3 text-balance text-[clamp(36px,6vw,56px)] font-medium leading-[1.1] tracking-[-0.04em] text-ink">
            {group.title}
          </h1>
        </div>
      </section>

      <section className="bg-white px-6 pb-14">
        <div className="mx-auto max-w-[1000px]">
          <p className="max-w-2xl text-[17px] leading-7 tracking-[-0.015em] text-zinc-600">{brief}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="tel:+917668648224">
              <PhoneIcon />
              Call now
            </Button>
            <Button href={whatsapp} variant="whatsapp" external>
              <WhatsAppIcon />
              WhatsApp
            </Button>
            <ServiceBook
              title={group.title}
              body={brief}
              points={group.items.map((item) => item.title)}
              kind={group.kind}
              label={`Request a ${sittingLabel}`}
              showWhatsapp={false}
              className="flex flex-wrap gap-3"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <h2 className="text-[clamp(26px,3vw,34px)] font-medium leading-[1.2] tracking-[-0.04em] text-ink">
              {group.kind === "service" ? "The sittings" : "The courses"}
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-6 text-zinc-600">
              {group.kind === "service"
                ? "Each sitting has its own method. Choose the one that matches what you are carrying, then request it or write on WhatsApp."
                : "Each course teaches one method. Choose the work you want to hold, then request it or write on WhatsApp."}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {group.items.map((item, index) => {
              const copy = group.kind === "service" ? item.service : item.course;

              return (
                <Reveal key={item.slug} delay={index * 0.04}>
                  <article
                    id={item.slug}
                    className={`scroll-mt-32 flex h-full flex-col rounded-[var(--card-radius)] p-[var(--card-padding)] [--card-radius:30px] [--card-padding:0.75rem] [--card-inner-radius:calc(var(--card-radius)-var(--card-padding))] ${washes[index % washes.length]}`}
                  >
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[var(--card-inner-radius)] bg-white/40">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-3 pb-4 pt-6">
                      <h3 className="text-[24px] font-medium leading-[1.2] tracking-[-0.03em] text-ink">{item.title}</h3>
                      <p className="mt-3 text-[15px] leading-6 text-zinc-600">{copy}</p>
                      {item.points.length ? <PointGrid points={item.points} className="mt-5" /> : null}
                      <div className="mt-auto">
                        <ServiceBook title={item.title} body={copy} points={item.points} kind={group.kind} />
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10">
            <Button href={root} variant="dark">
              All {group.kind === "service" ? "services" : "courses"}
            </Button>
          </div>
        </div>
      </section>
      <ContactBand contact={withChannels(source.contact)} />
      <HomeFaq faq={source.faq} />
    </main>
  );
}
