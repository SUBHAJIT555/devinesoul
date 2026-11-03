"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { HomeContent } from "@/lib/types";
import { Button, WhatsAppIcon } from "@/components/ui";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  const lines = hero.headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let wordIndex = 0;

  return (
    <section className="relative bg-white">
      <div className="relative h-[100svh] overflow-clip [mask-image:radial-gradient(164%_85%_at_50%_14.6%,#000_86.3214%,transparent_100%)]">
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

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1100px] flex-col items-center px-5 pt-[108px] text-center sm:pt-[130px]">
          <h1 className="text-[clamp(20px,calc((100vw-2.5rem)/17.5),56px)] font-medium leading-[1.2] tracking-[-0.025em] text-white">
            {lines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
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
          <div data-hero-appear="cta" className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button href={hero.ctaHref}>{hero.cta}</Button>
            <Button href={hero.whatsappHref} variant="whatsapp" external>
              <WhatsAppIcon />
              {hero.whatsapp}
            </Button>
          </div>
          <a
            data-hero-appear="rating"
            href={hero.ratingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2.5 rounded-xl bg-white/20 px-3.5 py-2 text-[14px] font-medium tracking-[-0.02em] text-white no-underline shadow-[0_1px_2px_rgba(0,0,0,0.12)] backdrop-blur-[8px]"
          >
            <GoogleMark />
            <Stars />
            <span>{hero.rating}</span>
          </a>
        </div>
      </div>

      <div
        data-hero-appear="video"
        className="relative z-20 mx-auto -mt-[min(40vh,calc(100svh-27.5rem))] w-[min(1080px,calc(100vw-32px))] sm:w-[min(1080px,80vw)] lg:-mt-[40vh] lg:w-[min(1080px,75vw)]"
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

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars() {
  return (
    <span className="inline-flex text-[#fbbc04]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 12 12" className="h-4 w-4">
          <path
            fill="currentColor"
            d="M6 1.1 7.3 4l3.2.3-2.4 2.1.7 3.1L6 8.1 3.2 9.5l.7-3.1L1.5 4.3 4.7 4 6 1.1Z"
          />
        </svg>
      ))}
    </span>
  );
}

