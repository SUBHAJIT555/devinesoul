import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { ContactBand, Spotlight } from "@/components/home-sections";
import { Lines, Reveal } from "@/components/ui";
import { getContacts, getCourses, getProducts, getServices, getSite, offeringNames } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContacts();
  return { title: page.title, description: page.description };
}

export default async function ContactsPage() {
  const page = await getContacts();
  const site = getSite();
  const services = await getServices();
  const courses = await getCourses();
  const products = await getProducts();

  return (
    <main>
      <ContactBand contact={page.reach} lead />
      <Spotlight
        spotlight={{
          title: page.visit.title,
          aside: page.visit.body,
          mark: site.name,
          actions: page.visit.actions,
        }}
      />
      <section id="request" className="scroll-mt-32 px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <h2 className="max-w-md text-[clamp(32px,4vw,48px)] font-medium leading-[1.18] tracking-[-0.03em] text-ink">
              <Lines text={page.form.title} />
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-6 text-zinc-600">{page.form.body}</p>
          </Reveal>
          <Reveal>
            <ContactForm
              form={page.form}
              services={offeringNames(services.features)}
              courses={offeringNames(courses.items)}
              products={products.items.map((item) => item.name)}
            />
          </Reveal>
        </div>
      </section>
      <section className="bg-white px-5 pb-20 pt-[60px]">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-5">
          <Reveal className="w-full lg:w-[400px] lg:shrink-0">
            <h2 className="text-[18px] font-medium leading-6 tracking-[-0.02em] text-ink">{page.faq.title}</h2>
            <p className="mt-1.5 max-w-sm text-[16px] leading-6 text-zinc-500">{page.faq.intro}</p>
          </Reveal>
          <FaqList items={page.faq.items} variant="cards" />
        </div>
      </section>
    </main>
  );
}


