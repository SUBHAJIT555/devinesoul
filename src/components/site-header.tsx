"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { NavMenuItem, SiteContent } from "@/lib/types";
import { contact } from "@/lib/contact";
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

function contactHref(site: SiteContent, label: string, fallback: string) {
  return site.footer.contact.items.find((item) => item.label === label)?.href ?? fallback;
}

function socialHandle(item: { label: string; href: string }) {
  if (item.label === "Instagram") return "@divinesoulsbypriya";
  if (item.label === "Facebook") return "Divine Souls";
  return item.label;
}

function NavWhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g clipPath="url(#nav-whatsapp-clip)">
        <path
          opacity="0.4"
          d="M6.9403 20.6304C8.4303 21.5004 10.1603 22.0005 12.0003 22.0005C17.6303 22.0005 22.3103 17.0305 21.9803 11.4105C21.6403 5.61045 16.3703 1.14045 10.3003 2.14045C6.12029 2.83045 2.77029 6.22045 2.12029 10.4005C1.74029 12.8205 2.24031 15.1104 3.33031 17.0005L2.4403 20.3104C2.2403 21.0604 2.93028 21.7404 3.67028 21.5304L6.9403 20.6304Z"
        />
        <path d="M17 15.1705C17 15.3505 16.96 15.5405 16.87 15.7205C16.78 15.9005 16.67 16.0705 16.53 16.2305C16.28 16.5005 16.01 16.7005 15.71 16.8205C15.41 16.9505 15.08 17.0105 14.73 17.0105C14.22 17.0105 13.67 16.8905 13.1 16.6405C12.52 16.3905 11.95 16.0605 11.38 15.6505C10.8 15.2305 10.26 14.7605 9.73999 14.2505C9.21999 13.7305 8.76003 13.1805 8.34003 12.6105C7.93003 12.0405 7.59999 11.4705 7.35999 10.9005C7.11999 10.3305 7 9.78047 7 9.26047C7 8.92047 7.05999 8.59047 7.17999 8.29047C7.29999 7.98047 7.49001 7.70046 7.76001 7.45046C8.08001 7.13046 8.42999 6.98047 8.79999 6.98047C8.93999 6.98047 9.08002 7.01047 9.21002 7.07047C9.34002 7.13047 9.45999 7.22046 9.54999 7.35046L10.7 9.00047C10.79 9.13047 10.86 9.24046 10.9 9.35046C10.95 9.46046 10.97 9.56047 10.97 9.66047C10.97 9.78047 10.93 9.90046 10.86 10.0205C10.79 10.1405 10.7 10.2605 10.58 10.3805L10.2 10.7805C10.14 10.8405 10.12 10.9005 10.12 10.9805C10.12 11.0205 10.13 11.0605 10.14 11.1005C10.16 11.1405 10.17 11.1705 10.18 11.2005C10.27 11.3705 10.43 11.5805 10.65 11.8405C10.88 12.1005 11.12 12.3705 11.38 12.6305C11.65 12.9005 11.91 13.1405 12.18 13.3705C12.44 13.5905 12.66 13.7405 12.83 13.8305C12.86 13.8405 12.89 13.8605 12.92 13.8705C12.96 13.8905 13 13.8905 13.05 13.8905C13.14 13.8905 13.2 13.8605 13.26 13.8005L13.64 13.4205C13.77 13.2905 13.89 13.2005 14 13.1405C14.12 13.0705 14.23 13.0305 14.36 13.0305C14.46 13.0305 14.56 13.0505 14.67 13.1005C14.78 13.1505 14.9 13.2105 15.02 13.3005L16.68 14.4805C16.81 14.5705 16.9 14.6805 16.96 14.8005C16.97 14.9105 17 15.0305 17 15.1705Z" />
      </g>
      <defs>
        <clipPath id="nav-whatsapp-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function NavCallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g clipPath="url(#nav-call-clip)">
        <path d="M17.62 10.7496C17.19 10.7496 16.85 10.3996 16.85 9.97961C16.85 9.60961 16.48 8.83961 15.86 8.16961C15.25 7.51961 14.58 7.13961 14.02 7.13961C13.59 7.13961 13.25 6.78961 13.25 6.36961C13.25 5.94961 13.6 5.59961 14.02 5.59961C15.02 5.59961 16.07 6.13961 16.99 7.10961C17.85 8.01961 18.4 9.14961 18.4 9.96961C18.4 10.3996 18.05 10.7496 17.62 10.7496Z" />
        <path d="M21.2298 10.75C20.7998 10.75 20.4598 10.4 20.4598 9.98C20.4598 6.43 17.5698 3.55 14.0298 3.55C13.5998 3.55 13.2598 3.2 13.2598 2.78C13.2598 2.36 13.5998 2 14.0198 2C18.4198 2 21.9998 5.58 21.9998 9.98C21.9998 10.4 21.6498 10.75 21.2298 10.75Z" />
        <path
          opacity="0.4"
          d="M11.79 14.21L8.52 17.48C8.16 17.16 7.81 16.83 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.09 13.57 11.44 13.91 11.79 14.21Z"
        />
        <path d="M21.9701 18.3291C21.9701 18.6091 21.9201 18.8991 21.8201 19.1791C21.7901 19.2591 21.7601 19.3391 21.7201 19.4191C21.5501 19.7791 21.3301 20.1191 21.0401 20.4391C20.5501 20.9791 20.0101 21.3691 19.4001 21.6191C19.3901 21.6191 19.3801 21.6291 19.3701 21.6291C18.7801 21.8691 18.1401 21.9991 17.4501 21.9991C16.4301 21.9991 15.3401 21.7591 14.1901 21.2691C13.0401 20.7791 11.8901 20.1191 10.7501 19.2891C10.3601 18.9991 9.9701 18.7091 9.6001 18.3991L12.8701 15.1291C13.1501 15.3391 13.4001 15.4991 13.6101 15.6091C13.6601 15.6291 13.7201 15.6591 13.7901 15.6891C13.8701 15.7191 13.9501 15.7291 14.0401 15.7291C14.2101 15.7291 14.3401 15.6691 14.4501 15.5591L15.2101 14.8091C15.4601 14.5591 15.7001 14.3691 15.9301 14.2491C16.1601 14.1091 16.3901 14.0391 16.6401 14.0391C16.8301 14.0391 17.0301 14.0791 17.2501 14.1691C17.4701 14.2591 17.7001 14.3891 17.9501 14.5591L21.2601 16.9091C21.5201 17.0891 21.7001 17.2991 21.8101 17.5491C21.9101 17.7991 21.9701 18.0491 21.9701 18.3291Z" />
      </g>
      <defs>
        <clipPath id="nav-call-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

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

            <div className="ml-auto flex items-center gap-0.5 lg:ml-2">
              <div className="hidden lg:block">
                <Button href={site.cta.href}>{site.cta.label}</Button>
              </div>
              <a
                href={contactHref(site, "WhatsApp", contact.whatsappHref)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-[38px] w-[38px] place-items-center rounded-xl text-white lg:hidden"
              >
                <NavWhatsAppIcon />
              </a>
              <a
                href={contactHref(site, "Mobile", contact.telHref)}
                aria-label="Call"
                className="grid h-[38px] w-[38px] place-items-center rounded-xl text-white lg:hidden"
              >
                <NavCallIcon />
              </a>
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
            {site.footer.explore.links
              .filter((item) => item.href === "/faq" || item.href === "/reviews")
              .map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 text-[22px] font-medium tracking-[-0.03em] ${active ? "text-white" : "text-white/60"}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            <div className="mx-1 mt-2 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 px-3 pb-2 pt-4">
              {site.footer.social.links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block min-w-0 text-white transition-colors hover:text-white/70"
                  onClick={() => setOpen(false)}
                >
                  <span className="block text-[13px] font-medium text-white/50">{item.label}</span>
                  <span className="mt-1 block text-[14px] leading-5">{socialHandle(item)}</span>
                </a>
              ))}
              <a
                href={contact.mailtoHref}
                className="col-span-2 block min-w-0 break-all text-white transition-colors hover:text-white/70"
                onClick={() => setOpen(false)}
              >
                <span className="block text-[13px] font-medium text-white/50">Mail</span>
                <span className="mt-1 block text-[14px] leading-5">{contact.email}</span>
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
