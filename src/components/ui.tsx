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

export function Mark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M6 16.2c1.2 1.8 3.1 2.8 5.6 2.8 3.4 0 5.6-1.6 5.6-3.9 0-2-1.5-3.1-4.6-3.9l-3.2-.8C6.6 9.7 5.4 8.8 5.4 7.2 5.4 5.1 7.5 3.6 10.6 3.6c2.3 0 4.2.8 5.4 2.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const buttonStyles = {
  primary:
    "bg-[#00a7f5] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] hover:bg-[#00b0fa]",
  secondary: "bg-paper text-ink hover:bg-mist",
  dark: "bg-nav text-white hover:bg-black",
  whatsapp:
    "bg-[#25D366] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.25),0_2px_4px_0_rgba(18,140,126,0.35)] hover:bg-[#20bd5a]",
};

export function WhatsAppIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.9c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.49.24.57.82 1.98.89 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z"
      />
    </svg>
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
  const classes = `inline-flex h-[45px] w-max shrink-0 cursor-pointer items-center justify-center gap-[7px] overflow-clip whitespace-nowrap rounded-[16px] px-4 text-[15px] font-medium tracking-[-0.02em] no-underline transition-colors ${buttonStyles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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
