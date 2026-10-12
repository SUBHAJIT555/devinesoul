import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Inter } from "next/font/google";
import { HashScroll } from "@/components/hash-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSite } from "@/lib/content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    title: {
      default: site.title,
      template: `%s — ${site.name}`,
    },
    description: site.description,
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const site = await getSite();

  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-ink">
        <style>{`html, .quiet-scroll{scrollbar-width:none}html::-webkit-scrollbar, .quiet-scroll::-webkit-scrollbar{display:none}.marquee-mask{mask-image:linear-gradient(270deg,transparent 0%,#000 10%,#000 90%,transparent 100%)}`}</style>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <HashScroll />
          <SiteHeader site={site} />
          <div id="content">{children}</div>
          <SiteFooter site={site} />
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
