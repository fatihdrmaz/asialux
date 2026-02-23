"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const CERTIFICATES_PATH = "/images/certificates";

const certificateFiles = [
  "ce-1-725x1024-1.webp",
  "ce-2-725x1024-1.webp",
  "iso-725x1024-1.webp",
  "MASIALUX-AYDINLATMA-9001-1-746x1024-1.webp",
  "Masialux-Original-Certificate-1-1-724x1024-1.webp",
  "Masialux-Original-Certificate-1-2-724x1024-1.webp",
  "interior-applique-1-724x1024-1.webp",
  "pendant-1-724x1024-1.webp",
  "recessed-1-724x1024-1.webp",
  "surface-mounted-1-724x1024-1.webp",
  "track-spot-1-724x1024-1.webp",
];

function getCertificateLabel(filename: string): string {
  const base = filename.replace(/-\d+-\d+x\d+(-1)?\.webp$/i, "").replace(/-/g, " ");
  if (base.toLowerCase().startsWith("ce ")) return "CE";
  if (base.toLowerCase().includes("iso") || base.toLowerCase().includes("9001")) return "ISO 9001";
  if (base.toLowerCase().includes("original")) return "Original Certificate";
  if (base.toLowerCase().includes("interior")) return "Interior Applique";
  if (base.toLowerCase().includes("pendant")) return "Pendant";
  if (base.toLowerCase().includes("recessed")) return "Recessed";
  if (base.toLowerCase().includes("surface")) return "Surface Mounted";
  if (base.toLowerCase().includes("track")) return "Track Spot";
  return base;
}

export default function Certificates() {
  const t = useTranslations("certificates");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50" id="certificates">
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {certificateFiles.map((file, index) => {
            const src = `${CERTIFICATES_PATH}/${file}`;
            const label = getCertificateLabel(file);
            return (
              <motion.button
                key={file}
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 text-left"
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <span className="text-white text-sm font-medium drop-shadow-md">{label}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-h-[90vh] max-w-full w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`${CERTIFICATES_PATH}/${certificateFiles[lightboxIndex]}`}
                alt={getCertificateLabel(certificateFiles[lightboxIndex])}
                width={725}
                height={1024}
                className="object-contain max-h-[90vh] w-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
