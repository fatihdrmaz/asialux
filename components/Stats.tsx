"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const stats = [
  { key: "countries", value: "50+", suffix: "" },
  { key: "projects", value: "1000+", suffix: "" },
  { key: "years", value: "20+", suffix: "" },
  { key: "products", value: "500+", suffix: "" },
];

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-section md:py-section-lg bg-dark-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
