import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
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

export default async function ServiceGroupPage({ params }: PageProps) {
  const { slug } = await params;
  const group = resolveGroup("service", slug);
  if (group) return <GroupPage group={group} />;
  const offering = resolveOffering("service", slug);
  if (offering) redirect(`/services/${offering.group.id}`);
  notFound();
}
