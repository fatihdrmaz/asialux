import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductDetail } from "@/data/productDetails";
import { getProductById, raySpotProducts } from "@/data/products";
import { ChevronRight } from "lucide-react";

const RAY_SPOT_FALLBACK =
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function RaySpotProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const detail = getProductDetail("ray-spot", slug);
  const product = getProductById("ray-spot", slug);
  if (!detail && !product) notFound();

  const base = locale === "tr" ? "" : `/${locale}`;
  const productsHref = `${base}/products`;
  const raySpotHref = `${base}/products/ray-spot`;

  const name = detail?.name ?? product!.name;
  const categorySlug = "ray-spot";
  const images = detail?.images ?? [RAY_SPOT_FALLBACK];
  const relatedIds = detail?.relatedIds ?? [];
  const relatedProducts = relatedIds
    .map((id) => raySpotProducts.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={productsHref} className="hover:text-primary-600">
            Ürünler
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={raySpotHref} className="hover:text-primary-600">
            Ray Spot
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-dark-950 font-medium truncate max-w-[200px] md:max-w-none">
            {name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Görsel */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={images[0]}
              alt={name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="text-primary-600 font-semibold mb-2 block">
              {detail?.category ?? product!.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-950 mb-3">
              {name}
            </h1>
            {detail?.subtitle && (
              <p className="text-lg text-gray-600 mb-6">{detail.subtitle}</p>
            )}
            {detail?.stockCode && (
              <p className="text-sm text-gray-500">
                Stok kodu: <span className="font-medium text-dark-700">{detail.stockCode}</span>
              </p>
            )}
          </div>
        </div>

        {detail && (
          <>
            {/* Özellikler */}
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold text-dark-950 mb-6">
                Özellikler
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.features.map((f) => (
                  <li
                    key={f.label}
                    className="flex justify-between py-2 border-b border-gray-100 gap-4"
                  >
                    <span className="text-gray-600">{f.label}</span>
                    <span className="text-dark-950 font-medium text-right">
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Teknik özellikler */}
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold text-dark-950 mb-6">
                Teknik Özellikler
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.technicalSpecs.map((s) => (
                  <li
                    key={s.label}
                    className="flex justify-between py-2 border-b border-gray-100 gap-4"
                  >
                    <span className="text-gray-600">{s.label}</span>
                    <span className="text-dark-950 font-medium text-right">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Kullanım alanları */}
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold text-dark-950 mb-6">
                Kullanım Alanları
              </h2>
              <ul className="flex flex-wrap gap-3">
                {detail.usageAreas.map((area) => (
                  <li
                    key={area}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-dark-800 font-medium"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* İlgili ürünler */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-dark-950 mb-6">
              İlgili Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p!.id}
                  href={`${base}/products/ray-spot/${p!.id}`}
                  className="group block rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={RAY_SPOT_FALLBACK}
                      alt={p!.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark-950 group-hover:text-primary-600 line-clamp-2">
                      {p!.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return raySpotProducts.map((p) => ({ slug: p.id }));
}
