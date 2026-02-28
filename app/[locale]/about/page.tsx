import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AboutContent from "./AboutContent";
import Certificates from "@/components/Certificates";
import { getAlternates } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const title = t("title");
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: getAlternates("about", locale),
    openGraph: { title, description },
  };
}

const HERO_IMAGE = "/images/aboutus/hero.jpg";

export default async function AboutPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero with full-width image */}
      <section className="relative h-[50vh] min-h-[320px] md:min-h-[420px] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-12 md:pb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-3 drop-shadow-lg">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-xl drop-shadow-md">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <AboutContent />

      {/* Sertifikalar */}
      <Certificates />
    </div>
  );
}
