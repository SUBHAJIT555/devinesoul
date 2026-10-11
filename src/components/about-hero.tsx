import Image from "next/image";
import { Button, Lines, Reveal } from "@/components/ui";
import type { PhotoHeroContent } from "@/lib/types";

const desktopMask =
  "linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%), linear-gradient(#000 0%, #000 62%, transparent 100%)";

const mobileMask =
  "radial-gradient(ellipse 62% 54% at 50% 46%, #000 0%, rgba(0,0,0,0.82) 24%, rgba(0,0,0,0.28) 58%, transparent 100%)";

export function AboutHero({ hero }: { hero: PhotoHeroContent }) {
  return (
    <section className="relative min-h-svh overflow-hidden bg-white lg:h-svh">
      <MaskedPhoto hero={hero} mask={mobileMask} className="lg:hidden" />
      <MaskedPhoto hero={hero} mask={desktopMask} className="hidden lg:block" composite />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[720px] flex-col items-center px-6 pt-[148px] text-center lg:h-full lg:min-h-0">
        <Reveal className="flex flex-col items-center">
          {/* <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">{hero.eyebrow}</p> */}
          <h1 className="mt-4 text-[clamp(40px,5vw,56px)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
            <Lines text={hero.title} />
          </h1>
          <p className="mt-5 max-w-[520px] text-[16px] leading-6 text-zinc-600">{hero.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={hero.href}>{hero.cta}</Button>
            <Button href={hero.whatsappHref} variant="whatsapp" external>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.9c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.49.24.57.82 1.98.89 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z"
                />
              </svg>
              {hero.whatsapp}
            </Button>
          </div>
          <p
            className="font-meta mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] tracking-normal text-ink"
            style={{ textShadow: "0 0 12px #fff, 0 0 4px #fff" }}
          >
            {hero.notes.map((note, index) => (
              <span key={note} className="inline-flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                {note}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function MaskedPhoto({
  hero,
  mask,
  className,
  composite = false,
}: {
  hero: PhotoHeroContent;
  mask: string;
  className: string;
  composite?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: composite ? "intersect" : undefined,
        WebkitMaskComposite: composite ? "source-in" : undefined,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    >
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_12%]"
      />
    </div>
  );
}
