"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

const references = [
  { name: "Avec", logo: "/images/references/avec.png" },
  { name: "Bambi", logo: "/images/references/bambi.jpg" },
  { name: "Bluemint", logo: "/images/references/bluemint.png" },
  { name: "Chamada Hotels", logo: "/images/references/chamada_hotels.png" },
  { name: "Giovanni Gentile", logo: "/images/references/giovanni%20gentile.png" },
  { name: "Gratis", logo: "/images/references/gratis.png" },
  { name: "Kronotrop", logo: "/images/references/kronotrop.jpeg" },
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 items-center"
        >
          {references.map((ref, index) => (
            <motion.div
              key={ref.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              className="flex items-center justify-center h-24 px-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 overflow-hidden"
            >
              <Image
                src={ref.logo}
                alt={ref.name}
                width={120}
                height={48}
                className="object-contain w-full h-full max-h-16"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
