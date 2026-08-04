import type { Metadata } from "next";
import { Source_Sans_3, Syne } from "next/font/google";

import { BookingShell } from "@/components/booking-shell";
import { FloatingCta } from "@/components/floating-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SITE } from "@/lib/site";

import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.fullName} · ${SITE.tagline}`,
    description: SITE.description,
    locale: "nl_NL",
    type: "website",
    url: SITE.url,
    siteName: SITE.fullName,
    images: [{ url: "/hero.jpg", width: 2400, height: 1600, alt: SITE.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} · ${SITE.tagline}`,
    description: SITE.description,
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${syne.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <BookingShell>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <FloatingCta />
        </BookingShell>
      </body>
    </html>
  );
}
