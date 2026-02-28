"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

const showcaseImages = [
  { src: "/images/premium/image1.png", altKey: "image1Alt" },
  { src: "/images/premium/image2.png", altKey: "image2Alt" },
  { src: "/images/premium/image3.png", altKey: "image3Alt" },
] as const;

export default function Showcase() {
  const t = useTranslations("showcase");
  const locale = useLocale();
  const applicationsHref = locale === "tr" ? "/applications" : `/${locale}/applications`;

  return (
    <section className="py-section md:py-section-lg bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark-950">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseImages.map((image, index) => {
            const alt = t(image.altKey);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer card-hover"
              >
                <Image
                  src={image.src}
                  alt={alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href={applicationsHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-500/30"
          >
            {t("viewMore")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
