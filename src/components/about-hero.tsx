import { QuoteMarquee, quotesToMarquee, type MarqueeItem } from "@/components/quote-marquee";
import SideRays from "@/components/side-rays";
import { Button, Lines, Reveal, WhatsAppIcon } from "@/components/ui";
import { getHome } from "@/lib/content";
import type { PhotoHeroContent } from "@/lib/types";
import type { SideRaysProps } from "@/components/side-rays";

type HeroTone = "about" | "services" | "products" | "courses";

const rays: Record<HeroTone, Pick<SideRaysProps, "rayColor1" | "rayColor2" | "origin">> = {
  about: { rayColor1: "#f59e0b", rayColor2: "#60a5fa", origin: "top-right" },
  services: { rayColor1: "#8b5cf6", rayColor2: "#38bdf8", origin: "top-left" },
  products: { rayColor1: "#fb923c", rayColor2: "#f472b6", origin: "right" },
  courses: { rayColor1: "#34d399", rayColor2: "#818cf8", origin: "bottom-left" },
};

export function AboutHero({
  hero,
  tone = "about",
  marqueeRows,
}: {
  hero: PhotoHeroContent;
  tone?: HeroTone;
  marqueeRows?: MarqueeItem[][];
}) {
  const light = rays[tone] ?? rays.about;
  const quotes = quotesToMarquee(getHome().voices.items);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(180deg, #000 72%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 72%, transparent 100%)",
        }}
      >
        <SideRays
          rayColor1={light.rayColor1}
          rayColor2={light.rayColor2}
          origin={light.origin}
          speed={2.5}
          intensity={2}
          spread={2}
          density={5}
          followMouse
          blend={0.6}
          sharpness={0.5}
          tilt={0}
          falloff={1.6}
          glow={1}
          saturation={1}
          dust={0}
          mouseInfluence={0.5}
          intro
          lightMode
          opacity={1}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-6 pb-10 pt-[140px] text-center sm:px-8 lg:pt-24">
        <Reveal className="flex w-full max-w-[760px] flex-col items-center">
          {/* <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">{hero.eyebrow}</p> */}
          <h1 className="text-[clamp(42px,7vw,72px)] font-medium leading-[1.05] tracking-[-0.045em] text-ink">
            <Lines text={hero.title} />
          </h1>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-7 tracking-[-0.015em] text-zinc-600">{hero.body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={hero.href}>{hero.cta}</Button>
            <Button href={hero.whatsappHref} variant="whatsapp" external>
              <WhatsAppIcon />
              {hero.whatsapp}
            </Button>
          </div>
          {hero.notes.length ? (
            <p className=" mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[16px] tracking-normal text-zinc-500">
              {hero.notes.map((note, index) => (
                <span key={note} className="inline-flex items-center gap-3">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  {note}
                </span>
              ))}
            </p>
          ) : null}
        </Reveal>
      </div>

      {marqueeRows ? <QuoteMarquee rows={marqueeRows} /> : <QuoteMarquee items={quotes} />}
    </section>
  );
}
