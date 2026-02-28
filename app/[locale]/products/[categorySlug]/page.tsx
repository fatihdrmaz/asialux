import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { ChevronLeft } from "lucide-react";
import { getAlternates } from "@/lib/seo";

const CATEGORY_I18N_KEYS: Record<string, string> = {
  "ray-spot": "raySpot",
  "surface-mounted": "surfaceMounted",
  recessed: "recessed",
  linear: "linear",
  magnet: "magnet",
  "industrial-lighting": "industrialLighting",
  outdoor: "outdoor",
  "emergency-lighting": "emergencyLighting",
  "wall-light": "wallLight",
  "bronze-collection": "bronzeCollection",
  pendant: "pendant",
  "lamp-shade": "lampShade",
};

const CATEGORY_TITLES: Record<string, string> = {
  "ray-spot": "Ray Spot Aydınlatma",
  "surface-mounted": "Sıva Üstü Aydınlatma",
  recessed: "Sıva Altı Aydınlatma",
  linear: "Lineer Aydınlatma",
  magnet: "Magnet Ray Spot",
  "industrial-lighting": "Endüstriyel Aydınlatma",
  outdoor: "Dış Mekan Aydınlatma",
  "emergency-lighting": "Acil Aydınlatma ve Yönlendirmeler",
  "wall-light": "Aplik Aydınlatma",
  "bronze-collection": "Bronz Koleksiyon",
  pendant: "Sarkıt Aydınlatma",
  "lamp-shade": "Abajur ve Lambader",
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  "ray-spot": "Ray spot serisi ürünlerimiz; mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma çözümü sunar.",
  "surface-mounted": "Sıva üstü serisi ürünlerimiz.",
  recessed: "Sıva altı serisi ürünlerimiz.",
  linear: "Sıva üstü lineer serisi ürünlerimiz.",
  magnet: "Magnet ray spot serisi ürünlerimiz.",
  "industrial-lighting": "Endüstriyel aydınlatma ürünlerimiz.",
  outdoor: "Dış mekan aydınlatma ürünlerimiz.",
  "emergency-lighting": "YAMAS serisi acil aydınlatma ve yönlendirme armatürleri; sıva üstü, sarkıt ve sıva altı seçenekleri.",
  "wall-light": "Özel Koleksiyon ve Aplik duvar armatürleri; Masialux ozel-koleksiyon/aplik ile eşleşir.",
  "bronze-collection": "Özel Koleksiyon bronz ray spot, sıva üstü ve sıva altı armatürler; Masialux ozel-koleksiyon/bronz ile eşleşir.",
  pendant: "Sarkıt aydınlatma serisi ürünlerimiz; tavan sarkıt armatürleri.",
  "lamp-shade": "Abajur ve masa lambası (lambader) serisi ürünlerimiz.",
};

type Props = { params: { locale: string; categorySlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categorySlug } = params;
  const tProducts = await getTranslations({ locale, namespace: "products" });
  const key = CATEGORY_I18N_KEYS[categorySlug];
  const title = key ? tProducts(key) : categorySlug;
  const path = `products/${categorySlug}`;
  return {
    title,
    description: CATEGORY_SUBTITLES[categorySlug] ?? title,
    alternates: getAlternates(path, locale),
    openGraph: { title },
  };
}

export default async function CategoryProductsPage({ params }: Props) {
  const { locale, categorySlug } = params;
  setRequestLocale(locale);
  const t = await getTranslations("productDetail");

  const products = getProductsByCategory(categorySlug);
  if (products.length === 0) notFound();

  const title = CATEGORY_TITLES[categorySlug] ?? products[0]?.category ?? categorySlug;
  const subtitle = CATEGORY_SUBTITLES[categorySlug] ?? "";

  const productsHref = locale === "tr" ? "/products" : `/${locale}/products`;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href={productsHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ChevronLeft className="w-5 h-5" /> {t("productsBreadcrumb")}
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark-950">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <ProductGrid categorySlug={categorySlug} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { categorySlug: "ray-spot" },
    { categorySlug: "surface-mounted" },
    { categorySlug: "recessed" },
    { categorySlug: "linear" },
    { categorySlug: "magnet" },
    { categorySlug: "industrial-lighting" },
    { categorySlug: "outdoor" },
    { categorySlug: "emergency-lighting" },
    { categorySlug: "wall-light" },
    { categorySlug: "bronze-collection" },
    { categorySlug: "pendant" },
    { categorySlug: "lamp-shade" },
  ];
}
