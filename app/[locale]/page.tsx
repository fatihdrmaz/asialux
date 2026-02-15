import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import References from "@/components/References";
import Showcase from "@/components/Showcase";
import Applications from "@/components/Applications";
import ProjectPortfolio from "@/components/ProjectPortfolio";
import Certificates from "@/components/Certificates";
import CTA from "@/components/CTA";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProductCategories />
      <Features />
      <Stats />
      <References />
      <Showcase />
      <Applications />
      <ProjectPortfolio />
      <Certificates />
      <CTA />
    </>
  );
}
