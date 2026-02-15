import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Applications from "@/components/Applications";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <Features />
      <Showcase />
      <Applications />
      <CTA />
    </>
  );
}
