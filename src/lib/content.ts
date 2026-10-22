import aboutData from "@/data/about.json";
import contactsData from "@/data/contacts.json";
import coursesData from "@/data/courses.json";
import homeData from "@/data/home.json";
import productsData from "@/data/products.json";
import servicesData from "@/data/services.json";
import siteData from "@/data/site.json";
import type {
  AboutContent,
  ContactsContent,
  CoursesContent,
  HomeContent,
  ProductsContent,
  ServicesContent,
  SiteContent,
} from "@/lib/types";

export function getSite() {
  return siteData as SiteContent;
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
