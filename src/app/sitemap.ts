import type { MetadataRoute } from "next";
import catalog from "@/data/catalog.json";

export const dynamic = "force-static";

const siteUrl = "https://divinesoulsbypriya.in";

const pages = [
  "",
  "/about",
  "/services",
  "/courses",
  "/products",
  "/contacts",
  "/faq",
  "/reviews",
  "/terms-and-conditions",
  "/privacy-policy",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const groups = catalog.groups.flatMap((group) => [`/services/${group.id}`, `/courses/${group.id}`]);

  return [...pages, ...groups].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date("2026-11-03"),
  }));
}
