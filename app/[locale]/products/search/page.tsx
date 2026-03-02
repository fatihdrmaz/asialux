import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import ProductCodeSearch from "@/components/ProductCodeSearch";
import { searchProducts } from "@/data/products";
import { ChevronLeft } from "lucide-react";
import { getAlternates } from "@/lib/seo";

type Props = {
  params: { locale: string };
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: "products" });
  const title = q ? t("searchResultsTitle", { query: q }) : t("searchTitle");
  return {
    title,
    alternates: getAlternates("products/search", locale),
    openGraph: { title },
  };
}

export default async function ProductSearchPage({ params, searchParams }: Props) {
  const { locale } = params;
  const { q } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });
  const tDetail = await getTranslations({ locale, namespace: "productDetail" });

  const query = (q ?? "").trim();
  const products = searchProducts(query);

  const productsHref = locale === "tr" ? "/products" : `/${locale}/products`;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href={productsHref}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ChevronLeft className="w-5 h-5" /> {tDetail("productsBreadcrumb")}
        </Link>

        <section className="mb-10">
          <ProductCodeSearch initialQuery={query} />
        </section>

        {query ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-dark-950">
                {t("searchResultsTitle", { query })}
              </h1>
              <p className="text-gray-600">
                {t("searchResultsCount", { count: products.length })}
              </p>
            </div>
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <p className="text-center text-gray-500 py-12">{t("searchByCodeNotFound")}</p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-8">{t("searchHint")}</p>
        )}
      </div>
    </div>
  );
}
