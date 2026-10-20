import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { site } from "@/data/site";
import "./globals.scss";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.firstName} ${site.lastName} — ${site.role}`,
    template: `%s · ${site.firstName} ${site.lastName}`,
  },
  description: site.intro,
  openGraph: {
    title: `${site.firstName} ${site.lastName}`,
    description: site.intro,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.firstName} ${site.lastName}`,
    description: site.intro,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#work">
          Skip to work
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
