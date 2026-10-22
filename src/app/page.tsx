import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import {
  Bento,
  CompareBand,
  ContactBand,
  HomeFaq,
  Spotlight,
  Statement,
  Steps,
  Stories,
  Voices,
} from "@/components/home-sections";
import { QuoteMarquee, quotesToMarquee } from "@/components/quote-marquee";
import { getHome, getReviews } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();

  return {
    title: { absolute: home.seoTitle },
    description: home.description,
  };
}

export default async function Page() {
  const home = await getHome();
  const reviews = getReviews();

  return (
    <main>
      <Hero hero={home.hero} />
      <section className="bg-white pt-6 md:pt-8">
        <QuoteMarquee rows={[quotesToMarquee(reviews.items)]} duration="150s" />
      </section>
      <Statement statement={home.statement} />
      <Stories stories={home.stories} />
      <CompareBand compare={home.compare} />
      <Bento bento={home.bento} />
      <Spotlight spotlight={home.spotlight} />
      <Steps steps={home.steps} />
      <Voices voices={home.voices} />
      <ContactBand contact={home.contact} />
      <HomeFaq faq={home.faq} />
    </main>
  );
}
