import { Button, Lines, Reveal } from "@/components/ui";

export function PageHero({
  eyebrow,
  title,
  body,
  cta,
  href,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="px-6 pb-8 pt-36 sm:pt-40">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(40px,5vw,56px)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
          <Lines text={title} />
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-6 text-zinc-600">{body}</p>
        {cta && href ? (
          <div className="mt-8">
            <Button href={href}>{cta}</Button>
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}

export function PageClose({
  title,
  body,
  cta,
  href,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-6xl rounded-[32px] bg-nav px-6 py-14 text-white sm:px-12">
        <h2 className="max-w-xl text-[clamp(32px,4vw,44px)] font-medium leading-[1.18] tracking-[-0.03em]">
          <Lines text={title} />
        </h2>
        <p className="mt-4 max-w-lg text-[16px] leading-6 text-white/75">{body}</p>
        <div className="mt-8">
          <Button href={href}>{cta}</Button>
        </div>
      </Reveal>
    </section>
  );
}
