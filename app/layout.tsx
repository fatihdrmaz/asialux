import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getBaseUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteName = "Asialux";
const defaultTitle = "Asialux - Premium Lighting Solutions";
const defaultDescription =
  "Premium LED lighting solutions: track spot, recessed, surface-mounted, pendant, outdoor and industrial lighting. Export-focused manufacturer.";
const defaultKeywords =
  "lighting, LED, track spot, recessed, surface mounted, pendant, outdoor lighting, industrial lighting, Asialux";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_GB", "ar_EG"],
    siteName,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
