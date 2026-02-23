import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductDetail } from "@/data/productDetails";
import { getProductById, getProductsByCategory } from "@/data/products";
import { ChevronRight, FileDown, MessageCircle } from "lucide-react";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductColorOptions from "@/components/ProductColorOptions";
import ProductWarningsAccordion from "@/components/ProductWarningsAccordion";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80";

type Props = { params: { locale: string; categorySlug: string; slug: string } };

export default async function ProductDetailPage({ params }: Props) {
  const { locale, categorySlug, slug } = params;
  setRequestLocale(locale);
  const t = await getTranslations("productDetail");

  const detail = getProductDetail(categorySlug, slug, locale);
  const product = getProductById(categorySlug, slug);
  if (!detail && !product) notFound();

  const base = locale === "tr" ? "" : `/${locale}`;
  const productsHref = `${base}/products`;
  const categoryHref = `${base}/products/${categorySlug}`;
  const categoryName = detail?.category ?? product!.category;

  const name = detail?.name ?? product!.name;
  const images = detail?.images ?? [FALLBACK_IMAGE];
  const relatedIds = detail?.relatedIds ?? [];
  const categoryProducts = getProductsByCategory(categorySlug);
  const MAX_SUGGESTIONS = 8;

  const relatedFromIds = relatedIds
    .map((id) => {
      const p = categoryProducts.find((p) => p.id === id);
      if (!p) return null;
      const rd = getProductDetail(categorySlug, p.id, locale);
      return {
        ...p,
        name: rd?.name ?? p.name,
        category: rd?.category ?? p.category,
      };
    })
    .filter(Boolean);

  const relatedIdsSet = new Set(relatedFromIds.map((p) => p!.id));
  const othersFromCategory = categoryProducts.filter(
    (p) => p.id !== slug && !relatedIdsSet.has(p.id)
  );

  const relatedProducts = [
    ...relatedFromIds,
    ...othersFromCategory.slice(0, Math.max(0, MAX_SUGGESTIONS - relatedFromIds.length)),
  ]
    .filter((p): p is NonNullable<typeof p> => p != null)
    .slice(0, MAX_SUGGESTIONS)
    .map((p) => {
      const rd = getProductDetail(categorySlug, p.id, locale);
      return {
        ...p,
        name: rd?.name ?? p.name,
        category: rd?.category ?? p.category,
      };
    });

  const hasDetail = detail && (
    detail.features.length > 0 ||
    detail.technicalSpecs.length > 0 ||
    detail.usageAreas.length > 0 ||
    (detail.description && detail.description.length > 0) ||
    (detail.downloads && detail.downloads.length > 0) ||
    (detail.mountingSafetyWarnings && detail.mountingSafetyWarnings.length > 0) ||
    (detail.importantWarnings && detail.importantWarnings.length > 0) ||
    (detail.warrantyTerms && detail.warrantyTerms.items.length > 0)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href={productsHref} className="hover:text-primary-600 transition-colors">
              {t("productsBreadcrumb")}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            <Link href={categoryHref} className="hover:text-primary-600 transition-colors">
              {categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-dark-800 font-medium truncate max-w-[180px] sm:max-w-none">
              {name}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero: Gallery + Info */}
      <div className="container mx-auto px-4 max-w-6xl py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery images={images} alt={name} />
          </div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wide mb-3">
              {detail?.category ?? product!.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-dark-950 leading-tight mb-3">
              {name}
            </h1>
            {detail?.subtitle && (
              <p className="text-lg text-gray-600 mb-4">{detail.subtitle}</p>
            )}
            {(detail?.code || detail?.stockCode) && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                {detail?.code && (
                  <span>
                    {t("model")}: <span className="font-semibold text-dark-800">{detail.code}</span>
                  </span>
                )}
                {detail?.stockCode && (
                  <span>
                    {t("stockCode")}: <span className="font-semibold text-dark-800">{detail.stockCode}</span>
                  </span>
                )}
              </div>
            )}
            {/* Quick specs strip */}
            {detail?.technicalSpecs && detail.technicalSpecs.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {detail.technicalSpecs.slice(0, 4).map((s) => (
                  <span
                    key={s.label}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-dark-800"
                  >
                    <span className="text-gray-500">{s.label}:</span>{" "}
                    <span className="font-medium">{s.value}</span>
                  </span>
                ))}
              </div>
            )}
            {/* Gövde ve Işık renk seçenekleri */}
            {detail && ((detail.bodyColorOptions?.length ?? 0) > 0 || (detail.lightColorOptions?.length ?? 0) > 0) && (
              <div className="mb-8 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <ProductColorOptions
                  bodyColorOptions={detail.bodyColorOptions ?? []}
                  lightColorOptions={detail.lightColorOptions ?? []}
                />
              </div>
            )}
            <a
              href={`https://wa.me/902124340000?text=${encodeURIComponent(t("whatsappProduct"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t("ctaRequestQuote")}
            </a>
          </div>
        </div>
      </div>

      {/* Content sections */}
      {hasDetail && (
        <div className="container mx-auto px-4 max-w-6xl pb-16 space-y-12">
          {/* Açıklama */}
          {detail!.description && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-semibold uppercase tracking-wider text-primary-600 mb-1">{t("about")}</h2>
              <h3 className="text-xl font-display font-bold text-dark-950 mb-4">{t("description")}</h3>
              <p className="text-gray-600 leading-relaxed">{detail!.description}</p>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {detail!.features.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-primary-600 mb-1">{t("product")}</h2>
                <h3 className="text-xl font-display font-bold text-dark-950 mb-6">{t("features")}</h3>
                <ul className="space-y-4">
                  {detail!.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100 last:border-0 gap-1"
                    >
                      <span className="text-gray-600 font-medium">{f.label}</span>
                      <span className="text-dark-950 text-right">{f.value}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {detail!.technicalSpecs.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-primary-600 mb-1">{t("technical")}</h2>
                <h3 className="text-xl font-display font-bold text-dark-950 mb-6">
                  {t("technicalSpecs")}
                </h3>
                <ul className="space-y-4">
                  {detail!.technicalSpecs.map((s) => (
                    <li
                      key={s.label}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-100 last:border-0 gap-1"
                    >
                      <span className="text-gray-600 font-medium">{s.label}</span>
                      <span className="text-dark-950 text-right">{s.value}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Kullanım Alanları */}
          {detail!.usageAreas.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-semibold uppercase tracking-wider text-primary-600 mb-1">{t("application")}</h2>
              <h3 className="text-xl font-display font-bold text-dark-950 mb-4">
                {t("usageAreasTitle")}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {detail!.usageAreas.map((area) => (
                  <li
                    key={area}
                    className="px-4 py-2 rounded-xl bg-primary-50 text-primary-800 font-medium border border-primary-100"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* İndirilebilir Medya */}
          {detail!.downloads && detail!.downloads.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-semibold uppercase tracking-wider text-primary-600 mb-1">{t("documents")}</h2>
              <h3 className="text-xl font-display font-bold text-dark-950 mb-4">
                {t("downloadableMedia")}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {detail!.downloads.map((d) => (
                  <li key={d.label}>
                    {d.url ? (
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-dark-800 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                      >
                        <FileDown className="w-4 h-4" />
                        {d.label}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 bg-gray-50">
                        <FileDown className="w-4 h-4" />
                        {d.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Montaj / Önemli Uyarılar / Garanti — accordion */}
          {(detail!.mountingSafetyWarnings?.length ?? 0) > 0 ||
           (detail!.importantWarnings?.length ?? 0) > 0 ||
           (detail!.warrantyTerms && detail!.warrantyTerms.items.length > 0) ? (
            <ProductWarningsAccordion
              mountingTitle={t("mountingWarnings")}
              importantTitle={t("importantWarnings")}
              warrantyTitle={t("warrantyTerms")}
              mounting={
                detail!.mountingSafetyWarnings?.length
                  ? {
                      intro: detail!.mountingSafetyWarnings[0],
                      items: detail!.mountingSafetyWarnings.slice(1),
                    }
                  : undefined
              }
              important={
                detail!.importantWarnings?.length
                  ? { items: detail!.importantWarnings }
                  : undefined
              }
              warranty={
                detail!.warrantyTerms && detail!.warrantyTerms.items.length > 0
                  ? {
                      title: detail!.warrantyTerms.title,
                      items: detail!.warrantyTerms.items,
                    }
                  : undefined
              }
            />
          ) : null}
        </div>
      )}

      {/* CTA strip — WhatsApp */}
      <div className="bg-dark-950 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-lg font-medium mb-4">
            {t("ctaQuote")}
          </p>
          <a
            href={`https://wa.me/902124340000?text=${encodeURIComponent(t("whatsappQuote"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-dark-950 font-semibold hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {t("ctaWhatsApp")}
          </a>
        </div>
      </div>

      {/* Benzer ürünler — WhatsApp'ın altındaki beyaz alanda */}
      {relatedProducts.length > 0 && (
        <section className="bg-white border-t border-gray-100 py-14" aria-labelledby="similar-products-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">{t("suggestions")}</p>
            <h2 id="similar-products-heading" className="text-2xl font-display font-bold text-dark-950 mb-8">
              {t("similarProducts")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p!.id}
                  href={`${base}/products/${categorySlug}/${p!.id}`}
                  className="group block rounded-2xl border border-gray-200 overflow-hidden bg-white hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={p!.listImagePath ?? FALLBACK_IMAGE}
                      alt={p!.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                      {p!.category}
                    </span>
                    <h3 className="font-semibold text-dark-950 mt-1 group-hover:text-primary-600 line-clamp-2 transition-colors">
                      {p!.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export function generateStaticParams() {
  const categories = [
    "ray-spot",
    "surface-mounted",
    "recessed",
    "linear",
    "magnet",
    "industrial-lighting",
    "outdoor",
  ];
  const params: { categorySlug: string; slug: string }[] = [];
  for (const categorySlug of categories) {
    const products = getProductsByCategory(categorySlug);
    for (const p of products) {
      params.push({ categorySlug, slug: p.id });
    }
  }
  return params;
}
