"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

export function Compare({
  beforeLabel,
  afterLabel,
  beforeSrc,
  afterSrc,
}: {
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const valueRef = useRef(50);
  const interacting = useRef(false);

  function setPosition(next: number) {
    const clamped = Math.min(100, Math.max(0, next));
    valueRef.current = clamped;
    setValue(clamped);
  }

  function setFromClientX(clientX: number) {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition(((clientX - bounds.left) / bounds.width) * 100);
  }

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let frameId = 0;

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

    function hold(ms: number) {
      return new Promise<void>((resolve) => {
        const started = performance.now();
        const tick = () => {
          if (cancelled || interacting.current || performance.now() - started >= ms) resolve();
          else frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
      });
    }

    function glide(to: number, duration: number) {
      return new Promise<void>((resolve) => {
        const from = valueRef.current;
        const started = performance.now();
        const step = (now: number) => {
          if (cancelled || interacting.current) {
            resolve();
            return;
          }
          const t = Math.min(1, (now - started) / duration);
          setPosition(from + (to - from) * ease(t));
          if (t < 1) frameId = requestAnimationFrame(step);
          else resolve();
        };
        frameId = requestAnimationFrame(step);
      });
    }

    async function run() {
      await hold(700);
      while (!cancelled && !interacting.current) {
        await glide(100, 1200);
        if (cancelled || interacting.current) break;
        await glide(50, 1200);
        if (cancelled || interacting.current) break;
        await hold(1100);
        if (cancelled || interacting.current) break;
        await glide(0, 1200);
        if (cancelled || interacting.current) break;
        await glide(50, 1200);
        if (cancelled || interacting.current) break;
        await hold(1100);
      }
    }

    void run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [reduce]);

  return (
    <div
      ref={frame}
      className="relative aspect-video cursor-ew-resize select-none"
      onPointerDown={(event) => {
        interacting.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFromClientX(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) setFromClientX(event.clientX);
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-white shadow-[0_1px_18px_rgba(0,0,0,0.25)]">
        <Panel src={beforeSrc} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Panel src={afterSrc} />
        </div>
        <div className="absolute inset-y-0 z-10 w-px bg-white" style={{ left: `${value}%` }} />
      </div>
      <div
        className="absolute top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1e1e1f] shadow-[0_1.33px_20px_rgba(0,0,0,0.25),inset_1px_2px_3px_rgba(255,255,255,0.38)]"
        style={{ left: `${value}%` }}
      >
        <svg viewBox="0 0 48 24" className="h-4 w-7 text-white" aria-hidden="true">
          <path d="M16.25 6.75 12.75 12l3.5 5.25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m31.75 6.75 3.5 5.25-3.5 5.25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <label className="sr-only">
        Compare {beforeLabel} and {afterLabel}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => {
            interacting.current = true;
            setPosition(Number(event.target.value));
          }}
        />
      </label>
      <div className="pointer-events-none absolute left-4 top-4 rounded-md shadow-md border-b border-white bg-white/80 px-3 py-1 text-[12px] font-medium text-ink">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-md shadow-md border-b border-white/5 bg-nav/80 px-3 py-1 text-[12px] font-medium text-white">
        {afterLabel}
      </div>
    </div>
  );
}

function Panel({ src }: { src: string }) {
  return (
    <div className="relative h-full w-full bg-mist">
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 1200px, 100vw" className="object-cover" />
    </div>
  );
}
