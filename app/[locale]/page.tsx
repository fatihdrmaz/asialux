import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import References from "@/components/References";
import Showcase from "@/components/Showcase";
import Applications from "@/components/Applications";
import CTA from "@/components/CTA";
import HomeBlogSection from "@/components/HomeBlogSection";
import { getAlternates, getBaseUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const title = t("title");
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: getAlternates("", locale),
    openGraph: { title, description },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);

  const base = getBaseUrl();
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Asialux",
    url: base,
    logo: `${base}/images/logo-w.webp`,
    description: "Premium LED lighting solutions: track spot, recessed, surface-mounted, pendant, outdoor and industrial lighting.",
    sameAs: [
      "https://instagram.com/asialux",
      "https://facebook.com/asialux",
      "https://linkedin.com/company/asialux",
    ],
  };
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Asialux",
    url: base,
    publisher: { "@id": `${base}/#organization` },
    inLanguage: ["tr", "en", "ar"],
  };

  return (
    <>
      <JsonLd data={[organizationLd, websiteLd]} />
      <Hero />
      <ProductCategories />
      <Features />
      <Stats />
      <References />
      <Showcase />
      <Applications />
      <CTA />
      <HomeBlogSection locale={locale} />
    </>
  );
}
