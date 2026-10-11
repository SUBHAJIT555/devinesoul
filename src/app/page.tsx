import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import {
  Bento,
  CompareBand,
  ContactBand,
  HomeFaq,
  LogoRow,
  Spotlight,
  Statement,
  Steps,
  Stories,
  Voices,
} from "@/components/home-sections";
import { getHome } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();

  return {
    title: { absolute: home.seoTitle },
    description: home.description,
  };
}

export default async function Page() {
  const home = await getHome();

  return (
    <main>
      <Hero hero={home.hero} />
      <LogoRow logos={home.logos} />
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
