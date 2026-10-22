import { Button, Lines, PhoneIcon, WhatsAppIcon } from "@/components/ui";

export function PageLead({
  eyebrow,
  title,
  body,
  call,
  whatsapp,
  note,
}: {
  eyebrow: string;
  title: string;
  body: string;
  call: string;
  whatsapp: string;
  note?: string;
}) {
  return (
    <section className="bg-white px-6 pb-10 pt-[140px] sm:pt-[150px]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">{eyebrow}</p>
        <h1 className="mt-3 text-balance text-[clamp(36px,6vw,56px)] font-medium leading-[1.1] tracking-[-0.04em] text-ink">
          <Lines text={title} />
        </h1>
        <p className="mt-5 max-w-[34rem] text-[17px] leading-7 tracking-[-0.015em] text-zinc-600">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="tel:+917668648224">
            <PhoneIcon />
            {call}
          </Button>
          <Button href={whatsapp} variant="whatsapp" external>
            <WhatsAppIcon />
            WhatsApp
          </Button>
          {note ? (
            <Button href="#request" variant="secondary">
              {note}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
