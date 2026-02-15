"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const references = [
  { name: "Referans 1", logo: "/images/references/ref1.png" },
  { name: "Referans 2", logo: "/images/references/ref2.png" },
  { name: "Referans 3", logo: "/images/references/ref3.png" },
  { name: "Referans 4", logo: "/images/references/ref4.png" },
  { name: "Referans 5", logo: "/images/references/ref5.png" },
  { name: "Referans 6", logo: "/images/references/ref6.png" },
];

export default function References() {
  const t = useTranslations("references");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-950 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {references.map((ref, index) => (
            <motion.div
              key={ref.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              className="flex items-center justify-center h-20 px-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300"
            >
              <span className="text-lg font-semibold text-gray-500 truncate max-w-full">
                {ref.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
