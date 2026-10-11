import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { Reveal, SectionHeading } from "@/components/ui";
import { getContacts } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContacts();
  return { title: page.title, description: page.description };
}

export default async function ContactsPage() {
  const page = await getContacts();

  return (
    <main>
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} body={page.hero.body} />
      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4">
            {page.channels.map((channel) => (
              <Reveal key={channel.title}>
                <article className="rounded-[28px] bg-mist p-6">
                  <h2 className="text-[20px] font-medium tracking-[-0.03em]">{channel.title}</h2>
                  <p className="mt-2 text-[15px] leading-6 text-zinc-600">{channel.body}</p>
                  <p className="mt-4 text-[15px] font-medium text-accent-deep">{channel.value}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <ContactForm form={page.form} />
          </Reveal>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading title={page.faq.title} body={page.faq.intro} />
          </Reveal>
          <FaqList items={page.faq.items} />
        </div>
      </section>
    </main>
  );
}
