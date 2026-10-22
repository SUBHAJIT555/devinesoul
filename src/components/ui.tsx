"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Lines({ text }: { text: string }) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

  return (
    <>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </>
  );
}

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return <img src="/brand/logo.png" alt="" className={className} aria-hidden="true" />;
}

const buttonStyles = {
  primary:
    "bg-[#00a7f5] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] hover:bg-[#00b0fa]",
  secondary: "bg-paper text-ink hover:bg-mist",
  dark: "bg-nav text-white hover:bg-black",
  gold:
    "bg-[#fbbc04] text-ink shadow-[inset_0_3px_0_0_rgba(255,255,255,0.35),0_2px_4px_0_rgba(251,188,4,0.35)] hover:bg-[#f5b301]",
  whatsapp:
    "bg-[#25D366] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.25),0_2px_4px_0_rgba(18,140,126,0.35)] hover:bg-[#20bd5a]",
  purple:
    "bg-[#7c3aed] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.22),0_2px_4px_0_rgba(124,58,237,0.35)] hover:bg-[#6d28d9]",
};

function StrokeIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PhoneIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" />
      <path d="M15 5h6" />
      <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5" />
    </StrokeIcon>
  );
}

export function ExploreIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M15 9l-6 6" />
      <path d="M15 15v-6h-6" />
    </svg>
  );
}

export function GoogleIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
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

export function MailIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M13 19h-8a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 7l9 6l9 -6" />
      <path d="M16 22l5 -5" />
      <path d="M21 21.5v-4.5h-4.5" />
    </StrokeIcon>
  );
}

export function WhatsAppIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </StrokeIcon>
  );
}

const contactBits = /(\+91\s*7668648224|priyasinha1809@gmail\.com|WhatsApp)/g;

export function LinkedCopy({ text }: { text: string }) {
  const parts = text.split(contactBits);

  return (
    <>
      {parts.map((part, index) => {
        if (part === "WhatsApp") {
          return (
            <a key={`${part}-${index}`} href="https://wa.me/917668648224" target="_blank" rel="noopener noreferrer" className="underline decoration-black/25 underline-offset-2 hover:decoration-ink">
              WhatsApp
            </a>
          );
        }
        if (/^\+91\s*7668648224$/.test(part)) {
          return (
            <a key={`${part}-${index}`} href="tel:+917668648224" className="underline decoration-black/25 underline-offset-2 hover:decoration-ink">
              {part}
            </a>
          );
        }
        if (part === "priyasinha1809@gmail.com") {
          return (
            <a key={part} href="mailto:priyasinha1809@gmail.com" className="underline decoration-black/25 underline-offset-2 hover:decoration-ink">
              {part}
            </a>
          );
        }
        return <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>;
      })}
    </>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
  external?: boolean;
}) {
  const classes = `inline-flex h-[45px] w-max shrink-0 cursor-pointer items-center justify-center gap-[7px] overflow-clip whitespace-nowrap rounded-[16px] px-3 text-[15px] font-medium tracking-[-0.02em] no-underline transition-colors sm:px-4 ${buttonStyles[variant]} ${className}`;

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  const blank = external || href.startsWith("http");
  if (blank || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} target={blank ? "_blank" : undefined} rel={blank ? "noopener noreferrer" : undefined} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className={`text-[14px] font-medium tracking-[-0.02em] ${light ? "text-[#7dd3fc]" : "text-accent-deep"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em] ${eyebrow ? "mt-3" : ""} ${light ? "text-white" : "text-ink"}`}
      >
        <Lines text={title} />
      </h2>
      {body ? (
        <p className={`mt-4 max-w-xl text-[16px] leading-6 ${light ? "text-white/70" : "text-zinc-600"}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function PointGrid({
  points,
  light = false,
  className = "",
}: {
  points: string[];
  light?: boolean;
  className?: string;
}) {
  if (!points.length) return null;

  const mid = Math.ceil(points.length / 2);

  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-2 ${className}`}>
      {[points.slice(0, mid), points.slice(mid)].map((column, index) => (
        <ul key={index} className="min-w-0 space-y-2">
          {column.map((point) => (
            <li key={point} className="flex gap-2 text-[13px] leading-5 text-ink sm:text-[14px] sm:leading-[22px]">
              <Check light={light} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function Check({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={`mt-0.5 h-4 w-4 shrink-0 ${light ? "text-[#7dd3fc]" : "text-white p-0.5 shadow-md border-b  border-white rounded-full bg-accent"}`} aria-hidden="true">
      <path
        d="M3.2 8.2 6.4 11.4 12.8 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
