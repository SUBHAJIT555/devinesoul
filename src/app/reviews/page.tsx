import type { Metadata } from "next";
import { ContactBand, HomeFaq } from "@/components/home-sections";
import { QuoteCard } from "@/components/testimonials-columns";
import { Button, GoogleIcon } from "@/components/ui";
import { getReviews, withChannels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description: "All 47 Google reviews from people who have sat with Priya at Divine Souls.",
};

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <main>
      <section className="bg-white px-6 pb-6 pt-[140px] sm:pt-[150px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">Explore</p>
          <h1 className="mt-3 text-balance text-[clamp(36px,6vw,56px)] font-medium leading-[1.1] tracking-[-0.04em] text-ink">
            Reviews
          </h1>
        </div>
      </section>
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <p className="max-w-2xl text-[17px] leading-7 tracking-[-0.015em] text-zinc-600">{reviews.intro}</p>
          <GoogleActions reviews={reviews} className="mt-8" />
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {reviews.items.map((item) => (
              <QuoteCard key={item.role} item={item} />
            ))}
          </div>
          <GoogleActions reviews={reviews} className="mt-10" />
        </div>
      </section>
      <ContactBand contact={withChannels(reviews.contact)} />
      <HomeFaq faq={reviews.faq} />
    </main>
  );
}

function GoogleActions({
  reviews,
  className,
}: {
  reviews: ReturnType<typeof getReviews>;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <Button href={reviews.googleHref} external>
        <GoogleIcon />
        {reviews.readCta}
      </Button>
      <Button href={reviews.rateHref} variant="gold" external>
        <GoogleIcon />
        {reviews.rateCta}
      </Button>
    </div>
  );
}
