/**
 * Ray Spot ürünleri: https://asialux.com.tr/urun-kategori/ray-spot/
 * Sitede 39 sonuç; ilk sayfadaki 16 ürün aşağıda.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  code?: string;
}

export const raySpotProducts: Product[] = [
  { id: "luca-mr-1001", name: "LUCA SERİSİ | MR 1001 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1001" },
  { id: "lima-mr-1010-100", name: "LİMA SERİSİ | MR 1010-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1010-100" },
  { id: "lima-mr-1010-85", name: "LİMA SERİSİ | MR 1010-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1010-85" },
  { id: "luciano-mr-701-100", name: "LUCIANO SERİSİ | MR 701-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 701-100" },
  { id: "renardo-mr-601-100", name: "RENARDO SERİSİ | MR 601-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 601-100" },
  { id: "luciano-mr-701-85", name: "LUCIANO SERİSİ | MR 701-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 701-85" },
  { id: "nena-mr-801-100", name: "NENA SERİSİ | MR 801-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 801-100" },
  { id: "nena-mr-801-85", name: "NENA SERİSİ | MR 801-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 801-85" },
  { id: "nora-mr-421", name: "NORA SERİSİ | MR 421 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 421" },
  { id: "nora-mr-423", name: "NORA SERİSİ | MR 423 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 423" },
  { id: "rotella-mr-413-100", name: "ROTELLA SERİSİ | MR 413-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 413-100" },
  { id: "rotella-mr-425-118", name: "ROTELLA SERİSİ | MR 425-118 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 425-118" },
  { id: "rotella-mr-425-100", name: "ROTELLA SERİSİ | MR 425-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 425-100" },
  { id: "rotella-mr-413-85", name: "ROTELLA SERİSİ | MR 413-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 413-85" },
  { id: "lanzo-mr-1020-118", name: "LANZO SERİSİ | MR 1020-118 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1020-118" },
  { id: "lanzo-mr-1020-100", name: "LANZO SERİSİ | MR 1020-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1020-100" },
];

/** Kategori slug'ına göre ürün listesi */
export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "ray-spot") return raySpotProducts;
  return [];
}

/** Kategori ve ürün id (slug) ile tek ürün */
export function getProductById(categorySlug: string, productId: string): Product | undefined {
  const list = getProductsByCategory(categorySlug);
  return list.find((p) => p.id === productId);
}

/** Tüm kategorilerdeki ürünler (Ray Spot + diğer placeholder'lar) */
export const otherCategoryPlaceholders: Product[] = [
  { id: "siva-alti-sa-205", name: "Sıva Altı SA-205", category: "Sıva Altı", categorySlug: "recessed" },
  { id: "siva-ustu-su-310", name: "Sıva Üstü SU-310", category: "Sıva Üstü", categorySlug: "surface-mounted" },
  { id: "aplik-ap-450", name: "Aplik AP-450", category: "Aplik", categorySlug: "wall-light" },
  { id: "sarkit-sk-520", name: "Sarkıt SK-520", category: "Sarkıt", categorySlug: "pendant" },
  { id: "dis-mekan-dm-680", name: "Dış Mekan DM-680", category: "Dış Mekan", categorySlug: "outdoor" },
  { id: "linear-ln-720", name: "Linear LN-720", category: "Linear", categorySlug: "linear" },
  { id: "magnet-mg-850", name: "Magnet MG-850", category: "Magnet", categorySlug: "magnet" },
];

export const allProducts: Product[] = [...raySpotProducts, ...otherCategoryPlaceholders];
