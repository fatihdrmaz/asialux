import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import ProductCategories from "@/components/ProductCategories";
import ProductCodeSearch from "@/components/ProductCodeSearch";
import { getAlternates } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "products" });
  const title = t("title");
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: getAlternates("products", locale),
    openGraph: { title, description },
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <div className="pt-24">
      <section className="container mx-auto px-4 py-8 md:py-10 border-b border-gray-100">
        <ProductCodeSearch />
        <p className="text-center text-gray-500 text-sm mt-3">
          {t("searchByCodeHint")}
        </p>
      </section>
      <ProductCategories />
    </div>
  );
}
