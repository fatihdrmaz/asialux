"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    titleKey: "project1",
    locationKey: "location1",
    image: "/images/ozel tasarım/ozel-tasarim-portfoyo-3.jpg",
    category: "residential",
  },
  {
    id: 2,
    titleKey: "project2",
    locationKey: "location2",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "office",
  },
  {
    id: 3,
    titleKey: "project3",
    locationKey: "location3",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    category: "outdoor",
  },
];

export default function ProjectPortfolio() {
  const t = useTranslations("projects");
  const locale = useLocale();

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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-950 mb-2">
              {t("title")}
            </h2>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>
          <Link
            href={locale === "tr" ? "/projects" : `/${locale}/projects`}
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
          >
            {t("viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={locale === "tr" ? `/projects#${project.id}` : `/${locale}/projects#${project.id}`}
                className="block overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300 card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={t(project.titleKey)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-dark-950 mb-1">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-gray-500 text-sm">{t(project.locationKey)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
