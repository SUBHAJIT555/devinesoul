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
      <span className="mt-1 block break-all text-[14px] leading-5 sm:break-words sm:text-[15px]">{item.value}</span>
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
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 pb-10 pt-8 sm:gap-12 sm:pb-16 sm:pt-10 lg:grid-cols-[0.85fr_1.1fr_1.1fr_0.9fr_1.15fr] lg:gap-8">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.explore.title}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {footer.explore.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.services.title}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {footer.services.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.services.coursesTitle}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {footer.services.courses.map((link) => (
                <li key={`course-${link.href}`}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white/50">{footer.social.title}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {footer.social.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] font-medium text-white/50 sm:mt-6">{footer.social.legalTitle}</p>
            <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
              {footer.social.legal.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 min-w-0 lg:col-span-1">
            <p className="text-[13px] font-medium text-white/50">{footer.contact.title}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:mt-4 sm:gap-y-4 lg:grid-cols-1">
              {footer.contact.items.map((item) => (
                <li key={item.label} className={item.value.includes("@") ? "col-span-2 lg:col-span-1" : undefined}>
                  <ContactLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 border-t border-white/10 px-6 py-8">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center gap-2 text-white">
              <Mark className="h-8 w-8" />
              <span className="text-[16px] font-medium tracking-[-0.03em]">{site.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-[15px] leading-6 text-white/70">{footer.blurb}</p>
            <p className="mt-5 font-meta text-[12px] tracking-normal text-white/50">{footer.note}</p>
            <p className="font-meta mt-2 flex flex-wrap items-center gap-x-1.5 text-[12px] tracking-normal text-white/50">
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
