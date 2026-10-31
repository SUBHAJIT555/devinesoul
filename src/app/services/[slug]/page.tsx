import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { GroupPage } from "@/components/group-page";
import { groupSlugs, offeringSlugs, resolveGroup, resolveOffering } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...new Set([...groupSlugs(), ...offeringSlugs()])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = resolveGroup("service", slug);
  if (group) return { title: group.title, description: group.lead };
  const offering = resolveOffering("service", slug);
  if (offering) return { title: offering.group.title, description: offering.group.summary };
  return {};
}

export default function ServiceGroupPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ServiceGroupFallback />}>
      <ServiceGroup params={params} />
    </Suspense>
  );
}

async function ServiceGroup({ params }: PageProps) {
  const { slug } = await params;
  const group = resolveGroup("service", slug);
  if (group) return <GroupPage group={group} />;
  const offering = resolveOffering("service", slug);
  if (offering) redirect(`/services/${offering.group.id}`);
  notFound();
}

function ServiceGroupFallback() {
  return (
    <main>
      <section className="bg-white px-6 pb-6 pt-[140px] sm:pt-[150px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[14px] font-medium tracking-[-0.02em] text-accent-deep">Services</p>
          <div className="mt-3 h-[clamp(40px,6vw,62px)] max-w-md rounded-md bg-zinc-100" />
        </div>
      </section>
      <section className="bg-white px-6 pb-14">
        <div className="mx-auto max-w-[1000px]">
          <div className="h-5 max-w-2xl rounded-md bg-zinc-100" />
          <div className="mt-3 h-5 max-w-xl rounded-md bg-zinc-100" />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="h-11 w-32 rounded-full bg-zinc-100" />
            <div className="h-11 w-36 rounded-full bg-zinc-100" />
            <div className="h-11 w-40 rounded-full bg-zinc-100" />
          </div>
        </div>
      </section>
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[clamp(26px,3vw,34px)] font-medium leading-[1.2] tracking-[-0.04em] text-ink">
            The sittings
          </h2>
          <p className="mt-3 max-w-xl text-[16px] leading-6 text-zinc-600">
            Each sitting has its own method. Choose the one that matches what you are carrying, then
            request it or write on WhatsApp.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[0, 1].map((index) => (
              <article
                key={index}
                className="flex h-full flex-col rounded-[30px] bg-zinc-50 p-3"
              >
                <div className="aspect-[3/2] w-full rounded-[18px] bg-zinc-100" />
                <div className="px-3 pb-4 pt-6">
                  <div className="h-7 w-2/3 rounded-md bg-zinc-100" />
                  <div className="mt-3 h-4 w-full rounded-md bg-zinc-100" />
                  <div className="mt-2 h-4 w-5/6 rounded-md bg-zinc-100" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
