"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const FALLBACK_IMAGES: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  2: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  3: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  4: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  5: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  6: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  7: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  8: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
};

const products = [
  { id: 1, name: "Ray Spot AR-101", category: "Ray Spot" },
  { id: 2, name: "Sıva Altı SA-205", category: "Sıva Altı" },
  { id: 3, name: "Sıva Üstü SU-310", category: "Sıva Üstü" },
  { id: 4, name: "Aplik AP-450", category: "Aplik" },
  { id: 5, name: "Sarkıt SK-520", category: "Sarkıt" },
  { id: 6, name: "Dış Mekan DM-680", category: "Dış Mekan" },
  { id: 7, name: "Linear LN-720", category: "Linear" },
  { id: 8, name: "Magnet MG-850", category: "Magnet" },
];

export default function ProductGrid() {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const getProductImage = (id: number) => {
    if (failedImages.has(id)) return FALLBACK_IMAGES[id];
    return `/images/products/${id}.jpg`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          {/* Product Image – Kendi görseliniz: public/images/products/1.jpg … 8.jpg */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={getProductImage(product.id)}
              alt={product.name}
              onError={() => setFailedImages((prev) => new Set(prev).add(product.id))}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6">
            <span className="text-sm text-primary-600 font-semibold mb-2 block">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-dark-950 mb-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm">
              Premium LED aydınlatma çözümü
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
