import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { ChevronLeft } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function RaySpotProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const productsHref = locale === "tr" ? "/products" : `/${locale}/products`;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href={productsHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ChevronLeft className="w-5 h-5" /> Ürünler
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark-950">
            Ray Spot Aydınlatma
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ray spot serisi ürünlerimiz; mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma çözümü sunar.
          </p>
        </div>
        <ProductGrid categorySlug="ray-spot" />
      </div>
    </div>
  );
}
