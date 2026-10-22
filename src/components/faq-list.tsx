"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FaqItem } from "@/lib/types";
import { LinkedCopy } from "@/components/ui";

export function FaqList({
  items,
  variant = "lines",
  className,
}: {
  items: FaqItem[];
  variant?: "lines" | "cards";
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  if (variant === "cards") {
    return (
      <div className={`flex w-full flex-col gap-2.5 ${className ?? "lg:w-[580px] lg:shrink-0"}`}>
        {items.map((item, index) => {
          const expanded = open === index;

          return (
            <div key={item.q} className="rounded-3xl bg-mist px-6 py-6">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span className="text-[18px] font-medium leading-8 tracking-[-0.02em] text-ink">{item.q}</span>
                <Chevron open={expanded} />
              </button>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2 text-[16px] leading-6 text-ink">
                      <LinkedCopy text={item.a} />
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="border-t border-black/8">
      {items.map((item, index) => {
        const expanded = open === index;

        return (
          <div key={item.q} className="border-b border-black/8">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="text-[18px] font-medium tracking-[-0.03em]">{item.q}</span>
              <span className={`text-[22px] leading-none text-zinc-400 transition ${expanded ? "rotate-45" : ""}`} aria-hidden="true">
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 text-[15px] leading-6 text-zinc-600">
                    <LinkedCopy text={item.a} />
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-zinc-500 transition ${open ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="M3.2 6.2 8 10.4l4.8-4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