function clock(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function Stage() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const volumeBeforeMute = useRef(1);
  const reduce = useReducedMotion();
  const idleRef = useRef<number | null>(null);
  const settleRef = useRef<number | null>(null);
  const [awake, setAwake] = useState(false);
  const [settled, setSettled] = useState(false);
  const progress = duration ? Math.min(100, (time / duration) * 100) : 0;
  const showMark = !playing || !settled || awake;

  useEffect(() => {
    return () => {
      if (idleRef.current) window.clearTimeout(idleRef.current);
      if (settleRef.current) window.clearTimeout(settleRef.current);
    };
  }, []);

  function wake() {
    setAwake(true);
    if (idleRef.current) window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => setAwake(false), 1800);
  }

  useEffect(() => {
    function onChange() {
      setFullscreen(document.fullscreenElement === shellRef.current);
    }
    document.addEventListener("fullscreenchange", onChange);
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) setDuration(video.duration);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused && !video.ended) {
      video.pause();
      return;
    }
    void video.play().catch(() => setPlaying(false));
  }

  function seek(next: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = next;
    setTime(next);
  }

  function changeVolume(next: number) {
    const video = videoRef.current;
    if (!video) return;
    video.volume = next;
    video.muted = next === 0;
    setVolume(next);
    setMuted(next === 0);
    if (next > 0) volumeBeforeMute.current = next;
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || video.volume === 0) {
      const restored = volumeBeforeMute.current || 1;
      video.muted = false;
      video.volume = restored;
      setMuted(false);
      setVolume(restored);
      return;
    }
    volumeBeforeMute.current = video.volume;
    video.muted = true;
    setMuted(true);
  }

  async function toggleFullscreen() {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement === shell) {
      await document.exitFullscreen();
      return;
    }
    await shell.requestFullscreen();
  }

  return (
    <div className="group relative aspect-video">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-black opacity-60 blur-[10px]" />
      <div
        ref={shellRef}
        onMouseMove={wake}
        onMouseLeave={() => setAwake(false)}
        className={`relative h-full overflow-hidden bg-black ${fullscreen ? "" : "rounded-2xl"}`}
      >
        <video
          ref={videoRef}
          poster="/media/practice-intro-poster-v2.webp"
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          onClick={toggle}
          onPlay={() => {
            setPlaying(true);
            setAwake(false);
            if (settleRef.current) window.clearTimeout(settleRef.current);
            settleRef.current = window.setTimeout(() => setSettled(true), reduce ? 0 : 520);
          }}
          onPause={() => {
            setPlaying(false);
            setSettled(false);
            setAwake(false);
          }}
          onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          onEnded={() => {
            const video = videoRef.current;
            if (video) video.currentTime = 0;
            setPlaying(false);
            setSettled(false);
            setAwake(false);
            setTime(0);
          }}
        >
          <source src="/media/practice-intro-v3.mp4" type="video/mp4" />
        </video>
        <div className={`pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-300 ${playing ? "opacity-0" : ""}`} />
        <button
          type="button"
          onClick={toggle}
          className={`absolute left-1/2 top-1/2 aspect-square w-[18%] max-w-[128px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_3px_2px_-1px_rgba(255,255,255,0.5)] backdrop-blur-[5px] will-change-transform sm:w-[12%] ${reduce ? "" : "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"} ${showMark ? "scale-100 opacity-100 group-hover:scale-[1.08]" : "pointer-events-none scale-95 opacity-0"}`}
          aria-label={playing ? "Pause preview" : "Play preview"}
        >
          <PlayPauseMorph playing={playing} reduce={Boolean(reduce)} />
        </button>
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-full bg-black/10 px-3 py-2 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_3px_2px_-1px_rgba(255,255,255,0.5)] backdrop-blur-[5px] transition duration-300 sm:inset-x-4 sm:px-4 ${playing ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"} ${reduce ? "duration-0" : ""}`}
          aria-hidden={playing ? undefined : true}
        >
          <span className="font-meta w-9 shrink-0 text-[12px] tabular-nums">{clock(time)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Seek"
            className={`${glassRange} min-w-0 flex-1`}
            style={{ background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.35) ${progress}%)` }}
          />
          <span className="font-meta w-9 shrink-0 text-right text-[12px] tabular-nums">{clock(duration)}</span>
          <button type="button" onClick={toggleMute} className="grid h-8 w-8 shrink-0 place-items-center" aria-label={muted ? "Unmute" : "Mute"}>
            {muted || volume === 0 ? <MutedIcon /> : <VolumeIcon />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(event) => changeVolume(Number(event.target.value))}
            aria-label="Volume"
            className={`${glassRange} w-14 shrink-0 sm:w-16`}
            style={{ background: `linear-gradient(to right, white ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.35) ${(muted ? 0 : volume) * 100}%)` }}
          />
          <button type="button" onClick={() => void toggleFullscreen()} className="grid h-8 w-8 shrink-0 place-items-center" aria-label={fullscreen ? "Exit full screen" : "Full screen"}>
            {fullscreen ? <ExitFullIcon /> : <FullIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

const glassRange =
  "h-1 cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white";

function PlayPauseMorph({ playing, reduce }: { playing: boolean; reduce: boolean }) {
  const motion = reduce ? "duration-0" : "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span className="absolute left-1/2 top-1/2 h-[40%] w-[36%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <svg viewBox="0 0 38.55 43.29" className={`absolute inset-0 h-full w-full transition-all ${motion} ${playing ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}>
        <path
          d="M0 39.0107V4.27515C0 2.83391 0.372456 1.76512 1.11737 1.06879C1.86228 0.356263 2.74484 0 3.76505 0C4.6719 0 5.57065 0.2591 6.46131 0.7773L35.4643 17.6836C36.5331 18.3151 37.3104 18.9224 37.7962 19.5054C38.2982 20.0883 38.5492 20.8009 38.5492 21.6429C38.5492 22.4688 38.2982 23.1814 37.7962 23.7805C37.3104 24.3635 36.5331 24.9627 35.4643 25.578L6.46131 42.5086C5.57065 43.0268 4.6719 43.2859 3.76505 43.2859C2.74484 43.2859 1.86228 42.9296 1.11737 42.2171C0.372456 41.5046 0 40.4358 0 39.0107Z"
          fill="white"
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-between transition-all ${motion} ${playing ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
        <span className="h-full w-[22%] rounded-full bg-white" />
        <span className="h-full w-[22%] rounded-full bg-white" />
      </span>
    </span>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M2 6.2h2.2L8 3.2v9.6L4.2 9.8H2V6.2Zm8.1-1.6 1 1a3.2 3.2 0 0 1 0 4.8l-1 1a4.6 4.6 0 0 0 0-6.8Z" fill="currentColor" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M2 6.2h2.2L8 3.2v9.6L4.2 9.8H2V6.2Zm8.2.3 1.4 1.4 1.4-1.4.9.9-1.4 1.4 1.4 1.4-.9.9-1.4-1.4-1.4 1.4-.9-.9 1.4-1.4-1.4-1.4.9-.9Z" fill="currentColor" />
    </svg>
  );
}

function FullIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M2 6V2h4v1.4H3.4V6H2Zm8-4h4v4h-1.4V3.4H10V2ZM3.4 10v2.6H6V14H2v-4h1.4ZM14 10v4h-4v-1.4h2.6V10H14Z" fill="currentColor" />
    </svg>
  );
}

function ExitFullIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path d="M6 2v4H2v1.4h5.4V2H6Zm4 0v5.4H14V6h-2.6V2H10ZM2 10v1.4h2.6V14H6v-4H2Zm8 0v4h1.4v-2.6H14V10h-4Z" fill="currentColor" />
    </svg>
  );
}
