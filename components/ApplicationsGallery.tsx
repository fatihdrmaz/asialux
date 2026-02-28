"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const PROJECT_IMAGES = [
  "uygulamalarimiz-1.png",
  "uygulamalarimiz-5.png",
  "uygulamalarimiz-6.png",
  "uygulamalarimiz-7.png",
  "uygulamalarimiz-8.png",
  "uygulamalarimiz-10.png",
  "uygulamalarimiz-11.png",
  "uygulamaarimiz-12.png",
  "uygulamarimiz-3.png",
  "uygulamarimiz-4.png",
  "uygulamarimiz-9.png",
  "ozel-tasarim-portfoyo-3.jpg",
  "ozel-tasarim-portfoyo-4.jpg",
  "ozel-tasarim-portfoyo-5.jpg",
];

const IMAGE_BASE = "/images/project";

export default function ApplicationsGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onEscape);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.documentElement.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {PROJECT_IMAGES.map((filename, index) => (
          <motion.button
            key={filename}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg shadow-gray-200/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary-900/10 group-hover:border-primary-200/60 group-hover:scale-[1.02] card-hover">
              <Image
                src={`${IMAGE_BASE}/${filename}`}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              {/* Hover overlay + zoom icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/90 text-primary-600 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-7 h-7" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-5xl flex items-center justify-center max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh] max-h-[88vh] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={`${IMAGE_BASE}/${PROJECT_IMAGES[lightboxIndex]}`}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={lightboxIndex < 4}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
