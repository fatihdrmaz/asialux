"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Palette, Globe, Battery } from "lucide-react";

const features = [
  { id: "quality", icon: Award },
  { id: "design", icon: Palette },
  { id: "export", icon: Globe },
  { id: "energy", icon: Battery },
];

export default function Features() {
  const t = useTranslations("features");

  return (
    <section className="py-section md:py-section-lg bg-gray-50/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(29,78,216,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative"
      >
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-primary-600 bg-primary-50 mb-6">
            {t("valuesLabel")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-950 tracking-tight max-w-3xl mx-auto">
            {t("title")}
          </h2>
          <div className="mt-6 flex justify-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary-500" />
            <span className="w-4 h-0.5 rounded-full bg-primary-400/60" />
          </div>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/8 hover:border-primary-100 hover:-translate-y-1 card-hover">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-3xl font-display font-bold text-gray-100 group-hover:text-primary-100 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-950 mt-6 mb-3 tracking-tight">
                    {t(`${feature.id}.title`)}
                  </h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    {t(`${feature.id}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
