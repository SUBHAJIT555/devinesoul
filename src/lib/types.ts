export type LinkItem = {
  label: string;
  href: string;
};

export type NavMenuItem = {
  label: string;
  href: string;
  body: string;
  tone: "blue" | "amber" | "green" | "violet" | "red" | "mist";
  icon: "heart" | "cards" | "sun" | "flame" | "spark" | "device" | "eye" | "moon";
};

export type NavItem = LinkItem & {
  menu?: NavMenuItem[];
};

export type SiteContent = {
  name: string;
  title: string;
  description: string;
  cta: LinkItem;
  nav: NavItem[];
  footer: {
    blurb: string;
    columns: { title: string; links: LinkItem[] }[];
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
    notes: string[];
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

export type AboutContent = {
  title: string;
  description: string;
  hero: {
    eyebrow: string;
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
    items: { index: string; title: string; body: string; figure?: string }[];
  };
  purpose: {
    title: string;
    body: string;
    items: { title: string; body: string; tone: "dark" | "light"; points: string[] }[];
  };
  closing: { title: string; body: string; cta: string; href: string };
};

export type Course = {
  id: string;
  title: string;
  level: string;
  length: string;
  summary: string;
  tone: "blue" | "orange" | "violet" | "mist";
};

export type CoursesContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; body: string };
  filters: string[];
  items: Course[];
  closing: { title: string; body: string; cta: string; href: string };
};

export type ServicesContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; body: string };
  items: { id: string; index: string; title: string; body: string; points: string[] }[];
  method: {
    title: string;
    body: string;
    items: { index: string; title: string; body: string }[];
  };
  closing: { title: string; body: string; cta: string; href: string };
};

export type ProductsContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; body: string };
  items: {
    name: string;
    summary: string;
    points: string[];
    tone: "blue" | "orange" | "violet";
  }[];
  specs: { title: string; items: { title: string; body: string }[] };
  closing: { title: string; body: string; cta: string; href: string };
};

export type ContactsContent = {
  title: string;
  description: string;
  hero: { eyebrow: string; title: string; body: string };
  channels: { title: string; body: string; value: string }[];
  form: {
    title: string;
    body: string;
    submit: string;
    topics: string[];
    success: string;
  };
  faq: { title: string; intro: string; items: FaqItem[] };
};
