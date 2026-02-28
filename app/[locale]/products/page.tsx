import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import ProductCategories from "@/components/ProductCategories";
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

  return (
    <div className="pt-24">
      <ProductCategories />
    </div>
  );
}
