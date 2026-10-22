"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Quote } from "@/lib/types";

export function TestimonialsColumns({ items }: { items: Quote[] }) {
  const reduce = useReducedMotion();
  const two = split(items, 2);
  const four = split(items, 4);

  return (
    <div
      className="flex w-full justify-center gap-2.5 overflow-hidden"
      style={{
        height: 540,
        maskImage: "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
      }}
    >
      <Column items={items} duration={18} reduce={Boolean(reduce)} className="w-full max-w-md sm:hidden" />
      <Column items={two[0]} duration={15} reduce={Boolean(reduce)} className="hidden w-full sm:block lg:hidden" />
      <Column items={two[1]} duration={19} reduce={Boolean(reduce)} className="hidden w-full sm:block lg:hidden" />
      <Column items={four[0]} duration={15} reduce={Boolean(reduce)} className="hidden w-full lg:block" />
      <Column items={four[1]} duration={19} reduce={Boolean(reduce)} className="hidden w-full lg:block" />
      <Column items={four[2]} duration={17} reduce={Boolean(reduce)} className="hidden w-full lg:block" />
      <Column items={four[3]} duration={21} reduce={Boolean(reduce)} className="hidden w-full lg:block" />
    </div>
  );
}

function Column({
  items,
  duration,
  reduce,
  className,
}: {
  items: Quote[];
  duration: number;
  reduce: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={reduce ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-2.5 pb-2.5"
      >
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {items.map((item) => (
              <QuoteCard key={`${copy}-${item.role}`} item={item} />
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export function QuoteCard({ item }: { item: Quote }) {
  return (
    <figure className="flex flex-col gap-5 rounded-xl bg-mist p-5 shadow-[0_8px_19.1px_-7px_rgba(0,0,0,0.06)] border-b border-black/7">
      {item.text ? <blockquote className="text-[14px] leading-[21px] tracking-[-0.03em] text-black">{item.text}</blockquote> : null}
      <figcaption className="flex items-center gap-2">
        {item.image ? (
          <img src={item.image} alt="" className="h-[46px] w-[46px] shrink-0 rounded-full object-cover" />
        ) : (
          <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-white text-[14px] font-semibold tracking-[-0.03em] text-ink">
            {item.role.trim().charAt(0)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-[16.8px] tracking-[-0.03em] text-black">{item.role}</span>
          <span className="mt-1 block">
            <Stars />
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <span className="inline-flex text-[#f5b301]" aria-label="5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 1.1 7.3 4l3.2.3-2.4 2.1.7 3.1L6 8.1 3.2 9.5l.7-3.1L1.5 4.3 4.7 4 6 1.1Z"
          />
        </svg>
      ))}
    </span>
  );
}

function split(items: Quote[], count: number) {
  return Array.from({ length: count }, (_, column) => items.filter((_, index) => index % count === column));
}
