import Image from "next/image";
import type { HomeContent } from "@/lib/types";
import { Button, Check, Lines, Reveal, SectionHeading } from "@/components/ui";
import { Compare } from "@/components/compare";
import { FaqList } from "@/components/faq-list";

const stage: Record<HomeContent["stories"][number]["tone"], string> = {
  blue: "bg-[#dff2fe]",
  orange: "bg-[#ffedd4]",
  violet: "bg-[#ece9fe]",
};

const badge: Record<HomeContent["stories"][number]["tone"], string> = {
  blue: "bg-[#dff2fe] text-accent-deep",
  orange: "bg-[#ffedd4] text-[#c2410c]",
  violet: "bg-[#ece9fe] text-[#6d28d9]",
};

export function LogoRow({ logos }: { logos: HomeContent["logos"] }) {
  const names = Array.from({ length: 4 }, () => logos.names).flat();

  return (
    <section className="bg-white pb-2 pt-6 md:pt-10 lg:pt-14">
      <p className="text-center text-[20px] text-zinc-500">{logos.label}</p>
      <div className="marquee-mask mt-4 overflow-hidden py-2">
        <div className="marquee-track-slow flex w-max" style={{ animationDuration: "58s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-12 pr-12">
              {names.map((name, index) => (
                <span
                  key={`${copy}-${name}-${index}`}
                  className="whitespace-nowrap py-1 text-[16px] font-medium leading-[1.4] tracking-[-0.03em] text-zinc-400"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Statement({ statement }: { statement: HomeContent["statement"] }) {
  return (
    <section>
      <div className="h-[50px] bg-[#1e1e1f]" aria-hidden="true">
        <div className="h-full rounded-b-[30px] bg-white" />
      </div>
      <div className="flex h-[400px] flex-col items-center justify-center bg-[#1e1e1f] px-6 text-center text-white">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-normal leading-[1.2] tracking-[-0.02em]">
          <Lines text={`${statement.line1}\n${statement.line2}`} />
        </h2>
   
        <div className="mt-10 flex flex-wrap items-start justify-center gap-x-14 gap-y-8">
          {statement.chapters.map((chapter) => (
            <div key={chapter.id} className="flex flex-col items-center gap-3 whitespace-nowrap text-[16px] leading-5 text-[#e8e8ea]">
              <ChapterIcon id={chapter.id} />
              {chapter.label}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[50px] bg-[#1e1e1f]" aria-hidden="true">
        <div className="h-full rounded-t-[30px] bg-white" />
      </div>
    </section>
  );
}

function ChapterIcon({
  id,
  className = "h-11 w-11",
  stroke = "#f7f7f7",
  fill = "#c8c8cc",
}: {
  id: string;
  className?: string;
  stroke?: string;
  fill?: string;
}) {
  const pen = {
    fill: "none" as const,
    stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 16,
  };

  if (id === "readings") {
    return (
      <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
        <path
          d="M210.69 158.18A88 88 0 1 1 97.82 45.31A96.08 96.08 0 0 0 192 160a97 97 0 0 0 18.69-1.82"
          fill={fill}
          opacity="0.85"
        />
        <path
          d="M240 96a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16V72a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8m-96-40h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16m72.77 97a8 8 0 0 1 1.43 8A96 96 0 1 1 95.07 37.8a8 8 0 0 1 10.6 9.06a88.07 88.07 0 0 0 103.47 103.47a8 8 0 0 1 7.63 2.67m-19.39 14.88c-1.79.09-3.59.14-5.38.14A104.11 104.11 0 0 1 88 64c0-1.79 0-3.59.14-5.38a80 80 0 1 0 109.24 109.24Z"
          fill={stroke}
        />
      </svg>
    );
  }

  if (id === "vedic") {
    return (
      <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
        <path d="M66,160a64,64,0,1,1,124,0Z" fill={fill} opacity="0.85" />
        <line x1="240" y1="160" x2="16" y2="160" {...pen} />
        <line x1="208" y1="200" x2="48" y2="200" {...pen} />
        <path d="M66,160a64,64,0,1,1,124,0" {...pen} />
        <line x1="80" y1="40" x2="88" y2="56" {...pen} />
        <line x1="24" y1="96" x2="40" y2="104" {...pen} />
        <line x1="232" y1="96" x2="216" y2="104" {...pen} />
        <line x1="176" y1="40" x2="168" y2="56" {...pen} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
      <path
        d="M88,119.18a108.49,108.49,0,0,1,6.61-38.36v0C81.28,70,68.56,65.79,61,64.18a8.2,8.2,0,0,0-9.52,5.52c-3,9.27-6.58,27.83,1,51.71h0a69.59,69.59,0,0,0-30.82.64,7.94,7.94,0,0,0-5.46,9.78c3,11.2,12.49,33.07,41.72,50.54S112.63,200,128,200C128,200,88,178,88,119.18Z"
        fill={fill}
        opacity="0.85"
      />
      <path
        d="M234.26,122a69.59,69.59,0,0,0-30.82-.64h0c7.63-23.88,4-42.44,1-51.71A8.2,8.2,0,0,0,195,64.18c-7.52,1.61-20.24,5.8-33.56,16.62v0A108.49,108.49,0,0,1,168,119.18C168,178,128,200,128,200c15.37,0,40.77-.18,70-17.64s38.69-39.34,41.72-50.54A7.94,7.94,0,0,0,234.26,122Z"
        fill={fill}
        opacity="0.85"
      />
      <path
        d="M128,200s40-22,40-80.82c0-46-24.55-69.54-35.19-77.56a8,8,0,0,0-9.62,0C112.55,49.64,88,73.14,88,119.18,88,178,128,200,128,200Z"
        {...pen}
      />
      <path
        d="M94.6,80.8C81.28,70,68.56,65.79,61,64.18a8.2,8.2,0,0,0-9.52,5.52c-3.88,12-8.78,39.66,11.11,74.27s53.07,53.4,65.37,56"
        {...pen}
      />
      <path
        d="M161.4,80.8c13.32-10.82,26-15,33.56-16.62a8.2,8.2,0,0,1,9.52,5.52c3.88,12,8.78,39.66-11.11,74.27S140.3,197.37,128,200"
        {...pen}
      />
      <path
        d="M128,200c15.37,0,40.77-.18,70-17.64s38.69-39.34,41.72-50.54a7.94,7.94,0,0,0-5.46-9.78,69.59,69.59,0,0,0-30.82-.64"
        {...pen}
      />
      <path
        d="M52.56,121.4a69.59,69.59,0,0,0-30.82.64,7.94,7.94,0,0,0-5.46,9.78c3,11.2,12.49,33.07,41.72,50.54S112.63,200,128,200"
        {...pen}
      />
    </svg>
  );
}

export function Stories({ stories }: { stories: HomeContent["stories"] }) {
  return (
    <section className="bg-white px-6 pb-12 pt-16">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-28">
        {stories.map((story) => (
          <article
            key={story.id}
            id={story.id}
            className={`scroll-mt-28 flex flex-col items-center gap-10 overflow-visible lg:flex-row lg:justify-between lg:gap-[60px] ${story.align === "right" ? "lg:flex-row-reverse" : ""}`}
          >
            <Reveal className="w-full lg:w-[405px] lg:shrink-0">
              <span className={`inline-flex items-center gap-1.5 rounded-md border-b border-r border-white px-3 py-1 text-[13px] font-semibold shadow-sm ${badge[story.tone]}`}>
                <ChapterIcon id={story.id} className="h-4 w-4" stroke="currentColor" fill="currentColor" />
                {story.badge}
              </span>
              <h3 className="mt-5 max-w-md text-[clamp(26px,3vw,34px)] font-normal leading-[1.2] tracking-[-0.04em] text-ink">
                {story.title}
              </h3>
              <p className="mt-4 max-w-md text-[16px] leading-6 text-zinc-600">{story.intro}</p>
              {story.quote ? (
                <figure className="mt-8 max-w-md border-t border-black/8 pt-6">
                  <blockquote className="text-[16px] leading-6 text-ink">“ {story.quote.text} ”</blockquote>
                  <figcaption className="mt-4 text-[14px] text-zinc-500">
                    {story.quote.role}
                    <span className="mx-2 text-zinc-300">·</span>
                    {story.quote.place}
                  </figcaption>
                </figure>
              ) : null}
              {story.points?.length ? (
                <ul className="mt-8 max-w-md space-y-3">
                  {story.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-6 text-ink">
                      <Check />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
            <Reveal delay={0.08} className="w-full lg:w-[420px] lg:shrink-0">
              <StoryArt tone={story.tone} title={story.title} image={story.image} />
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}

function StoryArt({
  tone,
  title,
  image,
}: {
  tone: HomeContent["stories"][number]["tone"];
  title: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className={`relative aspect-[1.12766] w-full overflow-hidden rounded-[30px] shadow-[inset_0_0_28px_#fff] ${stage[tone]}`}>
        <div className="absolute z-[1] overflow-visible" style={{ width: "102%", height: "102%", top: "-1.05374%", right: "-5px" }}>
          <div className="absolute inset-0" style={{ borderRadius: "inherit" }}>
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, calc(100vw - 48px)"
              className="object-cover"
              style={{ borderRadius: "inherit", objectPosition: "center center" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-[420px] items-center justify-center rounded-[28px] p-6 sm:p-10 ${stage[tone]}`}>
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(24,24,27,0.08)]">
        <div className="flex items-center gap-2 border-b border-black/6 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          <span className="ml-2 text-[12px] text-zinc-400">{title.split(" ").slice(0, 2).join(" ")}</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-28 rounded-xl bg-mist" />
          <div className="h-3 w-4/5 rounded-full bg-zinc-200" />
          <div className="h-3 w-3/5 rounded-full bg-zinc-100" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="h-14 rounded-xl bg-[#dff2fe]" />
            <div className="h-14 rounded-xl bg-[#ffedd4]" />
            <div className="h-14 rounded-xl bg-[#ece9fe]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompareBand({ compare }: { compare: HomeContent["compare"] }) {
  return (
    <section className="bg-white px-5 pb-20 pt-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-20">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-[600px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            {compare.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="w-full rounded-[30px] bg-mist p-5">
          <Compare
            beforeLabel={compare.before}
            afterLabel={compare.after}
            beforeSrc={compare.beforeImage}
            afterSrc={compare.afterImage}
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Bento({ bento }: { bento: HomeContent["bento"] }) {
  return (
    <section id="build" className="scroll-mt-28 bg-white px-6 py-12">
      <div className="mx-auto max-w-[1000px]">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-[640px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            <Lines text={bento.title} />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-[radial-gradient(50%_50%,#d8d8d8_0%,#fff_100%)] sm:grid-cols-2 lg:grid-cols-3">
          {bento.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className="h-full bg-white">
              <article className="flex h-full flex-col gap-4 px-[30px] py-5">
                <FeatureIcon name={item.icon} />
                <div>
                  <h3 className="text-[18px] font-medium leading-[1.2] text-ink">{item.title}</h3>
                  <p className="mt-2 text-[16px] leading-6 text-zinc-500">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const pen = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-400" aria-hidden="true" {...pen}>
      {name === "user-heart" ? (
        <>
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
          <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
        </>
      ) : null}
      {name === "shield-check" ? (
        <>
          <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
          <path d="M15 19l2 2l4 -4" />
        </>
      ) : null}
      {name === "yin-yang" ? (
        <>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 3a4.5 4.5 0 0 0 0 9a4.5 4.5 0 0 1 0 9" />
          <path d="M12 7.5a.5 .5 0 1 0 0 -1a.5 .5 0 0 0 0 1" fill="currentColor" stroke="none" />
          <path d="M12 17.5a.5 .5 0 1 0 0 -1a.5 .5 0 0 0 0 1" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {name === "cards" ? (
        <>
          <path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z" />
          <path d="M15 4h1a1 1 0 0 1 1 1v3.5" />
          <path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" />
        </>
      ) : null}
      {name === "sun" ? (
        <>
          <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </>
      ) : null}
      {name === "route" ? (
        <>
          <path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M19 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" />
        </>
      ) : null}
    </svg>
  );
}

export function Spotlight({ spotlight }: { spotlight: HomeContent["spotlight"] }) {
  return (
    <section>
      <div className="h-[50px] bg-[#0f071c]" aria-hidden="true">
        <div className="h-full rounded-b-[30px] bg-white" />
      </div>
      <div className="bg-[linear-gradient(#0f071c,#085a7a)] px-6 pb-16 pt-10 text-white">
        <Reveal className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-3 text-[14px] font-semibold leading-none">
            {spotlight.eyebrow}
          </span>
          <h2 className="mt-5 max-w-[600px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em]">
            <Lines text={spotlight.title} />
          </h2>
          <p className="mt-5 text-[16px] leading-6 text-white/80">{spotlight.body}</p>
          <ul className="mt-8 space-y-3">
            {spotlight.points.map((point) => (
              <li key={point} className="flex items-center justify-center gap-3 text-[15px] leading-6 text-white/85">
                <Check light />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="h-[50px] bg-[#085a7a]" aria-hidden="true">
        <div className="h-full rounded-t-[30px] bg-white" />
      </div>
    </section>
  );
}

export function Steps({ steps }: { steps: HomeContent["steps"] }) {
  return (
    <section id="share" className="scroll-mt-28 bg-white px-5 pb-24 pt-20">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-20">
        <Reveal className="text-center">
          <h2 className="max-w-[700px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            <Lines text={steps.title} />
          </h2>
        </Reveal>
        {steps.items.map((item, index) => (
          <article
            key={item.index}
            className={`flex w-full flex-col items-center gap-10 lg:flex-row lg:justify-between ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            <Reveal className="w-full lg:w-[405px] lg:shrink-0">
              <p className="text-[14px] font-semibold text-accent-deep">{item.index}</p>
              <h3 className="mt-3 text-[28px] font-normal leading-[1.2] tracking-[-0.05em] text-ink">{item.title}</h3>
              <p className="mt-3 max-w-md text-[16px] leading-6 text-zinc-600">{item.body}</p>
              {index === steps.items.length - 1 ? (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button href="/contacts">Contact us</Button>
                  <Button href="https://wa.me/917668648224" variant="whatsapp" external>
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.9c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.49.24.57.82 1.98.89 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z"
                      />
                    </svg>
                    WhatsApp
                  </Button>
                </div>
              ) : null}
            </Reveal>
            <Reveal delay={0.08} className="w-full max-w-[420px] lg:w-[420px] lg:shrink-0">
              <div className="flex aspect-[535/380] w-full items-center justify-center">
                <img src={item.image} alt="" className="h-full w-full object-contain" />
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Voices({ voices }: { voices: HomeContent["voices"] }) {
  return (
    <section className="overflow-hidden bg-white px-5 pb-16 pt-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-20">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex rounded-md shadow-md border-b border-white bg-mist px-3 py-3 text-[12px] font-normal leading-none text-black">
            From clients
          </span>
          <h2 className="max-w-[700px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            <Lines text={voices.title} />
          </h2>
        </Reveal>
        <div className="flex w-full flex-col items-center">
          <div
            className="h-[540px] w-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(#000 54%, transparent 97%)",
              WebkitMaskImage: "linear-gradient(#000 54%, transparent 97%)",
            }}
          >
            <div className="columns-1 gap-x-5 sm:columns-2 lg:columns-4">
              {voices.items.map((item) => (
                <QuoteCard key={item.role} item={item} />
              ))}
            </div>
          </div>
          <div className="relative z-[1] -mt-4">
            <Button href={voices.href} external>
              {voices.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ item }: { item: HomeContent["voices"]["items"][number] }) {
  return (
    <figure className="mb-2.5 flex break-inside-avoid flex-col gap-5 rounded-xl bg-mist p-5 shadow-[0_8px_19.1px_-7px_rgba(0,0,0,0.06)] border-b border-black/7">
      <blockquote className="text-[14px] leading-[21px] tracking-[-0.03em] text-black">{item.text}</blockquote>
      <figcaption className="flex items-center gap-2">
        {item.image ? (
          <img src={item.image} alt="" className="h-[46px] w-[46px] shrink-0 rounded-full object-cover" />
        ) : null}
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-[16.8px] tracking-[-0.03em] text-black">{item.role}</span>
          <span className="mt-1 block">
            <Stars />
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <span className="inline-flex text-[#f5b301]" aria-label="5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 1.1 7.3 4l3.2.3-2.4 2.1.7 3.1L6 8.1 3.2 9.5l.7-3.1L1.5 4.3 4.7 4 6 1.1Z"
          />
        </svg>
      ))}
    </span>
  );
}

export function Plans({ plans }: { plans: HomeContent["plans"] }) {
  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={plans.title} />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {plans.items.map((plan) => (
            <Reveal key={plan.name}>
              <article className={`flex h-full flex-col rounded-[28px] p-8 ${plan.featured ? "bg-[#27272a] text-white" : "border border-black/8 bg-white"}`}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[22px] font-medium tracking-[-0.03em]">{plan.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-[12px] font-medium ${plan.featured ? "bg-white/10 text-white" : "bg-mist text-zinc-600"}`}>
                    {plan.tag}
                  </span>
                </div>
                <p className="mt-8 flex items-end gap-1">
                  <span className="text-[56px] font-medium leading-none tracking-[-0.04em]">{plan.price}</span>
                  <span className={`mb-1 text-[16px] ${plan.featured ? "text-white/70" : "text-zinc-500"}`}>{plan.unit}</span>
                </p>
                <p className={`mt-3 text-[14px] ${plan.featured ? "text-white/70" : "text-zinc-500"}`}>{plan.cadence}</p>
                <ul className="mt-8 space-y-3">
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-6">
                      <Check light={plan.featured} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href={plan.href} variant={plan.featured ? "primary" : "secondary"}>
                    {plan.cta}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {plans.features.map((feature) => (
            <li key={feature} className="rounded-full bg-mist px-3 py-1.5 text-[13px] text-zinc-600">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const channelTone: Record<HomeContent["contact"]["channels"][number]["tone"], string> = {
  instagram: "bg-[#430033] text-white",
  facebook: "bg-[#1877F2] text-white",
  whatsapp: "bg-[#25D366] text-white",
  mail: "bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
  location: "bg-white text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]",
};

export function ContactBand({ contact }: { contact: HomeContent["contact"] }) {
  return (
    <section className="bg-white px-5 pb-20 pt-[60px]">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-20">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex rounded-md shadow-md border-b border-white bg-mist px-3 py-3 text-[12px] font-normal leading-none text-black">
            {contact.eyebrow}
          </span>
          <h2 className="max-w-[700px] text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            <Lines text={contact.title} />
          </h2>
        </Reveal>
        <div className="flex w-full flex-col gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            {contact.cards.map((card) => (
              <article key={card.title} className="flex flex-col gap-[26px] rounded-[30px] bg-mist p-[30px]">
                {card.icon === "help" ? <HelpMark /> : <PeopleMark />}
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-ink">{card.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-6 text-ink">{card.body}</p>
                </div>
                <Button href={card.href} variant="secondary" external={card.external} className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  {card.cta}
                </Button>
              </article>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {contact.channels.map((channel) => (
              <a
                key={channel.name}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex h-[192px] w-full flex-col items-center justify-center gap-[18px] rounded-[30px] p-[30px] text-center no-underline ${channelTone[channel.tone]}`}
              >
                <ChannelIcon tone={channel.tone} />
                <span className="w-full">
                  <span className="block text-[14px] font-semibold leading-[16.8px] tracking-[-0.3px]">
                    <Handle text={channel.handle} />
                  </span>
                  <span className="mt-1 block text-[13px] font-normal leading-[15.6px] tracking-[-0.3px]">{channel.body}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HelpMark() {
  return (
    <span className="flex h-[70px] w-[70px] items-center justify-center rounded-[10px] bg-white text-[#00A7F5] shadow-[0_1px_12px_rgba(0,0,0,0.1)]">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M20.901 14.995l-.044 -.006a.4 .4 0 0 1 -.102 -.02l-.045 -.012l-.048 -.017l-.045 -.016l-.043 -.02l-.045 -.022l-.04 -.024l-.044 -.026l-.043 -.032l-.036 -.027a1 1 0 0 1 -.073 -.066l-2.707 -2.707h-6.586a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h9a2 2 0 0 1 2 2v10a1 1 0 0 1 -.076 .383l-.02 .043l-.022 .045l-.024 .04l-.026 .044l-.032 .043l-.027 .036a1 1 0 0 1 -.578 .347l-.052 .008l-.044 .006a1 1 0 0 1 -.198 0" />
        <path d="M7 8.999v1.001a4 4 0 0 0 4 4h4v3a2 2 0 0 1 -2 2h-6.586l-2.707 2.707c-.63 .63 -1.707 .184 -1.707 -.707v-10a2 2 0 0 1 2 -2z" />
      </svg>
    </span>
  );
}

function PeopleMark() {
  return (
    <span className="flex h-[70px] w-[70px] items-center justify-center rounded-[10px] bg-white text-[#18181B] shadow-[0_1px_12px_rgba(0,0,0,0.1)]">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-.086 5.066c.372 -.837 -.483 -1.692 -1.32 -1.32l-9 4l-.108 .055c-.75 .44 -.611 1.609 .271 1.83l3.418 .853l.855 3.419c.23 .922 1.498 1.032 1.884 .163z" />
      </svg>
    </span>
  );
}

function Handle({ text }: { text: string }) {
  const at = text.indexOf("@");
  if (at > 0) {
    return (
      <>
        <span className="block">{text.slice(0, at)}</span>
        <span className="block">{text.slice(at)}</span>
      </>
    );
  }
  return <span className="block truncate">{text}</span>;
}

function ChannelIcon({ tone }: { tone: HomeContent["contact"]["channels"][number]["tone"] }) {
  if (tone === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true">
        <defs>
          <radialGradient id="ig" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <path
          fill="url(#ig)"
          d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z"
        />
      </svg>
    );
  }
  if (tone === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true">
        <path
          fill="#fff"
          d="M13.6 22v-8.2h2.8l.4-3.2h-3.2V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.5H8.1v3.2h2.4V22h3.1Z"
        />
      </svg>
    );
  }
  if (tone === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" aria-hidden="true">
        <path
          fill="#fff"
          d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"
        />
      </svg>
    );
  }
  if (tone === "mail") {
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
        <path fill="#4caf50" d="M45 16.2 40 19l-5 4.7V40h7a3 3 0 0 0 3-3V16.2z" />
        <path fill="#1e88e5" d="M3 16.2 6.6 17.9 13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
        <path fill="#e53935" d="m35 11.2-11 8.25L13 11.2 12 17l1 6.7 11 8.25 11-8.25 1-6.7z" />
        <path fill="#c62828" d="M3 12.3V16.2l10 7.5V11.2L9.9 8.9A4.3 4.3 0 0 0 7.3 8C4.9 8 3 9.9 3 12.3z" />
        <path fill="#fbc02d" d="M45 12.3V16.2l-10 7.5V11.2l3.1-2.3A4.3 4.3 0 0 1 40.7 8C43.1 8 45 9.9 45 12.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path fill="#34a853" d="M24 44s14-11.1 14-22A14 14 0 0 0 10 22c0 10.9 14 22 14 22z" />
      <path fill="#fbbc04" d="M24 4A14 14 0 0 0 10 22c0 3.1 1.1 6.2 3 9.2L24 22V4z" />
      <path fill="#ea4335" d="M24 4a14 14 0 0 1 14 18c0 3.1-1.1 6.2-3 9.2L24 22V4z" />
      <path fill="#1a73e8" d="M13 31.2C16.2 36 20.4 40.8 24 44c3.6-3.2 7.8-8 11-12.8L24 22 13 31.2z" />
      <circle cx="24" cy="22" r="6" fill="#fff" />
    </svg>
  );
}

export function HomeFaq({ faq }: { faq: HomeContent["faq"] }) {
  return (
    <section className="bg-white px-5 pb-20 pt-[60px]">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-5">
        <Reveal className="w-full lg:w-[400px] lg:shrink-0">
          <h2 className="text-[18px] font-medium leading-6 tracking-[-0.02em] text-ink">{faq.title}</h2>
          <p className="mt-1.5 max-w-sm text-[16px] leading-6 text-zinc-500">{faq.intro}</p>
        </Reveal>
        <FaqList items={faq.items} variant="cards" />
      </div>
    </section>
  );
}

export function Ribbon({ items }: { items: string[] }) {
  const row = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden border-y border-black/6 bg-paper py-4">
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="text-[14px] font-medium tracking-[-0.02em] text-zinc-500">
            {item}
            <span className="ml-8 text-zinc-300" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Closing({ closing }: { closing: HomeContent["closing"] }) {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] px-6 py-20 text-white sm:px-14">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#8ea2d8_0%,#c5a4b8_42%,#9a746c_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(500px_240px_at_80%_20%,rgba(255,214,186,0.7),transparent_60%)]" />
        <Reveal className="relative">
          <h2 className="max-w-xl text-[clamp(36px,5vw,56px)] font-medium leading-[1.15] tracking-[-0.03em]">
            <Lines text={closing.title} />
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-6 text-white/85">{closing.body}</p>
          <div className="mt-8">
            <Button href={closing.href}>{closing.cta}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
