"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { allProducts, getProductsByCategory, type Product } from "@/data/products";

const RAY_SPOT_FALLBACK =
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const FALLBACK_BY_CATEGORY: Record<string, string> = {
  "ray-spot": RAY_SPOT_FALLBACK,
  recessed: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "surface-mounted": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "wall-light": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  pendant: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  outdoor: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  linear: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  magnet: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
};

interface ProductGridProps {
  /** Sadece bu kategorideki ürünleri göster (örn. "ray-spot") */
  categorySlug?: string;
}

export default function ProductGrid({ categorySlug }: ProductGridProps) {
  const locale = useLocale();
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const products = useMemo(() => {
    if (categorySlug) return getProductsByCategory(categorySlug);
    return allProducts;
  }, [categorySlug]);

  const getProductImage = (product: Product) => {
    if (failedImages.has(product.id)) {
      return FALLBACK_BY_CATEGORY[product.categorySlug] ?? RAY_SPOT_FALLBACK;
    }
    return `/images/products/${product.categorySlug}/${product.id}.jpg`;
  };

  const getProductHref = (product: Product) => {
    if (categorySlug === "ray-spot") {
      return locale === "tr" ? `/products/ray-spot/${product.id}` : `/${locale}/products/ray-spot/${product.id}`;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const href = getProductHref(product);
        const card = (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={getProductImage(product)}
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
        );
        if (href) {
          return <Link href={href} key={product.id}>{card}</Link>;
        }
        return card;
      })}
    </div>
  );
}
