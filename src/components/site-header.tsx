"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SiteContent } from "@/lib/types";
import { Button, Mark } from "@/components/ui";

export function SiteHeader({ site }: { site: SiteContent }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[18px] z-50 px-4">
      <div className="mx-auto flex max-w-[760px] justify-center">
        <div
          data-hero-appear={pathname === "/" ? "navigation" : undefined}
          className="pointer-events-auto flex w-full items-center gap-1 rounded-[22px] bg-nav p-1.5 pl-3 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] lg:w-auto"
        >
          <Link href="/" className="mr-1 flex items-center gap-2 rounded-full py-1 pr-2" aria-label={`${site.name} home`}>
            <Mark className="h-[18px] w-[18px]" />
            <span className="text-[15px] font-medium tracking-[-0.03em]">{site.name}</span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-[15px] font-medium tracking-[-0.02em] transition-colors ${active ? "bg-white/15" : "hover:bg-white/10"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <Button href={site.cta.href}>{site.cta.label}</Button>
            <button
              type="button"
              className="grid h-[38px] w-[38px] place-items-center rounded-xl text-white lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-4 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-px w-4 bg-white transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-px w-4 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            className="pointer-events-auto mx-auto mt-3 max-w-[760px] overflow-hidden rounded-3xl bg-nav p-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.24)] lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3 text-[22px] font-medium tracking-[-0.03em] ${active ? "bg-white/10" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
