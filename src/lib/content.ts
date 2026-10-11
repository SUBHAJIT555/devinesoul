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
