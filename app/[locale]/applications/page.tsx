import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getAlternates } from "@/lib/seo";
import Applications from "@/components/Applications";
import ApplicationsGallery from "@/components/ApplicationsGallery";
import { ArrowRight, Phone } from "lucide-react";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "applications" });
  const title = t("title");
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: getAlternates("applications", locale),
    openGraph: { title, description },
  };
}

export default async function ApplicationsPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("applications");
  const contactHref = locale === "tr" ? "/contact" : `/${locale}/contact`;

  return (
    <div className="min-h-screen pt-24 pb-0">
      {/* Proje Galerisi */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-950 mb-4">
              {t("galleryTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("gallerySubtitle")}
            </p>
          </div>
          <ApplicationsGallery />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark-950 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-bold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              {t("ctaButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+902122440605"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white font-semibold text-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              +90 212 244 06 05
            </a>
          </div>
        </div>
      </section>

      {/* Uygulama Alanlarımız */}
      <Applications />
    </div>
  );
}
