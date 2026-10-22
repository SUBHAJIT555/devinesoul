import aboutData from "@/data/about.json";
import catalogData from "@/data/catalog.json";
import contactsData from "@/data/contacts.json";
import coursesData from "@/data/courses.json";
import homeData from "@/data/home.json";
import productsData from "@/data/products.json";
import reviewsData from "@/data/reviews.json";
import servicesData from "@/data/services.json";
import siteData from "@/data/site.json";
import type {
  AboutContent,
  CatalogContent,
  ContactsContent,
  CoursesContent,
  HomeContent,
  NavMenuItem,
  OfferingKind,
  PageContact,
  ProductsContent,
  ResolvedGroup,
  ResolvedOffering,
  ReviewsContent,
  ServicesContent,
  SiteContent,
} from "@/lib/types";

export function getCatalog() {
  return catalogData as CatalogContent;
}

export function catalogGroups() {
  return getCatalog().groups;
}

export function catalogTitles() {
  return catalogGroups().flatMap((group) => group.items.map((item) => item.title));
}

const navLook: Record<string, Pick<NavMenuItem, "tone" | "icon">> = {
  healings: { tone: "blue", icon: "handshake" },
  "ritual-castings": { tone: "red", icon: "flame" },
  "akashic-records": { tone: "violet", icon: "book" },
  plr: { tone: "amber", icon: "brain" },
  hoodoo: { tone: "red", icon: "sparkles" },
  divinations: { tone: "violet", icon: "crystal" },
  meditations: { tone: "green", icon: "flower" },
};

export function catalogNav(kind: OfferingKind): NavMenuItem[] {
  return catalogGroups().map((group) => ({
    label: group.title,
    href: groupHref(kind, group.id),
    body: kind === "service" ? group.summary : group.courseSummary,
    group: kind === "service" ? "Services" : "Courses",
    ...navLook[group.id],
  }));
}

export function withChannels(contact: PageContact): HomeContent["contact"] {
  return { ...contact, channels: getHome().contact.channels };
}

export function groupHref(kind: OfferingKind, groupId: string) {
  return `/${kind === "service" ? "services" : "courses"}/${groupId}`;
}

export function offeringByTitle(title: string) {
  for (const group of catalogGroups()) {
    const item = group.items.find((entry) => entry.title === title);
    if (item) return { item, group };
    if (group.title === title) return { item: group.items[0] ?? null, group };
  }
  return null;
}

export function offeringHref(kind: OfferingKind, title: string) {
  const match = offeringByTitle(title);
  if (!match) return kind === "service" ? "/services" : "/courses";
  if (match.item && match.group.items.length > 1) {
    return `${groupHref(kind, match.group.id)}#${match.item.slug}`;
  }
  return groupHref(kind, match.group.id);
}

export function resolveGroup(kind: OfferingKind, slug: string): ResolvedGroup | null {
  const group = catalogGroups().find((entry) => entry.id === slug);
  if (!group) return null;
  return {
    ...group,
    kind,
    href: groupHref(kind, group.id),
    lead: group.summary,
  };
}

export function resolveOffering(kind: OfferingKind, slug: string): ResolvedOffering | null {
  for (const group of catalogGroups()) {
    const item = group.items.find((entry) => entry.slug === slug);
    if (!item) continue;
    return {
      ...item,
      kind,
      group,
      href: `${groupHref(kind, group.id)}#${item.slug}`,
      lead: kind === "service" ? item.service : item.course,
    };
  }
  return null;
}

export function groupSlugs() {
  return catalogGroups().map((group) => group.id);
}

export function offeringSlugs() {
  return catalogGroups().flatMap((group) => group.items.map((item) => item.slug));
}

export function getSite() {
  const site = siteData as SiteContent;
  return {
    ...site,
    nav: site.nav.map((item) => {
      if (item.href === "/services") {
        return { ...item, menu: catalogNav("service") };
      }
      if (item.href === "/courses") {
        return { ...item, menu: catalogNav("course") };
      }
      return item;
    }),
    footer: {
      ...site.footer,
      services: {
        ...site.footer.services,
        links: catalogGroups().map((group) => ({ label: group.title, href: groupHref("service", group.id) })),
        courses: catalogGroups().map((group) => ({ label: group.title, href: groupHref("course", group.id) })),
      },
    },
  };
}

export function getHome() {
  return homeData as HomeContent;
}

export function getAbout() {
  return aboutData as AboutContent;
}

export function getCourses() {
  return coursesData as CoursesContent;
}

export function getServices() {
  return servicesData as ServicesContent;
}

export function getProducts() {
  return productsData as ProductsContent;
}

export function getContacts() {
  return contactsData as ContactsContent;
}

export function getReviews() {
  return reviewsData as ReviewsContent;
}

export function faqGroups() {
  return [
    { title: getHome().faq.title, intro: getHome().faq.intro, items: getHome().faq.items },
    { title: getAbout().faq.title, intro: getAbout().faq.intro, items: getAbout().faq.items },
    { title: getServices().faq.title, intro: getServices().faq.intro, items: getServices().faq.items },
    { title: getCourses().faq.title, intro: getCourses().faq.intro, items: getCourses().faq.items },
    { title: getProducts().faq.title, intro: getProducts().faq.intro, items: getProducts().faq.items },
    { title: getReviews().faq.title, intro: getReviews().faq.intro, items: getReviews().faq.items },
    { title: getContacts().faq.title, intro: getContacts().faq.intro, items: getContacts().faq.items },
  ];
}

export function allFaqs() {
  const seen = new Set<string>();
  return faqGroups()
    .flatMap((group) => group.items)
    .filter((item) => {
      if (seen.has(item.q)) return false;
      seen.add(item.q);
      return true;
    });
}

type OfferingGroup = {
  id: string;
  title: string;
  image: string;
  points: string[];
  body?: string;
  summary?: string;
};

export function offeringNames(groups: { title: string; points: string[] }[]) {
  return groups.flatMap((group) => (group.points.length ? group.points : [group.title]));
}

export function offeringMarquee(groups: OfferingGroup[], meta: string, hrefFor: (id: string) => string) {
  return groups.flatMap((group) => {
    const names = group.points.length ? group.points : [group.title];
    return names.map((name) => ({
      title: group.points.length ? group.title : name,
      text: name,
      image: group.image,
      meta,
      href: hrefFor(group.id),
    }));
  });
}

export function catalogMarquee(kind: OfferingKind) {
  const meta = kind === "service" ? "Service" : "Course";
  const root = kind === "service" ? "/services" : "/courses";
  return catalogGroups().flatMap((group) =>
    group.items.map((item) => ({
      title: group.title,
      text: item.title,
      image: item.image,
      meta,
      href: `${root}/${group.id}#${item.slug}`,
    })),
  );
}

export function groupMarquee(group: ResolvedGroup) {
  return group.items.map((item) => ({
    title: group.title,
    text: item.title,
    image: item.image,
    meta: group.kind === "service" ? "Service" : "Course",
    href: `${group.href}#${item.slug}`,
  }));
}
