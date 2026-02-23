import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AboutContent from "./AboutContent";
import Certificates from "@/components/Certificates";
import { Sparkles, Award, Factory } from "lucide-react";

type Props = { params: { locale: string } };

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1560185007-cde436e6a461?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

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

      {/* Highlight cards */}
      <section className="relative z-10 -mt-12 md:-mt-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-dark-950 mb-1">2002</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {t("since")}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-4">
                <Award className="w-7 h-7" />
              </div>
              <div className="text-lg font-semibold text-dark-900 mb-1">{t("sisterBrand")}</div>
              <div className="text-sm text-gray-600">{t("sameQuality")}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-4">
                <Factory className="w-7 h-7" />
              </div>
              <div className="text-lg font-semibold text-dark-900 mb-1">{t("sameProducts")}</div>
              <div className="text-sm text-gray-600">{t("sameProductsSubtitle")}</div>
            </div>
          </div>
        </div>
      </section>

      <AboutContent />

      {/* Sertifikalar */}
      <Certificates />
    </div>
  );
}
