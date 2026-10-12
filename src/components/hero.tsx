"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { HomeContent } from "@/lib/types";
import { Button } from "@/components/ui";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  const lines = hero.headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let wordIndex = 0;

  return (
    <section className="relative bg-white">
      <div className="relative h-screen overflow-clip [mask-image:radial-gradient(164%_85%_at_50%_14.6%,#000_86.3214%,transparent_100%)]">
        <div
          data-hero-appear="background-back"
          className="absolute -top-10 -left-[10%] z-0 h-[180vh] w-[120%]"
        >
          <Image src="/media/hero/sky.jpg" alt="" fill priority sizes="120vw" className="object-cover" />
        </div>
        <Plate appear="background-front" src="/media/hero/peaks.png" className="z-[2]" />
        <Plate appear="background-middle" src="/media/hero/hills.png" className="z-[3]" />
        <Plate appear="background-base" src="/media/hero/ridge.png" className="z-[3]" />
        <div data-hero-appear="clouds" className="absolute inset-0 z-[2]">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero/clouds-poster.png"
            aria-hidden="true"
          >
            <source src="/media/hero/clouds.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[700px] flex-col items-center px-6 pt-[130px] text-center">
          <h1 className="text-[clamp(40px,5vw,56px)] font-medium leading-[1.2] tracking-[-0.025em] text-white">
            {lines.map((line) => (
              <span key={line} className="block">
                {line.split(" ").map((word) => {
                  const delay = `${wordIndex * 0.07}s`;
                  wordIndex += 1;
                  return (
                    <span
                      key={`${line}-${word}-${delay}`}
                      data-hero-appear="word"
                      className="mr-[0.25em] inline-block last:mr-0"
                      style={{ ["--hero-delay" as string]: delay }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          <p
            data-hero-appear="description"
            className="mt-5 max-w-[500px] text-[16px] leading-6 text-white/90"
          >
            {hero.subhead}
          </p>
          <div data-hero-appear="cta" className="mt-7">
            <Button href={hero.ctaHref}>{hero.cta}</Button>
          </div>
          <p className="font-meta mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] tracking-normal text-white/80">
            {hero.notes.map((note, index) => (
              <span key={note} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span data-hero-appear="separator" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <span
                  data-hero-appear={index === 0 ? "trial" : "no-card"}
                  className="inline-flex items-center gap-2"
                >
                  <NoteIcon index={index} />
                  {note}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>

      <div
        data-hero-appear="video"
        className="relative z-20 mx-auto -mt-[40vh] w-[min(1080px,75vw)]"
      >
        <Stage />
      </div>
    </section>
  );
}

function Plate({ appear, src, className }: { appear: string; src: string; className: string }) {
  return (
    <div data-hero-appear={appear} className={`absolute bottom-0 left-0 aspect-[1770/600] w-[120%] ${className}`}>
      <Image src={src} alt="" fill priority sizes="120vw" className="object-cover" />
    </div>
  );
}

function NoteIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M8 1.5 9.4 6H14l-3.7 2.7 1.4 4.3L8 10.3 4.3 13l1.4-4.3L2 6h4.6L8 1.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M11.2 2.2A5.2 5.2 0 1 0 13.8 10 4 4 0 0 1 11.2 2.2Z" fill="currentColor" />
    </svg>
  );
}

function Stage() {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="group relative aspect-video">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-black opacity-60 blur-[10px]" />
      <div className="relative h-full overflow-hidden rounded-2xl bg-black">
        <Image
          src="/media/practice-b.jpg"
          alt="A guided healing moment with a singing bowl"
          fill
          sizes="(min-width: 1080px) 1080px, 75vw"
          className={`object-cover ${playing && !reduce ? "scale-105 transition-transform duration-[18s]" : ""}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="absolute left-1/2 top-1/2 aspect-square w-[12%] min-w-[88px] max-w-[128px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_3px_2px_-1px_rgba(255,255,255,0.5)] backdrop-blur-[5px] transition-transform duration-200 will-change-transform group-hover:scale-[1.08]"
          aria-label={playing ? "Pause preview" : "Play preview"}
        >
          {playing ? (
            <span className="absolute left-1/2 top-1/2 flex h-[38%] w-[29%] -translate-x-1/2 -translate-y-1/2 items-center justify-between" aria-hidden="true">
              <span className="h-full w-[22%] rounded-full bg-white" />
              <span className="h-full w-[22%] rounded-full bg-white" />
            </span>
          ) : (
            <svg viewBox="0 0 38.55 43.29" className="absolute left-1/2 top-1/2 h-[40%] w-[36%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <path
                d="M0 39.0107V4.27515C0 2.83391 0.372456 1.76512 1.11737 1.06879C1.86228 0.356263 2.74484 0 3.76505 0C4.6719 0 5.57065 0.2591 6.46131 0.7773L35.4643 17.6836C36.5331 18.3151 37.3104 18.9224 37.7962 19.5054C38.2982 20.0883 38.5492 20.8009 38.5492 21.6429C38.5492 22.4688 38.2982 23.1814 37.7962 23.7805C37.3104 24.3635 36.5331 24.9627 35.4643 25.578L6.46131 42.5086C5.57065 43.0268 4.6719 43.2859 3.76505 43.2859C2.74484 43.2859 1.86228 42.9296 1.11737 42.2171C0.372456 41.5046 0 40.4358 0 39.0107Z"
                fill="white"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
