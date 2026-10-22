"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/types";
import { Lines } from "@/components/ui";

const wash: Record<Course["tone"], string> = {
  blue: "bg-[#dff2fe]",
  orange: "bg-[#ffedd4]",
  peach: "bg-[#ffedd4]",
  violet: "bg-[#ece9fe]",
  mist: "bg-mist",
};

export function CourseBoard({
  filters,
  items,
  title,
  intro,
}: {
  filters: string[];
  items: Course[];
  title?: string;
  intro?: string;
}) {
  const [active, setActive] = useState(filters[0] ?? "All");
  const visible = useMemo(
    () => (active === "All" ? items : items.filter((item) => item.level === active)),
    [active, items],
  );

  return (
    <section id="courses" className="scroll-mt-32 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {title ? (
          <div className="mb-8">
            <h2 className="max-w-xl text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em]">
              <Lines text={title} />
            </h2>
            {intro ? <p className="mt-4 max-w-xl text-[16px] leading-6 text-zinc-600">{intro}</p> : null}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Course levels">
          {filters.map((filter) => {
            const selected = filter === active;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(filter)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition ${selected ? "bg-nav text-white" : "bg-mist text-ink hover:bg-zinc-200"}`}
              >
                {filter}
              </button>
            );
          })}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <article id={item.id} key={item.id} className={`flex min-h-[260px] scroll-mt-32 flex-col rounded-[28px] p-6 ${wash[item.tone]}`}>
              <div className="flex items-center justify-between text-[13px] font-medium text-zinc-600">
                <span>{item.level}</span>
                <span>{item.length}</span>
              </div>
              <h2 className="mt-8 text-[28px] font-normal leading-[1.2] tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-6 text-zinc-700">{item.summary}</p>
            </article>
          ))}
        </div>
        {visible.length === 0 ? <p className="mt-8 text-zinc-500">Nothing in this group yet.</p> : null}
      </div>
    </section>
  );
}
