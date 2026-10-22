export type LinkItem = {
  label: string;
  href: string;
};

export type NavMenuItem = {
  label: string;
  href: string;
  body?: string;
  tone?: "blue" | "amber" | "green" | "violet" | "red" | "mist";
  icon?:
    | "heart"
    | "cards"
    | "sun"
    | "flame"
    | "spark"
    | "device"
    | "eye"
    | "moon"
    | "handshake"
    | "book"
    | "brain"
    | "sparkles"
    | "crystal"
    | "flower";
  group?: string;
};

export type NavItem = LinkItem & {
  menu?: NavMenuItem[];
  menuLayout?: "cards" | "list";
};

export type OfferingKind = "service" | "course";

export type CatalogItem = {
  slug: string;
  title: string;
  service: string;
  course: string;
  points: string[];
  image: string;
  imageAlt: string;
};

export type CatalogGroup = {
  id: string;
  title: string;
  summary: string;
  courseSummary: string;
  image: string;
  imageAlt: string;
  tone: "blue" | "violet" | "peach";
  items: CatalogItem[];
};

export type CatalogContent = {
  groups: CatalogGroup[];
};

export type ResolvedOffering = CatalogItem & {
  kind: OfferingKind;
  group: CatalogGroup;
  href: string;
  lead: string;
};

export type ResolvedGroup = CatalogGroup & {
  kind: OfferingKind;
  href: string;
  lead: string;
};

export type FooterContactItem = {
  label: string;
  value: string;
  href: string;
};

export type SiteContent = {
  name: string;
  title: string;
  description: string;
  cta: LinkItem;
  nav: NavItem[];
  footer: {
    blurb: string;
    explore: { title: string; links: LinkItem[] };
    services: { title: string; links: LinkItem[]; coursesTitle: string; courses: LinkItem[] };
    social: { title: string; links: LinkItem[]; legalTitle: string; legal: LinkItem[] };
    contact: { title: string; items: FooterContactItem[] };
    note: string;
  };
};

export type Quote = {
  text: string;
  role: string;
  place: string;
  image?: string;
};

export type Story = {
  id: string;
  badge: string;
  tone: "blue" | "orange" | "violet";
  title: string;
  intro: string;
  align: "left" | "right";
  image?: string;
  points?: string[];
  quote?: Quote;
};

export type Plan = {
  name: string;
  tag: string;
  price: string;
  unit: string;
  cadence: string;
  cta: string;
  href: string;
  featured: boolean;
  points: string[];
};

export type FaqItem = {
  q: string;
  a: string;
};

export type HomeContent = {
  seoTitle: string;
  description: string;
  hero: {
    headline: string;
    subhead: string;
    cta: string;
    ctaHref: string;
    whatsapp: string;
    whatsappHref: string;
    rating: string;
    ratingHref: string;
  };
  logos: {
    label: string;
    names: string[];
  };
  statement: {
    line1: string;
    line2: string;
    chapters: { id: string; label: string }[];
  };
  stories: Story[];
  compare: {
    eyebrow: string;
    title: string;
    body: string;
    before: string;
    after: string;
    beforeImage: string;
    afterImage: string;
    actions?: { label: string; href: string; variant?: "primary" | "secondary" | "dark" | "whatsapp" }[];
  };
  bento: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string; icon: string }[];
  };
  spotlight: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    actions?: { label: string; href: string; variant?: "primary" | "secondary" | "dark" | "whatsapp" }[];
  };
  steps: {
    eyebrow: string;
    title: string;
    items: { index: string; title: string; body: string; image: string }[];
  };
  voices: {
    title: string;
    cta: string;
    href: string;
    items: Quote[];
  };
  plans: {
    title: string;
    note: string;
    items: Plan[];
    features: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string; cta: string; href: string; icon: "help" | "people"; external?: boolean }[];
    channels: { name: string; handle: string; body: string; href: string; tone: "instagram" | "facebook" | "whatsapp" | "mail" | "location" }[];
  };
  faq: {
    title: string;
    intro: string;
    items: FaqItem[];
  };
  ribbon: string[];
  closing: {
    title: string;
    body: string;
    cta: string;
    href: string;
  };
};

