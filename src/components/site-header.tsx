"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { NavMenuItem, SiteContent } from "@/lib/types";
import { Button, Mark } from "@/components/ui";

const toneStyle: Record<NonNullable<NavMenuItem["tone"]>, { card: string; icon: string }> = {
  blue: { card: "bg-[rgba(0,162,255,0.1)] hover:bg-[rgba(0,162,255,0.2)]", icon: "bg-[#74d4ff]" },
  amber: { card: "bg-[rgba(255,162,0,0.1)] hover:bg-[rgba(255,162,0,0.2)]", icon: "bg-[#ffb86a]" },
  green: { card: "bg-[rgba(0,255,72,0.1)] hover:bg-[rgba(0,255,72,0.18)]", icon: "bg-[#95d959]" },
  violet: { card: "bg-[#282841] hover:bg-[#34345c]", icon: "bg-[#bba1ff]" },
  red: { card: "bg-[rgba(255,0,0,0.1)] hover:bg-[rgba(255,0,0,0.2)]", icon: "bg-[#ffa1a1]" },
  mist: { card: "bg-white/10 hover:bg-white/18", icon: "bg-white" },
};

type IconGlyph = { fill: string } | { stroke: string[] };

const glyph: Record<NonNullable<NavMenuItem["icon"]>, IconGlyph> = {
  heart: {
    fill: "M12 21.2 10.6 19.9C5.4 15.2 2 12.1 2 8.4 2 5.4 4.4 3 7.4 3c1.7 0 3.3.8 4.6 2.1C13.3 3.8 14.9 3 16.6 3 19.6 3 22 5.4 22 8.4c0 3.7-3.4 6.8-8.6 11.5L12 21.2Z",
  },
  cards: {
    fill: "M7 3h9a2 2 0 0 1 2 2v11H9a2 2 0 0 1-2-2V3Zm-3 5h2v8a4 4 0 0 0 4 4h8v2H8a4 4 0 0 1-4-4V8Z",
  },
  sun: {
    fill: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-5a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16.8a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.2a1 1 0 0 1 1-1ZM3 11h1.2a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Zm16.8 0H21a1 1 0 1 1 0 2h-1.2a1 1 0 1 1 0-2ZM5.1 5.1a1 1 0 0 1 1.4 0l.9.9a1 1 0 1 1-1.4 1.4l-.9-.9a1 1 0 0 1 0-1.4Zm11.5 11.5a1 1 0 0 1 1.4 0l.9.9a1 1 0 0 1-1.4 1.4l-.9-.9a1 1 0 0 1 0-1.4Zm1.4-11.5a1 1 0 0 1 0 1.4l-.9.9a1 1 0 1 1-1.4-1.4l.9-.9a1 1 0 0 1 1.4 0ZM6.5 16.6a1 1 0 0 1 0 1.4l-.9.9a1 1 0 0 1-1.4-1.4l.9-.9a1 1 0 0 1 1.4 0Z",
  },
  spark: {
    fill: "M12 2.5 13.4 8 19 9.2 13.4 10.6 12 16.2 10.6 10.6 5 9.2 10.6 8 12 2.5Zm6.2 10.2.7 2.4 2.4.7-2.4.7-.7 2.4-.7-2.4-2.4-.7 2.4-.7.7-2.4ZM6.2 14l.5 1.6 1.6.5-1.6.5-.5 1.6-.5-1.6L4 16.1l1.6-.5.6-1.6Z",
  },
  device: {
    fill: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 14h6v1.2H9V17Zm1-11h4a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2Z",
  },
  eye: {
    fill: "M12 5C7 5 3.1 8.1 1.5 12 3.1 15.9 7 19 12 19s8.9-3.1 10.5-7C20.9 8.1 17 5 12 5Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  },
  moon: { fill: "M15.2 2.4a9 9 0 1 0 6.4 14.2A8 8 0 0 1 15.2 2.4Z" },
  flame: {
    stroke: [
      "M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.294 -2.333 5.588c0 3.704 3.134 6.706 7 6.706c3.866 0 7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235",
    ],
  },
  handshake: {
    stroke: [
      "M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572",
      "M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25",
      "M12.5 15.5l2 2",
      "M15 13l2 2",
    ],
  },
  book: {
    stroke: ["M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12", "M19 16h-12a2 2 0 0 0 -2 2", "M9 8h6"],
  },
  brain: {
    stroke: [
      "M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8",
      "M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8",
      "M17.5 16a3.5 3.5 0 0 0 0 -7h-.5",
      "M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0",
      "M6.5 16a3.5 3.5 0 0 1 0 -7h.5",
      "M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10",
    ],
  },
  sparkles: {
    stroke: [
      "M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6",
    ],
  },
  crystal: {
    stroke: [
      "M6.73 17.018a8 8 0 1 1 10.54 0",
      "M5 19a2 2 0 0 0 2 2h10a2 2 0 1 0 0 -4h-10a2 2 0 0 0 -2 2",
      "M11 7a3 3 0 0 0 -3 3",
    ],
  },
  flower: {
    stroke: [
      "M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
      "M12 2a3 3 0 0 1 3 3c0 .562 -.259 1.442 -.776 2.64l-.724 1.36l1.76 -1.893c.499 -.6 .922 -1 1.27 -1.205a2.968 2.968 0 0 1 4.07 1.099a3.011 3.011 0 0 1 -1.09 4.098c-.374 .217 -.99 .396 -1.846 .535l-2.664 .366l2.4 .326c1 .145 1.698 .337 2.11 .576a3.011 3.011 0 0 1 1.09 4.098a2.968 2.968 0 0 1 -4.07 1.098c-.348 -.202 -.771 -.604 -1.27 -1.205l-1.76 -1.893l.724 1.36c.516 1.199 .776 2.079 .776 2.64a3 3 0 0 1 -6 0c0 -.562 .259 -1.442 .776 -2.64l.724 -1.36l-1.76 1.893c-.499 .601 -.922 1 -1.27 1.205a2.968 2.968 0 0 1 -4.07 -1.098a3.011 3.011 0 0 1 1.09 -4.098c.374 -.218 .99 -.396 1.846 -.536l2.664 -.366l-2.4 -.325c-1 -.145 -1.698 -.337 -2.11 -.576a3.011 3.011 0 0 1 -1.09 -4.099a2.968 2.968 0 0 1 4.07 -1.099c.348 .203 .771 .604 1.27 1.205l1.76 1.894c-1 -2.292 -1.5 -3.625 -1.5 -4a3 3 0 0 1 3 -3",
    ],
  },
};

function MenuIcon({ name }: { name: NonNullable<NavMenuItem["icon"]> }) {
  const icon = glyph[name];

  if ("fill" in icon) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d={icon.fill} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon.stroke.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function SiteHeader({ site }: { site: SiteContent }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!open && !menu) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };

    if (open) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, menu]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[18px] z-50 px-4">
      <div className="mx-auto flex max-w-[880px] justify-center">
        <div
          data-hero-appear={pathname === "/" ? "navigation" : undefined}
          className="pointer-events-auto w-full rounded-[22px] bg-nav p-1.5 text-white shadow-[0_2px_40px_rgba(0,0,0,0.25)] lg:w-auto"
          onMouseLeave={() => setMenu(null)}
        >
          <div className="flex items-center gap-1 pl-1.5">
            <Link href="/" className="mr-1 flex items-center gap-2 rounded-full py-1 pr-2" aria-label={`${site.name} home`}>
              <Mark className="h-8 w-8" />
              <span className="text-[15px] font-medium tracking-[-0.03em]">{site.name}</span>
            </Link>

            <nav className="hidden items-center lg:flex" aria-label="Primary">
              {site.nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                if (item.menu) {
                  const expanded = menu === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[15px] font-medium tracking-[-0.02em] transition-colors ${expanded || active ? "text-white" : "text-white/60 hover:text-white"}`}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onMouseEnter={() => setMenu(item.href)}
                      onFocus={() => setMenu(item.href)}
                    >
                      {item.label}
                      <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
                        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 text-[15px] font-medium tracking-[-0.02em] transition-colors ${active ? "text-white" : "text-white/60 hover:text-white"}`}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setMenu(null)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-1 lg:ml-2">
              <div className="hidden lg:block">
                <Button href={site.cta.href}>{site.cta.label}</Button>
              </div>
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

          <AnimatePresence initial={false}>
            {menu ? (
              <motion.div
                key={menu}
                className="hidden w-0 min-w-full overflow-hidden lg:block"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-2 gap-1.5 px-0 pt-4">
                  {site.nav
                    .find((item) => item.href === menu)
                    ?.menu?.map((item, index, items) => {
                      const tone = toneStyle[item.tone ?? "mist"];
                      const showGroup = Boolean(item.group) && item.group !== items[index - 1]?.group;

                      return (
                        <Fragment key={item.href}>
                          {showGroup ? (
                            <p className="font-meta col-span-2 px-2 pt-2 text-[12px] leading-[18px] text-white/50 first:pt-0">{item.group}</p>
                          ) : null}
                          <Link
                            href={item.href}
                            className={`flex flex-col gap-3 rounded-[20px] p-[18px] no-underline transition-colors duration-300 ease-out ${tone.card}`}
                          >
                            <span className={`grid h-[30px] w-[30px] place-items-center rounded-full text-ink ${tone.icon}`}>
                              <MenuIcon name={item.icon ?? "spark"} />
                            </span>
                            <span>
                              <span className="block text-[16px] font-semibold leading-[19.2px] text-white">{item.label}</span>
                              {item.body ? <span className="mt-1 block text-[14px] leading-[17px] text-white">{item.body}</span> : null}
                            </span>
                          </Link>
                        </Fragment>
                      );
                    })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            data-lenis-prevent
            className="pointer-events-auto mx-auto mt-3 max-h-[calc(100vh-96px)] max-w-[880px] overflow-auto rounded-3xl bg-nav p-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.24)] lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 text-[22px] font-medium tracking-[-0.03em] ${active ? "text-white" : "text-white/60"}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.menu?.map((child, index, items) => {
                    const showGroup = Boolean(child.group) && child.group !== items[index - 1]?.group;

                    return (
                      <Fragment key={child.href}>
                        {showGroup ? (
                          <p className="font-meta px-8 pt-3 text-[12px] leading-[18px] text-white/45">{child.group}</p>
                        ) : null}
                        <Link
                          href={child.href}
                          className="block rounded-2xl py-2 pl-8 pr-4 text-[16px] text-white/75"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </Fragment>
                    );
                  })}
                </div>
              );
            })}
            <div className="px-4 pb-2 pt-3">
              <Button href={site.cta.href}>{site.cta.label}</Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
