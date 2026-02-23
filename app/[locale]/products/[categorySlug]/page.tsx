import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/data/products";
import { ChevronLeft } from "lucide-react";

const CATEGORY_TITLES: Record<string, string> = {
  "ray-spot": "Ray Spot Aydınlatma",
  "surface-mounted": "Sıva Üstü Aydınlatma",
  recessed: "Sıva Altı Aydınlatma",
  linear: "Lineer Aydınlatma",
  magnet: "Magnet Ray Spot",
  "industrial-lighting": "Endüstriyel Aydınlatma",
  outdoor: "Dış Mekan Aydınlatma",
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  "ray-spot": "Ray spot serisi ürünlerimiz; mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma çözümü sunar.",
  "surface-mounted": "Sıva üstü serisi ürünlerimiz.",
  recessed: "Sıva altı serisi ürünlerimiz.",
  linear: "Sıva üstü lineer serisi ürünlerimiz.",
  magnet: "Magnet ray spot serisi ürünlerimiz.",
  "industrial-lighting": "Endüstriyel aydınlatma ürünlerimiz.",
  outdoor: "Dış mekan aydınlatma ürünlerimiz.",
};

type Props = { params: { locale: string; categorySlug: string } };

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
  ];
}
