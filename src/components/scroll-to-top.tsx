"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

const PROGRESS_RADIUS = 46;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 19V5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m5 12 7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener("change", syncMobile);

    lastScrollY.current = window.scrollY || document.documentElement.scrollTop;

    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const nextVisible = scrollY > 120;
      const nextProgress = maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0;

      if (media.matches) {
        const delta = scrollY - lastScrollY.current;
        if (Math.abs(delta) > 4) {
          setIsScrollingDown(delta > 0);
          lastScrollY.current = scrollY;
        }
      } else {
        setIsScrollingDown(false);
        lastScrollY.current = scrollY;
      }

      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
      setProgress((prev) => (Math.abs(prev - nextProgress) < 0.25 ? prev : nextProgress));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", syncMobile);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const strokeDashoffset = PROGRESS_CIRCUMFERENCE - (progress / 100) * PROGRESS_CIRCUMFERENCE;
  const dimWhileScrollingDown = isMobile && isVisible && isScrollingDown;

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.15 });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      className={`fixed right-4 z-40 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] transition-opacity duration-300 ease-out sm:right-6 md:right-8 md:bottom-8 ${
        !isVisible
          ? "pointer-events-none opacity-0"
          : dimWhileScrollingDown
            ? "pointer-events-auto opacity-10"
            : "pointer-events-auto opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={`Scroll to top, ${Math.round(progress)}% of page`}
        className="group relative flex size-11 cursor-pointer items-center justify-center rounded-full md:size-12 lg:size-14"
      >
        <svg aria-hidden="true" className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={PROGRESS_RADIUS} fill="none" stroke="currentColor" strokeWidth="3" className="text-black/10" />
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={PROGRESS_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="text-[#00a7f5] transition-[stroke-dashoffset] duration-150"
          />
        </svg>
        <span className="relative flex size-8 items-center justify-center rounded-full border border-dashed border-black/10 bg-white text-ink shadow-[0_4px_16px_-6px_rgba(0,0,0,0.12)] transition-colors duration-200 group-hover:border-[#00a7f5]/40 group-hover:text-[#00a7f5] md:size-9 lg:size-10">
          <ArrowUpIcon className="size-4 lg:size-5" />
        </span>
      </button>
    </div>
  );
}