export type PageContact = {
  eyebrow: string;
  title: string;
  cards: HomeContent["contact"]["cards"];
};

export type PhotoHeroContent = {
  title: string;
  body: string;
  cta: string;
  href: string;
  whatsapp: string;
  whatsappHref: string;
  notes: string[];
  image: string;
  imageAlt: string;
};

export type AboutContent = {
  title: string;
  description: string;
  hero: PhotoHeroContent & { eyebrow: string };
  features: {
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    align: "left" | "right";
    tone: "blue" | "violet";
    actions: {
      label: string;
      href: string;
      variant: "primary" | "dark" | "whatsapp";
      external?: boolean;
    }[];
  }[];
  gallery: {
    title: string;
    body: string;
    cta: string;
    href: string;
    whatsapp: string;
    whatsappHref: string;
    items: { src: string; thumb?: string; alt: string }[];
  };
  conquests: {
    title: string;
    items: {
      index: string;
      title: string;
      body: string;
      tone: "blue" | "violet" | "peach";
      image: string;
      imageAlt: string;
    }[];
  };
  story: {
    title: string;
    paragraphs: string[];
    aside: string;
  };
  values: {
    title: string;
    items: { title: string; body: string; icon: string }[];
  };
  path: {
    title: string;
    body: string;
    items: {
      index: string;
      title: string;
      body: string;
      figure?: string;
      actions?: { label: string; href: string; variant: "primary" | "whatsapp"; external?: boolean }[];
    }[];
  };
  purpose: {
    title: string;
    body: string;
    items: { title: string; body: string; tone: "dark" | "light"; points: string[] }[];
  };
  faq: HomeContent["faq"];
  contact: PageContact;
  closing: { title: string; body: string; cta: string; href: string };
};

export type Course = {
  id: string;
  title: string;
  level: string;
  length: string;
  summary: string;
  body: string;
  points: string[];
  tone: "blue" | "orange" | "violet" | "mist" | "peach";
  align: "left" | "right";
  image: string;
  imageAlt: string;
};

export type CoursesContent = {
  title: string;
  description: string;
  hero: PhotoHeroContent & { eyebrow: string };
  intro: { chip: string; title: string };
  filters: string[];
  items: Course[];
  faq: HomeContent["faq"];
  contact: PageContact;
  closing: { title: string; body: string; cta: string; href: string };
};

export type ServicesContent = {
  title: string;
  description: string;
  hero: PhotoHeroContent & { eyebrow: string };
  intro: { chip: string; title: string };
  features: {
    id: string;
    title: string;
    body: string;
    points: string[];
    image: string;
    imageAlt: string;
    align: "left" | "right";
    tone: "blue" | "violet" | "peach";
  }[];
  faq: HomeContent["faq"];
  contact: PageContact;
};

export type ProductsContent = {
  title: string;
  description: string;
  hero: PhotoHeroContent & { eyebrow: string };
  intro: { chip: string; title: string };
  items: {
    name: string;
    summary: string;
    points: string[];
    tone: "blue" | "orange" | "violet";
    image: string;
    imageAlt: string;
    align: "left" | "right";
  }[];
  specs: { title: string; items: { title: string; body: string; icon: string }[] };
  faq: HomeContent["faq"];
  contact: PageContact;
  closing: { title: string; body: string; cta: string; href: string };
};

export type ReviewsContent = {
  title: string;
  intro: string;
  googleHref: string;
  rateHref: string;
  readCta: string;
  rateCta: string;
  items: Quote[];
  faq: HomeContent["faq"];
  contact: PageContact;
};

export type ContactsContent = {
  title: string;
  description: string;
  reach: HomeContent["contact"];
  visit: {
    title: string;
    body: string;
    actions: { label: string; href: string; variant: "primary" | "secondary" | "whatsapp" }[];
  };
  form: {
    title: string;
    body: string;
    submit: string;
    success: string;
  };
  faq: { title: string; intro: string; items: FaqItem[] };
};
