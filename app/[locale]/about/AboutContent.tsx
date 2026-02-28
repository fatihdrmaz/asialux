"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

const IMAGE_STORY = "/images/aboutus/image1.png";
const IMAGE_QUALITY = "/images/aboutus/image2.png";
const IMAGE_PRODUCTION = "/images/aboutus/image3.png";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

export default function AboutContent() {
  const t = useTranslations("aboutPage");

  return (
    <div className="container mx-auto px-4 max-w-6xl py-section md:py-section-lg">
      {/* Hikayemiz — Image left, text right */}
      <motion.section
        {...fadeIn}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={IMAGE_STORY}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-950 mb-6">
            {t("storyTitle")}
          </h2>
          <p className="text-lg text-dark-900 font-medium mb-6 leading-relaxed">
            {t("storyIntro")}
          </p>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>{t("storyP1")}</p>
            <p>{t("storyP2")}</p>
          </div>
        </div>
      </motion.section>

      {/* Kalite Politikamız — Image right, text left */}
      <motion.section
        {...fadeIn}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32"
      >
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-950 mb-6">
            {t("qualityTitle")}
          </h2>
          <p className="text-lg text-dark-900 font-medium mb-6 leading-relaxed">
            {t("qualityIntro")}
          </p>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>{t("qualityP1")}</p>
            <p>{t("qualityP2")}</p>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
          <Image
            src={IMAGE_QUALITY}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.section>

      {/* Üretim ve Vizyonumuz — Image left, text right */}
      <motion.section
        {...fadeIn}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={IMAGE_PRODUCTION}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-950 mb-6">
            {t("productionTitle")}
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>{t("productionP1")}</p>
            <p>{t("productionP2")}</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
