"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const showcaseImages = [
  {
    src: "/images/ozel%20tasar%C4%B1m/ozel-tasarim-portfoyo-3.jpg",
    alt: "Özel tasarım portföy 1",
  },
  {
    src: "/images/ozel%20tasar%C4%B1m/ozel-tasarim-portfoyo-4.jpg",
    alt: "Özel tasarım portföy 2",
  },
  {
    src: "/images/ozel%20tasar%C4%B1m/ozel-tasarim-portfoyo-5.jpg",
    alt: "Özel tasarım portföy 3",
  },
];

export default function Showcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark-950">
            Premium Tasarımlarımız
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modern mekanlarda hayat bulan aydınlatma çözümlerimiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold drop-shadow-lg">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
