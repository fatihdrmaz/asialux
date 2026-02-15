"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Palette, Globe, Battery } from "lucide-react";

const features = [
  {
    id: "quality",
    icon: Award,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "design",
    icon: Palette,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "export",
    icon: Globe,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "energy",
    icon: Battery,
    gradient: "from-orange-500 to-yellow-600",
  },
];

export default function Features() {
  const t = useTranslations("features");

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-dark-950">
                  {t(`${feature.id}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`${feature.id}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
