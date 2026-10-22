import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { ContactBand } from "@/components/home-sections";
import { Button, MailIcon, PhoneIcon, Reveal, WhatsAppIcon } from "@/components/ui";
import { faqGroups, withChannels } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Every question from the site — sittings, courses, products, reviews, and how to write Priya.",
};

export default function FaqPage() {
  const groups = faqGroups();

  return (
    <main>
      <section className="bg-white px-6 pb-6 pt-[140px] sm:pt-[150px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">Explore</p>
          <h1 className="mt-3 text-[clamp(36px,6vw,56px)] font-medium leading-[1.1] tracking-[-0.04em] text-ink">
            Frequently asked questions
          </h1>
        </div>
      </section>
      <section className="bg-white px-6 pb-12">
        <div className="mx-auto max-w-[1000px]">
          <p className="max-w-2xl text-[17px] leading-7 tracking-[-0.015em] text-zinc-600">
            Every question from the site, kept in one place. For anything personal, call or write Priya directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="tel:+917668648224">
              <PhoneIcon />
              Call now
            </Button>
            <Button href="mailto:priyasinha1809@gmail.com" variant="purple">
              <MailIcon />
              Email
            </Button>
            <Button href="https://wa.me/917668648224" variant="whatsapp" external>
              <WhatsAppIcon />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>
      {groups.map((group) => (
        <section key={group.title} className="bg-white px-6 pb-16">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-5">
            <Reveal className="w-full lg:w-[400px] lg:shrink-0">
              <h2 className="text-[18px] font-medium leading-6 tracking-[-0.02em] text-ink">{group.title}</h2>
              <p className="mt-1.5 max-w-sm text-[16px] leading-6 text-zinc-500">{group.intro}</p>
            </Reveal>
            <FaqList items={group.items} variant="cards" />
          </div>
        </section>
      ))}
      <ContactBand
        contact={withChannels({
          eyebrow: "Contact",
          title: "If the list\ndid not cover it.",
          cards: [
            {
              title: "Write to Priya",
              body: "A personal question does not belong in a list. Leave your name and a number. She will take it from there.",
              cta: "Contact Now",
              href: "/contacts",
              icon: "help",
            },
            {
              title: "Prefer WhatsApp?",
              body: "Send the question there. Call +91 7668648224 if you would rather speak.",
              cta: "WhatsApp",
              href: "https://wa.me/917668648224",
              icon: "people",
              external: true,
            },
          ],
        })}
      />
    </main>
  );
}
