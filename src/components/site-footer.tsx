import Link from "next/link";
import type { FooterContactItem, LinkItem, SiteContent } from "@/lib/types";
import { Mark } from "@/components/ui";

const linkClass = "text-[15px] leading-5 text-white transition-colors hover:text-white/70";

function FooterLink({ link }: { link: LinkItem }) {
  const external = link.href.startsWith("http");

  if (external || link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a href={link.href} className={linkClass} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

function ContactLink({ item }: { item: FooterContactItem }) {
  const external = item.href.startsWith("http");

  return (
    <a
      href={item.href}
      className="block text-white transition-colors hover:text-white/70"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="block text-[13px] font-medium text-white/50">{item.label}</span>
      <span className="mt-1 block break-words text-[15px] leading-5">{item.value}</span>
    </a>
  );
}

export function SiteFooter({ site }: { site: SiteContent }) {
  const { footer } = site;

  return (
    <footer>
      <div className="h-[50px] bg-[#0f071c]" aria-hidden="true">
        <div className="h-full rounded-b-[30px] bg-white" />
      </div>
      <div className="bg-[linear-gradient(#0f071c,#085a7a)] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.15fr_0.95fr_1.15fr] lg:gap-8">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center gap-2 text-white">
              <Mark className="h-5 w-5" />
              <span className="text-[16px] font-medium tracking-[-0.03em]">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-6 text-white/70">{footer.blurb}</p>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.explore.title}</p>
            <ul className="mt-4 space-y-2.5">
              {footer.explore.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.services.title}</p>
            <ul className="mt-4 space-y-2.5">
              {footer.services.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] font-medium text-white/50">{footer.services.coursesTitle}</p>
            <ul className="mt-4 space-y-2.5">
              {footer.services.courses.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.social.title}</p>
            <ul className="mt-4 space-y-2.5">
              {footer.social.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] font-medium text-white/50">{footer.social.legalTitle}</p>
            <ul className="mt-4 space-y-2.5">
              {footer.social.legal.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.contact.title}</p>
            <ul className="mt-4 space-y-4">
              {footer.contact.items.map((item) => (
                <li key={item.label}>
                  <ContactLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 border-t border-white/10 px-6 py-8">
          <div className="flex flex-col gap-2">
            <p className="font-meta text-[12px] tracking-normal text-white/50">{footer.note}</p>
            <p className="font-meta flex flex-wrap items-center gap-x-1.5 text-[12px] tracking-normal text-white/50">
              <span>Handcrafted with</span>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/80" fill="currentColor" aria-hidden="true">
                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185-.048.041-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082-7.493-7.422a6 6 0 0 1 3.176-10.215z" />
              </svg>
              <span>
                by{" "}
                <a
                  href="https://subhajit-dhali.vercel.app/"
                  className="text-white/50 underline-offset-2 underline transition-colors hover:text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subhajit
                </a>
              </span>
            </p>
          </div>
          <p className="hidden text-[clamp(48px,8vw,96px)] font-medium leading-none tracking-[-0.05em] text-white/10 sm:block">{site.name}</p>
        </div>
      </div>
    </footer>
  );
}
