import { setRequestLocale } from "next-intl/server";
import ProductCategories from "@/components/ProductCategories";

type Props = { params: { locale: string } };

export default async function ProductsPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <ProductCategories />
    </div>
  );
}
