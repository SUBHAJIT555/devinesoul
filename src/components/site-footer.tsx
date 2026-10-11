import Link from "next/link";
import type { SiteContent } from "@/lib/types";
import { Mark } from "@/components/ui";

export function SiteFooter({ site }: { site: SiteContent }) {
  return (
    <footer>
      <div className="h-[50px] bg-[#0f071c]" aria-hidden="true">
        <div className="h-full rounded-b-[30px] bg-white" />
      </div>
      <div className="bg-[linear-gradient(#0f071c,#085a7a)] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-white">
              <Mark className="h-5 w-5" />
              <span className="text-[16px] font-medium tracking-[-0.03em]">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-6 text-white/70">{site.footer.blurb}</p>
          </div>
          {site.footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-[13px] font-medium text-white/50">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-[15px] text-white transition-colors hover:text-white/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6 pb-10">
          <p className="font-meta text-[12px] tracking-normal text-white/50">{site.footer.note}</p>
          <p className="hidden text-[clamp(48px,8vw,96px)] font-medium leading-none tracking-[-0.05em] text-white/10 sm:block">
            {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
