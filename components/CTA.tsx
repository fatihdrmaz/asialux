"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <section className="py-section md:py-section-lg bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {t("subtitle")}
          </p>
          <Link
            href={locale === 'tr' ? '/contact' : `/${locale}/contact`}
            className="group btn-primary"
          >
            {t("ctaButton")}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
