"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/** public/images/categories/ içindeki dosya adları (sizin eklediğiniz: rayspot, sivaustu, sivaalti, aplik, sarkit, dismekan, linear, magnet) */
const CATEGORY_IMAGE_FILES: Record<string, string> = {
  "ray-spot": "rayspot",
  "surface-mounted": "sivaustu",
  "recessed": "sivaalti",
  "wall-light": "aplik",
  "pendant": "sarkit",
  "outdoor": "dismekan",
  "linear": "linear",
  "magnet": "magnet",
};

const FALLBACK_IMAGES: Record<string, string> = {
  "ray-spot": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "surface-mounted": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "recessed": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "wall-light": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "pendant": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "outdoor": "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "linear": "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "magnet": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
};

const categories = [
  { id: "ray-spot" },
  { id: "surface-mounted" },
  { id: "recessed" },
  { id: "wall-light" },
  { id: "pendant" },
  { id: "outdoor" },
  { id: "linear" },
  { id: "magnet" },
];

export default function ProductCategories() {
  const t = useTranslations("products");
  const locale = useLocale();
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const getCategoryImage = (id: string) => {
    if (failedImages.has(id)) return FALLBACK_IMAGES[id];
    const filename = CATEGORY_IMAGE_FILES[id] ?? id;
    return `/images/categories/${filename}.png`;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark-950">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const categoryKey = category.id
              .split("-")
              .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
              .join("");
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={locale === 'tr' ? (category.id === 'ray-spot' ? '/products/ray-spot' : `/products#${category.id}`) : (category.id === 'ray-spot' ? `/${locale}/products/ray-spot` : `/${locale}/products#${category.id}`)}
                  className="group block overflow-hidden rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                >
                  <div className="relative h-[212px] overflow-hidden">
                    <Image
                      src={getCategoryImage(category.id)}
                      alt={t(categoryKey as any)}
                      onError={() => setFailedImages((prev) => new Set(prev).add(category.id))}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {t(categoryKey as any)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Premium çözümler
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
