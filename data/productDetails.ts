/**
 * Ürün detay verileri – kaynak: https://asialux.com.tr/urun/luca-serisi-mr-1001-ray-spot/
 */
export interface ProductFeature {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  code?: string;
  subtitle?: string;
  /** Özellikler (Gövde, Reflektör, vb.) */
  features: ProductFeature[];
  /** Teknik özellikler */
  technicalSpecs: ProductFeature[];
  /** Kullanım alanları */
  usageAreas: string[];
  stockCode?: string;
  /** İlgili ürün id'leri (ray-spot listesinden) */
  relatedIds: string[];
  /** Görsel URL'leri – öncelik: bu liste, yoksa placeholder */
  images?: string[];
}

const lucaMr1001Detail: ProductDetail = {
  id: "luca-mr-1001",
  name: "LUCA SERİSİ | MR 1001 RAY SPOT",
  category: "Ray Spot",
  categorySlug: "ray-spot",
  code: "MR 1001",
  subtitle: "Masialux Luca Serisi Ledli Ray Spot Armatür MR 1001 | 20W – 30W",
  stockCode: "MR-1001",
  features: [
    { label: "Gövde", value: "Alüminyum enjeksiyon gövde ve enjeksiyon kafa" },
    { label: "Reflektör Tipi", value: "Yüksek saflıkta alüminyum reflektör" },
    { label: "Uygulama Şekli", value: "Elektronik balast ile soket veya rozanslı" },
    { label: "Boyama Tipi", value: "Elektrostatik toz boya" },
    { label: "Kullanım Şekli", value: "Ray Spot" },
    { label: "Işık Kaynağı", value: "Mid Power LED" },
  ],
  technicalSpecs: [
    { label: "Sürücü Akımı", value: "500 mA – 800 mA seçenekleriyle" },
    { label: "Gerilim", value: "220V" },
    { label: "Frekans", value: "50 Hz" },
    { label: "Aktif Güç", value: "20W – 30W seçenekleriyle" },
    { label: "Lümen", value: "1774 lm – 2938 lm seçenekleriyle" },
    { label: "Ürün Ömrü", value: "30.000 sa" },
    { label: "Işık Açısı", value: "15° – 30° – 45° – 60° seçenekleriyle" },
    { label: "Işık Sıcaklığı", value: "2700K | 3000K | 4000K | 6500K" },
    { label: "CRI", value: "80 – 90" },
    { label: "IP Koruma Sınıfı", value: "IP 20" },
    { label: "Ürün Ağırlığı", value: "940-960 gr" },
  ],
  usageAreas: ["Dekorasyon", "Süpermarketler", "Mağazalar", "Evler"],
  relatedIds: ["nora-mr-421", "nena-mr-801-85", "luciano-mr-701-85", "rotella-mr-413-100"],
  images: [
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  ],
};

/** Kategori + slug ile detay getir. Sadece detayı tanımlı ürünler dolu döner; diğerleri null. */
const detailMap: Record<string, ProductDetail> = {
  "ray-spot/luca-mr-1001": lucaMr1001Detail,
};

export function getProductDetail(categorySlug: string, productSlug: string): ProductDetail | null {
  return detailMap[`${categorySlug}/${productSlug}`] ?? null;
}
