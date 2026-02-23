"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Palette, Globe, Battery } from "lucide-react";

const features = [
  { id: "quality", icon: Award, gradient: "from-blue-500 to-indigo-600" },
  { id: "design", icon: Palette, gradient: "from-violet-500 to-fuchsia-500" },
  { id: "export", icon: Globe, gradient: "from-emerald-500 to-teal-600" },
  { id: "energy", icon: Battery, gradient: "from-blue-600 to-indigo-700" },
];

export default function Features() {
  const t = useTranslations("features");

  return (
    <section className="py-24 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(29,78,216,0.08),transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600 mb-3">
            Değerlerimiz
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark-950 tracking-tight">
            {t("title")}
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-primary-500/60 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-3xl bg-gray-50/80 border border-gray-200/80 backdrop-blur-sm transition-all duration-300 hover:border-primary-200/60 hover:bg-white hover:shadow-xl hover:shadow-primary-500/5">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-black/5 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>

                  <h3 className="text-lg font-bold text-dark-950 mb-2 tracking-tight">
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
      </div>
    </section>
  );
}
