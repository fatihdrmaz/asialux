"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Coffee, Building2, Factory, TreePine, Sparkles } from "lucide-react";

const applications = [
  {
    id: "residential",
    icon: Home,
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cafe",
    icon: Coffee,
    gradient: "from-blue-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "office",
    icon: Building2,
    gradient: "from-indigo-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "industrial",
    icon: Factory,
    gradient: "from-gray-600 to-gray-800",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "outdoor",
    icon: TreePine,
    gradient: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "custom",
    icon: Sparkles,
    gradient: "from-rose-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Applications() {
  const t = useTranslations("applications");

  return (
    <section id="applications" className="py-20 bg-white">
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={app.image}
                    alt={t(app.id)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-50 group-hover:opacity-60 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-dark-900/35 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
                  <div className="w-20 h-20 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-center drop-shadow-lg">
                    {t(app.id)}
                  </h3>
                  <p className="text-center text-white/90 text-sm drop-shadow-md">
                    Profesyonel aydınlatma çözümleri
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
