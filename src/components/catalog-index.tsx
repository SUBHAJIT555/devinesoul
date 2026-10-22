import Link from "next/link";
import { Check, Reveal } from "@/components/ui";
import type { CatalogGroup, OfferingKind } from "@/lib/types";

const wash = {
  blue: "bg-[#dff2fe]",
  violet: "bg-[#ece9fe]",
  peach: "bg-[#ffedd4]",
} as const;

export function CatalogIndex({
  groups,
  kind,
  chip,
  title,
}: {
  groups: CatalogGroup[];
  kind: OfferingKind;
  chip: string;
  title: string;
}) {
  const root = kind === "service" ? "/services" : "/courses";

  return (
    <section className="bg-white px-6 pb-20 pt-4">
      <div className="mx-auto flex max-w-[1000px] flex-col">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="inline-flex rounded-md border-b border-white bg-mist px-3 py-3 text-[12px] font-normal leading-none text-black shadow-md">
            {chip}
          </span>
          <h2 className="max-w-[700px] text-balance text-[clamp(32px,4vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            {title}
          </h2>
        </Reveal>
        <div className="mt-16 flex flex-col gap-6">
          {groups.map((group) => (
            <article
              key={group.id}
              id={group.id}
              className={`scroll-mt-32 rounded-[30px] p-5 sm:p-7 ${wash[group.tone]}`}
            >
              <Reveal>
                <h2 className="text-[clamp(26px,3vw,34px)] font-normal leading-[1.2] tracking-[-0.04em] text-ink">
                  {group.title}
                </h2>
                <p className="mt-3 max-w-xl text-[16px] leading-6 text-zinc-600">{group.summary}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`${root}/${item.slug}`}
                        className="flex items-start gap-3 rounded-2xl bg-white/70 px-3 py-3 text-[15px] leading-6 text-ink no-underline hover:bg-white"
                      >
                        <Check />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
