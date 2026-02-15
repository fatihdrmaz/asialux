"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Shield, CheckCircle } from "lucide-react";

const certificates = [
  { key: "ce", icon: Shield, label: "CE" },
  { key: "iso", icon: Award, label: "ISO 9001" },
  { key: "rohs", icon: CheckCircle, label: "RoHS" },
];

export default function Certificates() {
  const t = useTranslations("certificates");

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
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 min-w-[160px]"
              >
                <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <span className="font-bold text-dark-950">{cert.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
