import Link from "next/link";
import type { Quote } from "@/lib/types";

export type MarqueeItem = {
  title: string;
  text: string;
  image?: string;
  meta?: string;
  href?: string;
  showStars?: boolean;
  imageRound?: boolean;
};

const defaultRows = [
  { shift: 0, track: "marquee-track-reverse", duration: "44s" },
  { shift: 3, track: "marquee-track", duration: "52s" },
] as const;

const aboutPace = 8;

function rowDuration(count: number, index: number) {
  const secondsPerItem = index % 2 === 0 ? 8 : 9.5;
  return `${Math.round(Math.max(count, aboutPace) * secondsPerItem)}s`;
}

export function quotesToMarquee(items: Quote[]): MarqueeItem[] {
  return items.map((item) => ({
    title: item.role,
    text: item.text,
    image: item.image,
    showStars: true,
    imageRound: true,
  }));
}

export function QuoteMarquee({ items, rows }: { items?: MarqueeItem[]; rows?: MarqueeItem[][] }) {
  const bands = rows?.length
    ? rows.map((row, index) => ({
        items: row,
        track: index % 2 === 0 ? "marquee-track-reverse" : "marquee-track",
        duration: rowDuration(row.length, index),
      }))
    : defaultRows.map((row) => ({
        items: rotate(items ?? [], row.shift),
        track: row.track,
        duration: row.duration,
      }));

  return (
    <div className="quote-marquee relative z-10 bg-mist/40">
      <div className="relative overflow-hidden py-3.5 sm:py-4">
        <div className="flex flex-col gap-2.5">
          {bands.map((band, index) => (
            <Row key={index} items={band.items} track={band.track} duration={band.duration} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent sm:w-20" />
      </div>
    </div>
  );
}

function Row({
  items,
  track,
  duration,
}: {
  items: MarqueeItem[];
  track: string;
  duration: string;
}) {
  const reverse = track.includes("reverse");
  return (
    <div
      className={`${track} flex w-max items-stretch`}
      style={{ animation: `marquee ${duration} linear infinite${reverse ? " reverse" : ""}` }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-stretch gap-2.5 pr-2.5" aria-hidden={copy === 1}>
          {items.map((item) => (
            <Card key={`${copy}-${item.meta ?? ""}-${item.title}-${item.text}`} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Card({ item }: { item: MarqueeItem }) {
  const review = Boolean(item.showStars);
  const category = !review && item.title !== item.text ? item.title : null;
  const body = (
    <figure className="flex h-full w-[228px] shrink-0 flex-col justify-between rounded-xl bg-white p-3 shadow-[0_8px_19.1px_-7px_rgba(0,0,0,0.06)] subpixel-antialiased sm:w-[252px] sm:p-3.5">
      {review ? (
        <blockquote className="line-clamp-2 text-[12px] leading-[17px] tracking-[-0.02em] text-black">
          {shorten(item.text)}
        </blockquote>
      ) : (
        <p className="line-clamp-2 text-[14px] font-semibold leading-[18px] tracking-[-0.03em] text-ink">
          {item.text}
        </p>
      )}
      <figcaption className="mt-2.5 flex items-center gap-2">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className={`h-7 w-7 shrink-0 object-cover ${item.imageRound ? "rounded-full" : "rounded-md"}`}
          />
        ) : null}
        <span className="min-w-0">
          {review ? (
            <span className="block truncate text-[12px] font-semibold leading-none tracking-[-0.02em] text-black">
              {item.title}
            </span>
          ) : category || item.meta ? (
            <span className="block truncate text-[11px] leading-none text-zinc-500">
              {[category, item.meta].filter(Boolean).join(" · ")}
            </span>
          ) : null}
          {review ? (
            <span className="mt-1 block">
              <Stars />
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="flex no-underline">
        {body}
      </Link>
    );
  }

  return body;
}

function rotate(items: MarqueeItem[], shift: number) {
  if (!items.length) return items;
  const offset = shift % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

function shorten(text: string, max = 92) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${cut.slice(0, at > 40 ? at : max).trim()}…`;
}

function Stars() {
  return (
    <span className="inline-flex text-[#fbbc04]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 12 12" className="h-2.5 w-2.5">
          <path
            fill="currentColor"
            d="M6 1.1 7.3 4l3.2.3-2.4 2.1.7 3.1L6 8.1 3.2 9.5l.7-3.1L1.5 4.3 4.7 4 6 1.1Z"
          />
        </svg>
      ))}
    </span>
  );
}
