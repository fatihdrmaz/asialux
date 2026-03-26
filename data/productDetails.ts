/**
 * Ürün detayları: public/images/products/ altındaki kategori klasörlerinden türetilir.
 * Yenilemek için: node scripts/generate-all-categories-data.mjs
 * Masialux'tan detay çekmek için: scripts/masialux-product-urls.txt'e linkleri yaz, node scripts/sync-masialux-details.mjs çalıştır.
 */
import productDetailsScraped from "./productDetailsScraped.json";
import { translateWithGlossary } from "./productDetailGlossary";
import type { LocaleProduct } from "./productDetailGlossary";
import { productDetailTranslations } from "./productDetailTranslations";
import { getProductById, getProductsByCategory } from "@/data/products";

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
  /** Uzun açıklama metni (HTML veya düz metin) */
  description?: string;
  features: ProductFeature[];
  technicalSpecs: ProductFeature[];
  usageAreas: string[];
  stockCode?: string;
  relatedIds: string[];
  images?: string[];
  /** İndirilebilir medya: { label, url? } — url yoksa placeholder */
  downloads?: { label: string; url?: string }[];
  /** Gövde renk seçenekleri: Beyaz, Bakır, Altın, Gümüş, RAL vb. */
  bodyColorOptions?: { label: string; value: "black" | "white" | "copper" | "gold" | "silver" | "ral" }[];
  /** Işık renk sıcaklığı seçenekleri (Kelvin) */
  lightColorOptions?: { label: string; kelvin: number }[];
  /** Montaj ve güvenlik uyarıları (madde madde) */
  mountingSafetyWarnings?: string[];
  /** Önemli uyarılar (madde madde) */
  importantWarnings?: string[];
  /** Garanti şartları: başlık + maddeler veya paragraflar */
  warrantyTerms?: { title?: string; items: string[] };
}

const ACIL_FOLDER = "acil-yonlendirme-lambalari";
function acilImg(sub: string, file: string): string {
  return `/images/products/${ACIL_FOLDER}/${encodeURIComponent(sub)}/${encodeURIComponent(file)}`;
}
const ACIL_FILE: Record<string, string> = {
  "mx 100": "01-yamas-serisi-mx-100-siva-ustu-acil-cikis-yonlendirme-armaturu-sag-ok.jpg",
  "mx 101": "01-siva-ustu-acil-cikis-yonlendirme-armaturu-sol-ok.jpg",
  "mx 102": "01-siva-ustu-acil-cikis-yonlendirme-armaturu-ust-ok.jpg",
  "mx 103": "01-siva-ustu-acil-cikis-yonlendirme-armaturu-alt-ok.jpg",
  "mx 104": "01-siva-ustu-acil-cikis-yonlendirme-armaturu-exit-cikis.jpg",
  "mx 105": "01-siva-ustu-acil-cikis-yonlendirme-armaturu-exit.jpg",
  "mx 106": "01-siva-ustu-acil-cikis-yonlendirme-armaturu-yangin-cikis.jpg",
  "mx 200": "01-sarkit-acil-cikis-yonlendirme-armaturu-sag-ok.jpg",
  "mx 201": "01-sarkit-acil-cikis-yonlendirme-armaturu-sol-ok.jpg",
  "mx 202": "01-sarkit-acil-cikis-yonlendirme-armaturu-ust-ok.jpg",
  "mx 203": "01-sarkit-acil-cikis-yonlendirme-armaturu-alt-ok.jpg",
  "mx 204": "01-sarkit-acil-cikis-yonlendirme-armaturu-exit-cikis.jpg",
  "mx 205": "01-sarkit-acil-cikis-yonlendirme-armaturu-exit.jpg",
  "mx 206": "01-sarkit-acil-cikis-yonlendirme-armaturu-yangin-cikis.jpg",
  "mx 300": "01-siva-alti-acil-cikis-yonlendirme-armaturu-sag-ok.jpg",
  "mx 301": "01-siva-alti-acil-cikis-yonlendirme-armaturu-sol-ok.jpg",
  "mx 302": "01-siva-alti-acil-cikis-yonlendirme-armaturu-ust-ok.jpg",
  "mx 303": "01-siva-alti-acil-cikis-yonlendirme-armaturu-alt-ok.jpg",
  "mx 304": "01-siva-alti-acil-cikis-yonlendirme-armaturu-exit-cikis.jpg",
  "mx 305": "01-siva-alti-acil-cikis-yonlendirme-armaturu-exit.jpg",
  "mx 306": "01-siva-alti-acil-cikis-yonlendirme-armaturu-y.jpg",
};

const ACIL_EMERGENCY_SHARED: Pick<
  ProductDetail,
  | "category"
  | "categorySlug"
  | "features"
  | "technicalSpecs"
  | "usageAreas"
  | "description"
  | "mountingSafetyWarnings"
  | "importantWarnings"
  | "warrantyTerms"
  | "downloads"
> = {
  category: "Acil Aydınlatma ve Yönlendirmeler",
  categorySlug: "emergency-lighting",
  features: [
    { label: "Gövde", value: "Aluminyum profil gövde, ABS plastik kapaklar" },
    { label: "Işık Kaynağı", value: "Mid Power LED" },
    { label: "Optik", value: "Yüksek geçirgenliğe sahip PMMA" },
    { label: "IP Koruma", value: "IP 20" },
    { label: "Aktif Güç", value: "1,5 W" },
    { label: "Opsiyonlar", value: "Tek ve Çift Yüzlü Uygulama" },
  ],
  technicalSpecs: [
    { label: "Şebeke besleme", value: "220 V AC 50 Hz" },
    { label: "İlk şarj süresi", value: "24 saat" },
    { label: "Voltaj dayanımı", value: "285 V'a kadar dalgalanmalara dayanıklı" },
    { label: "Acil mod geçişi", value: "150 V altında acil aydınlatma, 185 V üzerinde şarj" },
    { label: "Standart", value: "TS 8710 EN60598-2-22, ISO 9001" },
  ],
  usageAreas: [
    "Yangın çıkış kapıları",
    "Ofisler",
    "Toplantı odaları",
    "Resepsiyon alanları",
    "Alışveriş merkezleri",
    "Oteller ve barlar",
    "Restoranlar",
    "Eğlence kulüpleri",
    "Üniversiteler, yurtlar, okullar ve kolejler",
  ],
  description:
    "Masialux Acil Aydınlatma ve Yönlendirme Armatürleri. Tavan montaj, sıva altı uygulamalarda kullanılabilecek, standartlara uygun, ekonomik işaretlemeler için tasarlanmıştır. Tüm plastik ekipmanlar gerekli alev almazlık koşullarını sağlar. Bataryasını ve güç kaynağını içerisinde barındıran bağımsız acil yönlendirme armatürüdür. Continius şarj yöntemi ile pilleri sürekli dolu ve hazır tutar.",
  downloads: [{ label: "Datasheet" }],
  mountingSafetyWarnings: [
    "Teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz.",
    "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.",
    "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.",
    "Elektrik bağlantıları sadece uzman personel tarafından yapılmalıdır. Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.",
    "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız.",
    "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.",
    "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.",
  ],
  importantWarnings: [
    "Acil aydınlatma armatüründe meydana gelen herhangi bir arıza durumunda yetkili servisimizle irtibata geçiniz.",
    "Ürün çalışır durumdayken yüzeyi sıcak olduğu için enerjisi kesilmeli ve soğumadan dokunulmamalıdır.",
    "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz. Çocukların ulaşamayacakları yerlerde muhafaza ediniz.",
  ],
  warrantyTerms: {
    title: "Garanti Şartları",
    items: [
      "Garanti süresi fatura tarihinden itibaren 2 yıldır. Tüm parçalar garanti kapsamındadır.",
      "6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında ücretsiz onarım veya yeni ürünle değişim hakkı saklıdır.",
      "Tamir süresi 20 iş gününü geçemez. Kullanma kılavuzuna aykırı kullanımdan kaynaklanan arızalar garanti dışıdır.",
    ],
  },
};

/** Bronz Koleksiyon: Masialux ozel-koleksiyon/bronz — MB 100-100 sayfasından alındı */
const BRONZ_FOLDER = "bronz-koleksiyon";
function bronzImg(sub: string, file: string): string {
  return `/images/products/${BRONZ_FOLDER}/${encodeURIComponent(sub)}/${encodeURIComponent(file)}`;
}
const toKebab = (s: string) => s.replace(/\s+/g, "-").toLowerCase();
const BRONZ_RAY_FILE = (code: string) => `001-bronz-serisi-${toKebab(code)}-ray-spot.jpg`;
const BRONZ_SIVA_ALTI_FILE = (code: string) => `001-bronz-serisi-${toKebab(code)}-siva-alti-spot.jpg`;
const BRONZ_SIVA_USTU_FILE = (code: string) => `001-bronz-serisi-${toKebab(code)}-siva-ustu-spot.jpg`;

const BRONZ_COLLECTION_SHARED: Pick<
  ProductDetail,
  | "category"
  | "categorySlug"
  | "features"
  | "technicalSpecs"
  | "usageAreas"
  | "description"
  | "mountingSafetyWarnings"
  | "importantWarnings"
  | "warrantyTerms"
  | "downloads"
> = {
  category: "Bronz Koleksiyon",
  categorySlug: "bronze-collection",
  features: [
    { label: "Gövde", value: "Alüminyum enjeksiyon gövde ve enjeksiyon kafa" },
    { label: "Reflektör Tipi", value: "Yüksek saflıkta alüminyum reflektör" },
    { label: "Uygulama Şekli", value: "Elektronik balast ile soket veya rozanslı" },
    { label: "Boyama Tipi", value: "Elektrostatik toz boya" },
    { label: "Kullanım Şekli", value: "Ray Spot" },
  ],
  technicalSpecs: [
    { label: "Gerilim", value: "220V" },
    { label: "Frekans", value: "50 Hz" },
    { label: "Aktif Güç", value: "10W" },
    { label: "Lümen", value: "1165 lm" },
    { label: "Işık Kaynağı", value: "Mid Power LED veya GU 10 Ampul" },
  ],
  usageAreas: ["Dekorasyon", "Süpermarketler", "Mağazalar", "Evler"],
  description:
    "Masialux Ledli, Eskitme Bronz Ray Spot Armatür. Özel Koleksiyon bronz serisi; mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma ve dekoratif çözüm sunar. Alüminyum enjeksiyon gövde, yüksek saflıkta alüminyum reflektör ve elektrostatik toz boya ile üretilmiştir.",
  downloads: [{ label: "Datasheet" }, { label: "Kullanım Kılavuzu" }, { label: "2D Çizim" }, { label: "3D Çizim" }],
  mountingSafetyWarnings: [
    "Teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz.",
    "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.",
    "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.",
    "Elektrik bağlantıları sadece uzman personel tarafından yapılmalıdır. Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.",
    "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız.",
    "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.",
    "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.",
  ],
  importantWarnings: [
    "Ray spot üründe meydana gelen herhangi bir arıza durumunda uzman yetkili servisimizle irtibata geçiniz.",
    "Ürün çalışır durumdayken yüzeyi sıcak olduğu için enerjisi kesilmeli ve soğumadan dokunulmamalıdır.",
    "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz. Çocukların ulaşamayacakları yerlerde muhafaza ediniz.",
  ],
  warrantyTerms: {
    title: "Garanti Şartları",
    items: [
      "Garanti süresi fatura tarihinden itibaren 2 yıldır. Tüm parçalar garanti kapsamındadır.",
      "6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında ücretsiz onarım veya yeni ürünle değişim hakkı saklıdır.",
      "Tamir süresi 20 iş gününü geçemez. Kullanma kılavuzuna aykırı kullanımdan kaynaklanan arızalar garanti dışıdır.",
    ],
  },
};

/** Aplik (wall-light): Masialux ozel-koleksiyon/aplik — dosya adları aplik klasöründeki gerçek isimlerle eşleşir */
const APLIK_FOLDER = "aplik";
function aplikImg(sub: string, file: string): string {
  return `/images/products/${APLIK_FOLDER}/${encodeURIComponent(sub)}/${encodeURIComponent(file)}`;
}
const APLIK_FILE: Record<string, string> = {
  "ME 1000": "001-me-1000.jpg", "ME 150": "001-me-150-masialux-aplik.jpg", "ME 152": "001-me-152.jpg", "ME 153": "001-me-153.jpg",
  "ME 153-1": "001-me-153-1.jpg", "ME 154": "001-me-154.jpg", "ME 155": "001-me-155.jpg", "ME 156": "001-me-156.jpg",
  "ME 158": "001-me-158.jpg", "ME 159": "001-me-159.jpg", "ME 160": "001-me-160.jpg", "ME 161": "001-me-161.jpg",
  "ME 162": "001-me-162.jpg", "ME 163": "001-me-163.jpg", "ME 164": "001-me-164.jpg", "ME 165": "001-me-165.jpg",
  "ME 166": "001-me-166-masialux-aplik.jpg", "ME 171": "001-me-171-masialux-aplik.jpg", "ME 172": "001-me-172.jpg",
  "ME 173": "001-me-173.jpg", "ME 175": "001-me-175.jpg", "ME 177": "001-me-177.jpg", "ME 188": "001-me-188.jpg",
  "ME 240": "001-me-240-masialux-aplik.jpg", "ME 324": "001-me-324.jpg", "ME 325": "001-me-325.jpg",
  "ME 326": "001-me-326-masialux-aplik.jpg", "ME 327": "001-me-327-masialux-aplik.jpg", "ME 328": "001-me-328-masialux-aplik.jpg",
  "ME 330": "001-me-330-masialux-aplik.jpg", "ME 331": "001-me-331.jpg", "ME 334": "001-me-334-aplik.jpg", "ME 335": "001-me-335-aplik.jpg",
  "ME 748": "001-me-748-masialux-aplik.jpg", "ME 749": "01-me-749-masialux-aplik.jpg", "ME 751": "001-masalux-aplik-me-751.jpg",
  "ME 753": "001-me-753.jpg", "ME 754": "01-me-754-masialux-aplik.jpg", "ME 755": "001-me-755.jpg", "ME 756": "001-me-756.jpg",
  "ME 757": "001-me-757.jpg", "ME 780": "001-me-780.jpg", "ME 909": "001-me-909.jpg", "ME 990": "001-me-990.jpg",
  "ME 991": "001-me-991.jpg", "ME 992": "001-me-992.jpg", "ME 993": "001-me-993.jpg", "ME 994": "001-me-994.jpg",
  "ME 995": "001-me-995.jpg", "ME 996": "001-me-996.jpg", "ME 997": "001-me-997.jpg", "ME 998": "001-me-998.jpg", "ME 999": "001-me-999.jpg",
};
const APLIK_WALL_LIGHT_SHARED: Pick<
  ProductDetail,
  | "category"
  | "categorySlug"
  | "features"
  | "technicalSpecs"
  | "usageAreas"
  | "description"
  | "mountingSafetyWarnings"
  | "importantWarnings"
  | "warrantyTerms"
  | "downloads"
> = {
  category: "Aplik Aydınlatma",
  categorySlug: "wall-light",
  /** Varsayılan: Masialux ME 150 Özellikler. Ürün bazlı farklılıklar için ilgili wall-light/me-xxx kaydında features override edilebilir. */
  features: [
    { label: "Gövde", value: "Metal kaplamalı gövde" },
    { label: "Kaplama", value: "Elektrostatik toz boya ve vernik kaplamalı" },
    { label: "Duy tipi", value: "1 x E27" },
    { label: "IP Koruma", value: "IP 20" },
  ],
  technicalSpecs: [],
  usageAreas: ["Dekorasyon", "Süpermarketler", "Mağazalar", "Evler"],
  description: "Masialux Özel Koleksiyon Aplik Aydınlatma Armatür. Modern duvar aplik serisi; konut ve ticari mekânlarda dekoratif aydınlatma çözümü sunar.",
  downloads: [{ label: "Datasheet" }],
  mountingSafetyWarnings: [
    "Özel koleksiyon aplik ürününüzü teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz.",
    "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.",
    "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.",
    "Elektrik bağlantıları sadece uzman personel tarafından yapılmalıdır. Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.",
    "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız.",
    "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.",
    "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.",
  ],
  importantWarnings: [
    "Özel koleksiyon aplik aydınlatma ürününde meydana gelen herhangi bir arıza durumunda yetkili servisimizle irtibata geçiniz.",
    "Ürün çalışır durumdayken yüzeyi sıcak olduğu için enerjisi kesilmeli ve soğumadan dokunulmamalıdır.",
    "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz. Çocukların ulaşamayacakları yerlerde muhafaza ediniz.",
  ],
  warrantyTerms: {
    title: "Garanti Şartları",
    items: [
      "Garanti süresi fatura tarihinden itibaren 2 yıldır. Tüm parçalar garanti kapsamındadır.",
      "6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında ücretsiz onarım veya yeni ürünle değişim hakkı saklıdır.",
      "Tamir süresi 20 iş gününü geçemez. Kullanma kılavuzuna aykırı kullanımdan kaynaklanan arızalar garanti dışıdır.",
    ],
  },
};

/** Sarkıt ürünleri gövde renk seçenekleri (Masialux sarkıt sayfası ile uyumlu) */
const PENDANT_BODY_COLORS: NonNullable<ProductDetail["bodyColorOptions"]> = [
  { label: "Beyaz", value: "white" },
  { label: "Bakır", value: "copper" },
  { label: "Altın", value: "gold" },
  { label: "Gümüş", value: "silver" },
  { label: "RAL / İstediğiniz renk", value: "ral" },
];

const detailMap: Record<string, ProductDetail> = {
  "ray-spot/mr-1001": {
    id: "mr-1001",
    name: "LUCA SERİSİ MR 1001 RAY SPOT",
    category: "Ray Spot",
    categorySlug: "ray-spot",
    code: "MR 1001",
    subtitle: "Masialux Luca Serisi Ledli Ray Spot Armatür MR 1001 | 20W – 27W",
    description: "Masialux Ledli Ray Spot Armatür MR 1001, mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma çözümü sunar. Alüminyum enjeksiyon gövde, yüksek saflıkta alüminyum reflektör ve elektrostatik toz boya ile üretilmiştir.",
    images: ["/images/products/ray-spot/MR%201001/001-luca-serisi-mr-1001-ray-spot.jpg", "/images/products/ray-spot/MR%201001/002-luca-serisi-mr-1001-ray-spot.jpg", "/images/products/ray-spot/MR%201001/003-luca-serisi-mr-1001-ray-spot.jpg", "/images/products/ray-spot/MR%201001/004-luca-serisi-mr-1001-ray-spot.jpg"],
    features: [
      { label: "Gövde", value: "Alüminyum enjeksiyon gövde ve enjeksiyon kafa" },
      { label: "Reflektör Tipi", value: "Yüksek saflıkta alüminyum reflektör" },
      { label: "Uygulama Şekli", value: "Elektronik balast ile soket veya rozanslı" },
      { label: "Boyama Tipi", value: "Elektrostatik toz boya" },
      { label: "Kullanım Şekli", value: "Ray Spot" },
    ],
    technicalSpecs: [
      { label: "Sürücü Akımı", value: "500 mA – 800 mA" },
      { label: "Gerilim", value: "220V" },
      { label: "Frekans", value: "50 Hz" },
      { label: "Aktif Güç", value: "20W – 27W" },
      { label: "Lümen", value: "2380 lm – 3150 lm" },
      { label: "Işık Kaynağı", value: "Mid Power LED" },
    ],
    usageAreas: ["Dekorasyon", "Süpermarketler", "Mağazalar", "Evler"],
    relatedIds: ["mr-801-100", "mr-418-1", "mr-801-85", "mr-601-100"],
    downloads: [
      { label: "Datasheet" },
      { label: "Kullanım Kılavuzu" },
      { label: "2D Çizim" },
      { label: "3D Çizim" },
      { label: "LDT Dosyaları" },
    ],
    bodyColorOptions: [
      { label: "Siyah", value: "black" },
      { label: "Beyaz", value: "white" },
      { label: "RAL", value: "ral" },
    ],
    lightColorOptions: [
      { label: "2700 K", kelvin: 2700 },
      { label: "3000 K", kelvin: 3000 },
      { label: "4000 K", kelvin: 4000 },
      { label: "6500 K", kelvin: 6500 },
    ],
    mountingSafetyWarnings: [
      "Ray spotunuzu;",
      "Teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz ve ürün ile birlikte gelmesi gereken aksesuarlar varsa tam olup olmadığını kontrol ediniz.",
      "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.",
      "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.",
      "Bunların okunmaması veya yıpranmış olması durumunda ürününüz garanti kapsamına girmemektedir.",
      "Ürün kullanım amaçları haricinde kullanılmamalıdır.",
      "Satıcı firma, ürünün usulüne uygun olmayan bir şekilde kullanılması sonucu ortaya çıkabilecek yaralanma veya hasar görme vakalarında sorumluluk almaz.",
      "Elektrik bağlantıları sadece ama sadece uzman personel tarafından yapılmalıdır.",
      "Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.",
      "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız. Aksi takdirde ölüm, ciddi yaralanma veya maddi hasara neden olabilir.",
      "Montajına başlamadan önce kabloların ve ürünün dış çeperlerinin hasarlı olmadığından emin olunuz.",
      "Etiket üzerinde belirtilen çalışma geriliminden yüksek bir gerilim almadığından emin olunuz.",
      "Uyuşmazlık durumunda meydana gelebilecek arızalarda, satıcı firma sorumlu tutulamaz ve arıza garanti kapsamında değerlendirilemez.",
      "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.",
      "Şebeke bağlantısı ilgili ülkenin tesisat yönetmeliğine uygun bağlantı malzemeleriyle yapılmalıdır.",
      "Elektrik kaçağı olan yerlerde kullanmayın.",
      "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.",
      "Tadilat, tamir, oynama veya herhangi bir fiziksel müdahalede bulunmayınız. Bu işlem sonucu maddi hasar oluşabileceği gibi, ürün garantisi de geçersiz kalacaktır.",
    ],
    importantWarnings: [
      "Ray spot üründe meydana gelen herhangi bir arıza durumunda uzman yetkili servisimizle irtibata geçiniz.",
      "Yetkili teknik servisimiz dışında ürüne kimsenin müdahale etmesine izin vermeyiniz. Bu tür müdahaleler sonucu ürün tümüyle garanti kapsamı dışında kalır.",
      "Bu ürünün harici bükülgen kablo veya kordonu hasarlanırsa bir tehlikeden kaçınmak için yetkili kişi tarafından değiştirilmesi gerekir.",
      "Ürün çalışır durumdayken yüzeyi sıcak olduğu için ürünün enerjisi kesilmelidir ve soğumadan dokunulmamalıdır. Ürün çalışır durumdayken direkt olarak bakmayınız.",
      "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz.",
      "Çocukların ulaşamayacakları yerlerde ve ürün kutusu içinde muhafaza ediniz.",
    ],
    warrantyTerms: {
      title: "GARANTİ BELGESİ | Garanti Şartları",
      items: [
        "Ray Spot Ürününün;",
        "Garanti süresi, ürünün fatura tarihinden itibaren başlar ve 2 yıldır.",
        "Bütün parçaları dahil olmak üzere tamamı garanti kapsamına girer.",
        "Ayıplı olduğunun anlaşılması durumunda tüketici, 6502 sayılı Tüketicinin Korunması Hakkında Kanunun 11. maddesinde yer alan; a) Ücretsiz onarımı yaptırmak. b) Onarımı yapılmadığı takdirde yeni ürünle değiştirilmesi.",
        "Tüketicinin bu haklardan ücretsiz onarım durumunda satıcı; işçilik masrafı, değiştirilen parça bedeli ya da başka herhangi bir ad altında hiçbir ücret talep etmeksizin ürünün onarımını yaptırmakla yükümlüdür.",
        "Garanti süresi içerisinde arızalanması durumunda, tamirde geçen süre garanti süresine eklenir. Ürünün tamir süresi 20 iş gününü geçemez.",
        "Kullanma kılavuzunda yer alan hususlara aykırı kullanılmasından kaynaklanan arızalar garanti kapsamı dışındadır.",
        "Arızalı ürünü garanti kapsamı dışına çıkaran kullanım hataları: Elektrik ve kullanıcının kullanımından doğan arızalar (elektrik kesilmesi, voltaj dalgalanması, makinaya ait olmayan aksesuar takılması yada kullanılması zorunlu olan aksesuarların kullanılmaması gibi), garantili ürünlerde yetkili servis dışında herhangi bir müdahalenin yapılması, garanti etiketi olan ürünlerde etiketin zarar görmesi, cihazın dış yüzeyinde oluşan kırık, çizik vb. nedenlerden meydana gelen arızalar, tozlu, rutubetli, aşırı sıcak ya da soğuk ortamlarda kullanılma sebebi ile oluşan arızalar, sel, yangın, deprem, yıldırım düşmesi vb. doğal afetlerin sebep olduğu arızalarda garanti kapsamı dışındadır.",
      ],
    },
  },
  "ray-spot/mr-1021-100": {
    id: "mr-1021-100",
    name: "ZENA SERİSİ MR 1021-100 RAY SPOT",
    category: "Ray Spot",
    categorySlug: "ray-spot",
    code: "MR 1021-100",
    subtitle: "Masialux Luca Serisi Ledli Ray Spot Armatür MR 1001 | 20W – 27W",
    description:
      "Masialux Ledli Ray Spot Armatür MR 1001, mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma çözümü sunar. Alüminyum enjeksiyon gövde, yüksek saflıkta alüminyum reflektör ve elektrostatik toz boya ile üretilmiştir.",
    images: [
      "/images/products/ray-spot/MR%201021-100/001-zena-serisi-mr-1021-100-ray-spot.jpg",
      "/images/products/ray-spot/MR%201021-100/001-zena-serisi-mr-1021-60-ray-spot.jpg",
      "/images/products/ray-spot/MR%201021-100/001-zena-serisi-mr-1021-85-ray-spot.jpg",
      "/images/products/ray-spot/MR%201021-100/002-zena-serisi-mr-1021-100-ray-spot.jpg",
      "/images/products/ray-spot/MR%201021-100/002-zena-serisi-mr-1021-60-ray-spot.jpg",
      "/images/products/ray-spot/MR%201021-100/002-zena-serisi-mr-1021-85-ray-spot.jpg",
    ],
    features: [
      { label: "Gövde", value: "Alüminyum enjeksiyon gövde ve enjeksiyon kafa" },
      { label: "Reflektör Tipi", value: "Yüksek saflıkta alüminyum reflektör" },
      { label: "Uygulama Şekli", value: "Elektronik balast ile soket veya rozanslı" },
      { label: "Boyama Tipi", value: "Elektrostatik toz boya" },
      { label: "Kullanım Şekli", value: "Ray Spot" },
    ],
    technicalSpecs: [
      { label: "Sürücü Akımı", value: "500 mA – 800 mA" },
      { label: "Gerilim", value: "220V" },
      { label: "Frekans", value: "50 Hz" },
      { label: "Aktif Güç", value: "20W – 27W" },
      { label: "Lümen", value: "2380 lm – 3150 lm" },
      { label: "Işık Kaynağı", value: "Mid Power LED" },
    ],
    usageAreas: ["Dekorasyon", "Süpermarketler", "Mağazalar", "Evler"],
    relatedIds: ["mr-801-100", "mr-418-1", "mr-801-85", "mr-601-100"],
    downloads: [
      { label: "Datasheet" },
      { label: "Kullanım Kılavuzu" },
      { label: "2D Çizim" },
      { label: "3D Çizim" },
      { label: "LDT Dosyaları" },
    ],
    bodyColorOptions: [
      { label: "Siyah", value: "black" },
      { label: "Beyaz", value: "white" },
      { label: "RAL", value: "ral" },
    ],
    lightColorOptions: [
      { label: "2700 K", kelvin: 2700 },
      { label: "3000 K", kelvin: 3000 },
      { label: "4000 K", kelvin: 4000 },
      { label: "6500 K", kelvin: 6500 },
    ],
    mountingSafetyWarnings: [
      "Ray spotunuzu;",
      "Teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz ve ürün ile birlikte gelmesi gereken aksesuarlar varsa tam olup olmadığını kontrol ediniz.",
      "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.",
      "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.",
      "Bunların okunmaması veya yıpranmış olması durumunda ürününüz garanti kapsamına girmemektedir.",
      "Ürün kullanım amaçları haricinde kullanılmamalıdır.",
      "Satıcı firma, ürünün usulüne uygun olmayan bir şekilde kullanılması sonucu ortaya çıkabilecek yaralanma veya hasar görme vakalarında sorumluluk almaz.",
      "Elektrik bağlantıları sadece ama sadece uzman personel tarafından yapılmalıdır.",
      "Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.",
      "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız. Aksi takdirde ölüm, ciddi yaralanma veya maddi hasara neden olabilir.",
      "Montajına başlamadan önce kabloların ve ürünün dış çeperlerinin hasarlı olmadığından emin olunuz.",
      "Etiket üzerinde belirtilen çalışma geriliminden yüksek bir gerilim almadığından emin olunuz.",
      "Uyuşmazlık durumunda meydana gelebilecek arızalarda, satıcı firma sorumlu tutulamaz ve arıza garanti kapsamında değerlendirilemez.",
      "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.",
      "Şebeke bağlantısı ilgili ülkenin tesisat yönetmeliğine uygun bağlantı malzemeleriyle yapılmalıdır.",
      "Elektrik kaçağı olan yerlerde kullanmayın.",
      "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.",
      "Tadilat, tamir, oynama veya herhangi bir fiziksel müdahalede bulunmayınız. Bu işlem sonucu maddi hasar oluşabileceği gibi, ürün garantisi de geçersiz kalacaktır.",
    ],
    importantWarnings: [
      "Ray spot üründe meydana gelen herhangi bir arıza durumunda uzman yetkili servisimizle irtibata geçiniz.",
      "Yetkili teknik servisimiz dışında ürüne kimsenin müdahale etmesine izin vermeyiniz. Bu tür müdahaleler sonucu ürün tümüyle garanti kapsamı dışında kalır.",
      "Bu ürünün harici bükülgen kablo veya kordonu hasarlanırsa bir tehlikeden kaçınmak için yetkili kişi tarafından değiştirilmesi gerekir.",
      "Ürün çalışır durumdayken yüzeyi sıcak olduğu için ürünün enerjisi kesilmelidir ve soğumadan dokunulmamalıdır. Ürün çalışır durumdayken direkt olarak bakmayınız.",
      "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz.",
      "Çocukların ulaşamayacakları yerlerde ve ürün kutusu içinde muhafaza ediniz.",
    ],
    warrantyTerms: {
      title: "GARANTİ BELGESİ | Garanti Şartları",
      items: [
        "Ray Spot Ürününün;",
        "Garanti süresi, ürünün fatura tarihinden itibaren başlar ve 2 yıldır.",
        "Bütün parçaları dahil olmak üzere tamamı garanti kapsamına girer.",
        "Ayıplı olduğunun anlaşılması durumunda tüketici, 6502 sayılı Tüketicinin Korunması Hakkında Kanunun 11. maddesinde yer alan; a) Ücretsiz onarımı yaptırmak. b) Onarımı yapılmadığı takdirde yeni ürünle değiştirilmesi.",
        "Tüketicinin bu haklardan ücretsiz onarım durumunda satıcı; işçilik masrafı, değiştirilen parça bedeli ya da başka herhangi bir ad altında hiçbir ücret talep etmeksizin ürünün onarımını yaptırmakla yükümlüdür.",
        "Garanti süresi içerisinde arızalanması durumunda, tamirde geçen süre garanti süresine eklenir. Ürünün tamir süresi 20 iş gününü geçemez.",
        "Kullanma kılavuzunda yer alan hususlara aykırı kullanılmasından kaynaklanan arızalar garanti kapsamı dışındadır.",
        "Arızalı ürünü garanti kapsamı dışına çıkaran kullanım hataları: Elektrik ve kullanıcının kullanımından doğan arızalar (elektrik kesilmesi, voltaj dalgalanması, makinaya ait olmayan aksesuar takılması yada kullanılması zorunlu olan aksesuarların kullanılmaması gibi), garantili ürünlerde yetkili servis dışında herhangi bir müdahalenin yapılması, garanti etiketi olan ürünlerde etiketin zarar görmesi, cihazın dış yüzeyinde oluşan kırık, çizik vb. nedenlerden meydana gelen arızalar, tozlu, rutubetli, aşırı sıcak ya da soğuk ortamlarda kullanılma sebebi ile oluşan arızalar, sel, yangın, deprem, yıldırım düşmesi vb. doğal afetlerin sebep olduğu arızalarda garanti kapsamı dışındadır.",
      ],
    },
  },
  "ray-spot/mr-1070": {
    id: "mr-1070",
    name: "GRADO SERİSİ MR 1070 RAY SPOT",
    category: "Ray Spot",
    categorySlug: "ray-spot",
    code: "MR 1070",
    subtitle: "Masialux Luca Serisi Ledli Ray Spot Armatür MR 1001 | 20W – 27W",
    description:
      "Masialux Ledli Ray Spot Armatür MR 1001, mağaza, ofis ve konut projelerinde yönlendirilebilir aydınlatma çözümü sunar. Alüminyum enjeksiyon gövde, yüksek saflıkta alüminyum reflektör ve elektrostatik toz boya ile üretilmiştir.",
    images: [
      "/images/products/ray-spot/MR%201070/001-grado-serisi-mr-1070-100-ray-spot.jpg",
      "/images/products/ray-spot/MR%201070/001-grado-serisi-mr-1070-60-ray-spot.jpg",
      "/images/products/ray-spot/MR%201070/001-grado-serisi-mr-1070-85-ray-spot.jpg",
      "/images/products/ray-spot/MR%201070/002-grado-serisi-mr-1070-100-ray-spot.jpg",
      "/images/products/ray-spot/MR%201070/002-grado-serisi-mr-1070-60-ray-spot.jpg",
      "/images/products/ray-spot/MR%201070/002-grado-serisi-mr-1070-85-ray-spot.jpg",
    ],
    features: [
      { label: "Gövde", value: "Alüminyum enjeksiyon gövde ve enjeksiyon kafa" },
      { label: "Reflektör Tipi", value: "Yüksek saflıkta alüminyum reflektör" },
      { label: "Uygulama Şekli", value: "Elektronik balast ile soket veya rozanslı" },
      { label: "Boyama Tipi", value: "Elektrostatik toz boya" },
      { label: "Kullanım Şekli", value: "Ray Spot" },
    ],
    technicalSpecs: [
      { label: "Sürücü Akımı", value: "500 mA – 800 mA" },
      { label: "Gerilim", value: "220V" },
      { label: "Frekans", value: "50 Hz" },
      { label: "Aktif Güç", value: "20W – 27W" },
      { label: "Lümen", value: "2380 lm – 3150 lm" },
      { label: "Işık Kaynağı", value: "Mid Power LED" },
    ],
    usageAreas: ["Dekorasyon", "Süpermarketler", "Mağazalar", "Evler"],
    relatedIds: ["mr-801-100", "mr-418-1", "mr-801-85", "mr-601-100"],
    downloads: [
      { label: "Datasheet" },
      { label: "Kullanım Kılavuzu" },
      { label: "2D Çizim" },
      { label: "3D Çizim" },
      { label: "LDT Dosyaları" },
    ],
    bodyColorOptions: [
      { label: "Siyah", value: "black" },
      { label: "Beyaz", value: "white" },
      { label: "RAL", value: "ral" },
    ],
    lightColorOptions: [
      { label: "2700 K", kelvin: 2700 },
      { label: "3000 K", kelvin: 3000 },
      { label: "4000 K", kelvin: 4000 },
      { label: "6500 K", kelvin: 6500 },
    ],
    mountingSafetyWarnings: [
      "Ray spotunuzu;",
      "Teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz ve ürün ile birlikte gelmesi gereken aksesuarlar varsa tam olup olmadığını kontrol ediniz.",
      "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.",
      "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.",
      "Bunların okunmaması veya yıpranmış olması durumunda ürününüz garanti kapsamına girmemektedir.",
      "Ürün kullanım amaçları haricinde kullanılmamalıdır.",
      "Satıcı firma, ürünün usulüne uygun olmayan bir şekilde kullanılması sonucu ortaya çıkabilecek yaralanma veya hasar görme vakalarında sorumluluk almaz.",
      "Elektrik bağlantıları sadece ama sadece uzman personel tarafından yapılmalıdır.",
      "Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.",
      "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız. Aksi takdirde ölüm, ciddi yaralanma veya maddi hasara neden olabilir.",
      "Montajına başlamadan önce kabloların ve ürünün dış çeperlerinin hasarlı olmadığından emin olunuz.",
      "Etiket üzerinde belirtilen çalışma geriliminden yüksek bir gerilim almadığından emin olunuz.",
      "Uyuşmazlık durumunda meydana gelebilecek arızalarda, satıcı firma sorumlu tutulamaz ve arıza garanti kapsamında değerlendirilemez.",
      "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.",
      "Şebeke bağlantısı ilgili ülkenin tesisat yönetmeliğine uygun bağlantı malzemeleriyle yapılmalıdır.",
      "Elektrik kaçağı olan yerlerde kullanmayın.",
      "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.",
      "Tadilat, tamir, oynama veya herhangi bir fiziksel müdahalede bulunmayınız. Bu işlem sonucu maddi hasar oluşabileceği gibi, ürün garantisi de geçersiz kalacaktır.",
    ],
    importantWarnings: [
      "Ray spot üründe meydana gelen herhangi bir arıza durumunda uzman yetkili servisimizle irtibata geçiniz.",
      "Yetkili teknik servisimiz dışında ürüne kimsenin müdahale etmesine izin vermeyiniz. Bu tür müdahaleler sonucu ürün tümüyle garanti kapsamı dışında kalır.",
      "Bu ürünün harici bükülgen kablo veya kordonu hasarlanırsa bir tehlikeden kaçınmak için yetkili kişi tarafından değiştirilmesi gerekir.",
      "Ürün çalışır durumdayken yüzeyi sıcak olduğu için ürünün enerjisi kesilmelidir ve soğumadan dokunulmamalıdır. Ürün çalışır durumdayken direkt olarak bakmayınız.",
      "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz.",
      "Çocukların ulaşamayacakları yerlerde ve ürün kutusu içinde muhafaza ediniz.",
    ],
    warrantyTerms: {
      title: "GARANTİ BELGESİ | Garanti Şartları",
      items: [
        "Ray Spot Ürününün;",
        "Garanti süresi, ürünün fatura tarihinden itibaren başlar ve 2 yıldır.",
        "Bütün parçaları dahil olmak üzere tamamı garanti kapsamına girer.",
        "Ayıplı olduğunun anlaşılması durumunda tüketici, 6502 sayılı Tüketicinin Korunması Hakkında Kanunun 11. maddesinde yer alan; a) Ücretsiz onarımı yaptırmak. b) Onarımı yapılmadığı takdirde yeni ürünle değiştirilmesi.",
        "Tüketicinin bu haklardan ücretsiz onarım durumunda satıcı; işçilik masrafı, değiştirilen parça bedeli ya da başka herhangi bir ad altında hiçbir ücret talep etmeksizin ürünün onarımını yaptırmakla yükümlüdür.",
        "Garanti süresi içerisinde arızalanması durumunda, tamirde geçen süre garanti süresine eklenir. Ürünün tamir süresi 20 iş gününü geçemez.",
        "Kullanma kılavuzunda yer alan hususlara aykırı kullanılmasından kaynaklanan arızalar garanti kapsamı dışındadır.",
        "Arızalı ürünü garanti kapsamı dışına çıkaran kullanım hataları: Elektrik ve kullanıcının kullanımından doğan arızalar (elektrik kesilmesi, voltaj dalgalanması, makinaya ait olmayan aksesuar takılması yada kullanılması zorunlu olan aksesuarların kullanılmaması gibi), garantili ürünlerde yetkili servis dışında herhangi bir müdahalenin yapılması, garanti etiketi olan ürünlerde etiketin zarar görmesi, cihazın dış yüzeyinde oluşan kırık, çizik vb. nedenlerden meydana gelen arızalar, tozlu, rutubetli, aşırı sıcak ya da soğuk ortamlarda kullanılma sebebi ile oluşan arızalar, sel, yangın, deprem, yıldırım düşmesi vb. doğal afetlerin sebep olduğu arızalarda garanti kapsamı dışındadır.",
      ],
    },
  },
  "ray-spot/mr-1071": { id: "mr-1071", name: "SHARK SERİSİ MR 1071 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1071", images: ["/images/products/ray-spot/MR%201071/001-shark-serisi-mr-1071-1-ray-spot.jpg", "/images/products/ray-spot/MR%201071/001-shark-serisi-mr-1071-2-ray-spot.jpg", "/images/products/ray-spot/MR%201071/002-shark-serisi-mr-1071-1-ray-spot.jpg", "/images/products/ray-spot/MR%201071/002-shark-serisi-mr-1071-2-ray-spot.jpg", "/images/products/ray-spot/MR%201071/003-shark-serisi-mr-1071-1-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1081": { id: "mr-1081", name: "VİRA SERİSİ MR 1081 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1081", images: ["/images/products/ray-spot/MR%201081/001-vira-serisi-mr-1081-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/001-vira-serisi-mr-1081-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/001-vira-serisi-mr-1082-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/001-vira-serisi-mr-1082-60-ray-spot.jpg", "/images/products/ray-spot/MR%201081/001-vira-serisi-mr-1082-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/002-vira-serisi-mr-1081-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/002-vira-serisi-mr-1081-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/002-vira-serisi-mr-1082-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/002-vira-serisi-mr-1082-60-ray-spot.jpg", "/images/products/ray-spot/MR%201081/002-vira-serisi-mr-1082-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/003-vira-serisi-mr-1081-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/003-vira-serisi-mr-1081-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/003-vira-serisi-mr-1082-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/003-vira-serisi-mr-1082-60-ray-spot.jpg", "/images/products/ray-spot/MR%201081/004-vira-serisi-mr-1081-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/004-vira-serisi-mr-1081-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/004-vira-serisi-mr-1082-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/005-vira-serisi-mr-1081-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/005-vira-serisi-mr-1081-85-ray-spot.jpg", "/images/products/ray-spot/MR%201081/005-vira-serisi-mr-1082-100-ray-spot.jpg", "/images/products/ray-spot/MR%201081/005-vira-serisi-mr-1082-60-ray-spot.jpg", "/images/products/ray-spot/MR%201081/005-vira-serisi-mr-1082-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1090": { id: "mr-1090", name: "DORA SERİSİ MR 1090 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1090", images: ["/images/products/ray-spot/MR%201090/001-dora-serisi-mr-1090-100-ray-spot.jpg", "/images/products/ray-spot/MR%201090/001-dora-serisi-mr-1090-60-ray-spot.jpg", "/images/products/ray-spot/MR%201090/001-dora-serisi-mr-1090-85-ray-spot.jpg", "/images/products/ray-spot/MR%201090/002-dora-serisi-mr-1090-100-ray-spot.jpg", "/images/products/ray-spot/MR%201090/002-dora-serisi-mr-1090-60-ray-spot.jpg", "/images/products/ray-spot/MR%201090/002-dora-serisi-mr-1090-85-ray-spot.jpg", "/images/products/ray-spot/MR%201090/003-dora-serisi-mr-1090-100-ray-spot.jpg", "/images/products/ray-spot/MR%201090/003-dora-serisi-mr-1090-60-ray-spot.jpg", "/images/products/ray-spot/MR%201090/004-dora-serisi-mr-1090-100-ray-spot.jpg", "/images/products/ray-spot/MR%201090/004-dora-serisi-mr-1090-60-ray-spot.jpg", "/images/products/ray-spot/MR%201090/004-dora-serisi-mr-1090-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1002": { id: "mr-1002", name: "LUCA SERİSİ MR 1002 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1002", images: ["/images/products/ray-spot/MR%201002/001-luca-serisi-mr-1002-ray-spot.jpg", "/images/products/ray-spot/MR%201002/002-luca-serisi-mr-1002-ray-spot.jpg", "/images/products/ray-spot/MR%201002/003-luca-serisi-mr-1002-ray-spot.jpg", "/images/products/ray-spot/MR%201002/004-luca-serisi-mr-1002-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1010-100": { id: "mr-1010-100", name: "LİMA SERİSİ MR 1010-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1010-100", images: ["/images/products/ray-spot/MR%201010-100/001-lima-serisi-mr-1010-100-ray-spot.jpg", "/images/products/ray-spot/MR%201010-100/002-lima-serisi-mr-1010-100-ray-spot.jpg", "/images/products/ray-spot/MR%201010-100/003-lima-serisi-mr-1010-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1010-85": { id: "mr-1010-85", name: "LİMA SERİSİ MR 1010-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1010-85", images: ["/images/products/ray-spot/MR%201010-85/001-lima-serisi-mr-1010-85-ray-spot.jpg", "/images/products/ray-spot/MR%201010-85/002-lima-serisi-mr-1010-85-ray-spot.jpg", "/images/products/ray-spot/MR%201010-85/004-lima-serisi-mr-1010-85-ray-spot.jpg", "/images/products/ray-spot/MR%201010-85/005-lima-serisi-mr-1010-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1020-100": { id: "mr-1020-100", name: "LANZO SERİSİ MR 1020-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1020-100", images: ["/images/products/ray-spot/MR%201020-100/001-lanzo-serisi-mr-1020-100-ray-spot.jpg", "/images/products/ray-spot/MR%201020-100/002-lanzo-serisi-mr-1020-100-ray-spot.jpg", "/images/products/ray-spot/MR%201020-100/003-lanzo-serisi-mr-1020-100-ray-spot.jpg", "/images/products/ray-spot/MR%201020-100/004-lanzo-serisi-mr-1020-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1020-118": { id: "mr-1020-118", name: "LANZO SERİSİ MR 1020-118 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1020-118", images: ["/images/products/ray-spot/MR%201020-118/001-lanzo-serisi-mr-1020-118-ray-spot.jpg", "/images/products/ray-spot/MR%201020-118/002-lanzo-serisi-mr-1020-118-ray-spot.jpg", "/images/products/ray-spot/MR%201020-118/003-lanzo-serisi-mr-1020-118-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1020-60": { id: "mr-1020-60", name: "LANZO SERİSİ MR 1020-60 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1020-60", images: ["/images/products/ray-spot/MR%201020-60/001-lanzo-serisi-mr-1020-60-ray-spot.jpg", "/images/products/ray-spot/MR%201020-60/002-lanzo-serisi-mr-1020-60-ray-spot.jpg", "/images/products/ray-spot/MR%201020-60/003-lanzo-serisi-mr-1020-60-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1020-85": { id: "mr-1020-85", name: "LANZO SERİSİ MR 1020-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1020-85", images: ["/images/products/ray-spot/MR%201020-85/001-lanzo-serisi-mr-1020-85-ray-spot.jpg", "/images/products/ray-spot/MR%201020-85/002-lanzo-serisi-mr-1020-85-ray-spot.jpg", "/images/products/ray-spot/MR%201020-85/003-lanzo-serisi-mr-1020-85-ray-spot.jpg", "/images/products/ray-spot/MR%201020-85/004-lanzo-serisi-mr-1020-85-ray-spot.jpg", "/images/products/ray-spot/MR%201020-85/005-lanzo-serisi-mr-1020-85-ray-spot.jpg", "/images/products/ray-spot/MR%201020-85/006-lanzo-serisi-mr-1020-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1030-100": { id: "mr-1030-100", name: "SENİTA SERİSİ MR 1030-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1030-100", images: ["/images/products/ray-spot/MR%201030-100/001-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/002-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/003-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/004-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/005-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/006-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/007-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/008-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/009-senita-serisi-mr-1030-100-ray-spot.jpg", "/images/products/ray-spot/MR%201030-100/010-senita-serisi-mr-1030-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1030-85": { id: "mr-1030-85", name: "SENİTA SERİSİ MR 1030-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1030-85", images: ["/images/products/ray-spot/MR%201030-85/001-senita-serisi-mr-1030-85-ray-spot.jpg", "/images/products/ray-spot/MR%201030-85/002-senita-serisi-mr-1030-85-ray-spot.jpg", "/images/products/ray-spot/MR%201030-85/003-senita-serisi-mr-1030-85-ray-spot.jpg", "/images/products/ray-spot/MR%201030-85/004-senita-serisi-mr-1030-85-ray-spot.jpg", "/images/products/ray-spot/MR%201030-85/005-senita-serisi-mr-1030-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1040": { id: "mr-1040", name: "BERA SERİSİ MR 1040 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1040", images: ["/images/products/ray-spot/MR%201040/001-bera-serisi-mr-1040-ray-spot.jpg", "/images/products/ray-spot/MR%201040/002-bera-serisi-mr-1040-ray-spot.jpg", "/images/products/ray-spot/MR%201040/003-bera-serisi-mr-1040-ray-spot.jpg", "/images/products/ray-spot/MR%201040/004-bera-serisi-mr-1040-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1050-60": { id: "mr-1050-60", name: "LAİRO SERİSİ MR 1050-60 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1050-60", images: ["/images/products/ray-spot/MR%201050-60/001-lairo-serisi-mr-1050-60-ray-spot.jpg", "/images/products/ray-spot/MR%201050-60/002-lairo-serisi-mr-1050-60-ray-spot.jpg", "/images/products/ray-spot/MR%201050-60/003-lairo-serisi-mr-1050-60-ray-spot.jpg", "/images/products/ray-spot/MR%201050-60/004-lairo-serisi-mr-1050-60-ray-spot.jpg", "/images/products/ray-spot/MR%201050-60/005-lairo-serisi-mr-1050-60-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-1060": { id: "mr-1060", name: "BRUNA SERİSİ MR 1060 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 1060", images: ["/images/products/ray-spot/MR%201060/005-bruna-serisi-mr-1060-ray-spot.jpg", "/images/products/ray-spot/MR%201060/006-bruna-serisi-mr-1060-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-301": { id: "mr-301", name: "GOLOBO SERİSİ MR 301 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 301", images: ["/images/products/ray-spot/MR%20301/001-golobo-serisi-mr-301-ray-spot.jpg", "/images/products/ray-spot/MR%20301/002-golobo-serisi-mr-301-ray-spot.jpg", "/images/products/ray-spot/MR%20301/003-golobo-serisi-mr-301-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-307": { id: "mr-307", name: "GOLOBO SERİSİ MR 307 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 307", images: ["/images/products/ray-spot/MR%20307/001-golobo-serisi-mr-307-ray-spot.jpg", "/images/products/ray-spot/MR%20307/002-golobo-serisi-mr-307-ray-spot.jpg", "/images/products/ray-spot/MR%20307/003-golobo-serisi-mr-307-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-418": { id: "mr-418", name: "NORA SERİSİ MR 418 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 418", images: ["/images/products/ray-spot/MR%20418/001-nora-serisi-mr-418-ray-spot.jpg", "/images/products/ray-spot/MR%20418/002-nora-serisi-mr-418-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-418-1": { id: "mr-418-1", name: "NORA SERİSİ MR 418-1 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 418-1", images: ["/images/products/ray-spot/MR%20418-1/001-nora-serisi-mr-418-1-ray-spot.jpg", "/images/products/ray-spot/MR%20418-1/002-nora-serisi-mr-418-1-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-418-2": { id: "mr-418-2", name: "NORA SERİSİ MR 418-2 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 418-2", images: ["/images/products/ray-spot/MR%20418-2/001-nora-serisi-mr-418-2-ray-spot.jpg", "/images/products/ray-spot/MR%20418-2/002-nora-serisi-mr-418-2-ray-spot.jpg", "/images/products/ray-spot/MR%20418-2/003-nora-serisi-mr-418-2-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-421": { id: "mr-421", name: "NORA SERİSİ MR 421 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 421", images: ["/images/products/ray-spot/MR%20421/001-nora-serisi-mr-421-ray-spot.jpg", "/images/products/ray-spot/MR%20421/002-nora-serisi-mr-421-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-423": { id: "mr-423", name: "NORA SERİSİ MR 423 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 423", images: ["/images/products/ray-spot/MR%20423/001-nora-serisi-mr-423-ray-spot.jpg", "/images/products/ray-spot/MR%20423/002-nora-serisi-mr-423-ray-spot.jpg", "/images/products/ray-spot/MR%20423/003-nora-serisi-mr-423-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-425-100": { id: "mr-425-100", name: "ROTELLA SERİSİ MR 425-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 425-100", images: ["/images/products/ray-spot/MR%20425-100/001-rotella-serisi-mr-425-100-ray-spot.jpg", "/images/products/ray-spot/MR%20425-100/002-rotella-serisi-mr-425-100-ray-spot.jpg", "/images/products/ray-spot/MR%20425-100/003-rotella-serisi-mr-425-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-425-118": { id: "mr-425-118", name: "ROTELLA SERİSİ MR 425-118 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 425-118", images: ["/images/products/ray-spot/MR%20425-118/001-rotella-serisi-mr-425-118-ray-spot.jpg", "/images/products/ray-spot/MR%20425-118/002-rotella-serisi-mr-425-118-ray-spot.jpg", "/images/products/ray-spot/MR%20425-118/003-rotella-serisi-mr-425-118-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-425-85": { id: "mr-425-85", name: "ROTELLA SERİSİ MR 425-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 425-85", images: ["/images/products/ray-spot/MR%20425-85/001-rotella-serisi-mr-425-85-ray-spot.jpg", "/images/products/ray-spot/MR%20425-85/002-rotella-serisi-mr-425-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-501": { id: "mr-501", name: "SATURN SERİSİ MR 501 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 501", images: ["/images/products/ray-spot/MR%20501/001-saturn-serisi-mr-501-ray-spot.jpg", "/images/products/ray-spot/MR%20501/002-saturn-serisi-mr-501-ray-spot.jpg", "/images/products/ray-spot/MR%20501/003-saturn-serisi-mr-501-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-502": { id: "mr-502", name: "SATURN SERİSİ MR 502 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 502", images: ["/images/products/ray-spot/MR%20502/001-saturn-serisi-mr-502-ray-spot.jpg", "/images/products/ray-spot/MR%20502/002-saturn-serisi-mr-502-ray-spot.jpg", "/images/products/ray-spot/MR%20502/003-saturn-serisi-mr-502-ray-spot.jpg", "/images/products/ray-spot/MR%20502/004-saturn-serisi-mr-502-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-601-100": { id: "mr-601-100", name: "RENARDO SERİSİ MR 601-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 601-100", images: ["/images/products/ray-spot/MR%20601-100/001-renardo-serisi-mr-601-100-ray-spot.jpg", "/images/products/ray-spot/MR%20601-100/002-renardo-serisi-mr-601-100-ray-spot.jpg", "/images/products/ray-spot/MR%20601-100/003-renardo-serisi-mr-601-100-ray-spot.jpg", "/images/products/ray-spot/MR%20601-100/0014-renardo-serisi-mr-601-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-601-118": { id: "mr-601-118", name: "RENARDO SERİSİ MR 601-118 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 601-118", images: ["/images/products/ray-spot/MR%20601-118/001-renardo-serisi-mr-601-118-ray-spot.jpg", "/images/products/ray-spot/MR%20601-118/002-renardo-serisi-mr-601-118-ray-spot.jpg", "/images/products/ray-spot/MR%20601-118/003-renardo-serisi-mr-601-118-ray-spot.jpg", "/images/products/ray-spot/MR%20601-118/004-renardo-serisi-mr-601-118-ray-spot.jpg", "/images/products/ray-spot/MR%20601-118/005-renardo-serisi-mr-601-118-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-602-100": { id: "mr-602-100", name: "RENARDO SERİSİ MR 602 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 602-100", images: ["/images/products/ray-spot/MR%20602-100/001-renardo-serisi-mr-602-ray-spot.jpg", "/images/products/ray-spot/MR%20602-100/002-renardo-serisi-mr-602-ray-spot.jpg", "/images/products/ray-spot/MR%20602-100/003-renardo-serisi-mr-602-ray-spot.jpg", "/images/products/ray-spot/MR%20602-100/004-renardo-serisi-mr-602-ray-spot.jpg", "/images/products/ray-spot/MR%20602-100/005-renardo-serisi-mr-602-ray-spot.jpg", "/images/products/ray-spot/MR%20602-100/006-renardo-serisi-mr-602-ray-spot.jpg", "/images/products/ray-spot/MR%20602-100/007-renardo-serisi-mr-602-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-701-100": { id: "mr-701-100", name: "LUCIANO SERİSİ MR 701-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 701-100", images: ["/images/products/ray-spot/MR%20701-100/001-luciano-serisi-mr-701-100-ray-spot.jpg", "/images/products/ray-spot/MR%20701-100/002-luciano-serisi-mr-701-100-ray-spot.jpg", "/images/products/ray-spot/MR%20701-100/003-luciano-serisi-mr-701-100-ray-spot.jpg", "/images/products/ray-spot/MR%20701-100/004-luciano-serisi-mr-701-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-701-85": { id: "mr-701-85", name: "LUCIANO SERİSİ MR 701-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 701-85", images: ["/images/products/ray-spot/MR%20701-85/001-luciano-serisi-mr-701-85-ray-spot.jpg", "/images/products/ray-spot/MR%20701-85/002-luciano-serisi-mr-701-85-ray-spot.jpg", "/images/products/ray-spot/MR%20701-85/003-luciano-serisi-mr-701-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-801-100": { id: "mr-801-100", name: "NENA SERİSİ MR 801-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 801-100", images: ["/images/products/ray-spot/MR%20801-100/001-nena-serisi-mr-801-100-ray-spot.jpg", "/images/products/ray-spot/MR%20801-100/002-nena-serisi-mr-801-100-ray-spot.jpg", "/images/products/ray-spot/MR%20801-100/003-nena-serisi-mr-801-100-ray-spot.jpg", "/images/products/ray-spot/MR%20801-100/005-nena-serisi-mr-801-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-801-85": { id: "mr-801-85", name: "NENA SERİSİ MR 801-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 801-85", images: ["/images/products/ray-spot/MR%20801-85/001-nena-serisi-mr-801-85-ray-spot.jpg", "/images/products/ray-spot/MR%20801-85/002-nena-serisi-mr-801-85-ray-spot.jpg", "/images/products/ray-spot/MR%20801-85/003-nena-serisi-mr-801-85-ray-spot.jpg", "/images/products/ray-spot/MR%20801-85/004-nena-serisi-mr-801-85-ray-spot.jpg", "/images/products/ray-spot/MR%20801-85/005-nena-serisi-mr-801-85-ray-spot.jpg", "/images/products/ray-spot/MR%20801-85/006-nena-serisi-mr-801-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-802-100": { id: "mr-802-100", name: "NENA SERİSİ MR 802-100 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 802-100", images: ["/images/products/ray-spot/MR%20802-100/001-nena-serisi-mr-802-100-ray-spot.jpg", "/images/products/ray-spot/MR%20802-100/002-nena-serisi-mr-802-100-ray-spot.jpg", "/images/products/ray-spot/MR%20802-100/003-nena-serisi-mr-802-100-ray-spot.jpg", "/images/products/ray-spot/MR%20802-100/004-nena-serisi-mr-802-100-ray-spot.jpg", "/images/products/ray-spot/MR%20802-100/005-nena-serisi-mr-802-100-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "ray-spot/mr-802-85": { id: "mr-802-85", name: "NENA SERİSİ MR 802-85 RAY SPOT", category: "Ray Spot", categorySlug: "ray-spot", code: "MR 802-85", images: ["/images/products/ray-spot/MR%20802-85/001-nena-serisi-mr-802-85-ray-spot.jpg", "/images/products/ray-spot/MR%20802-85/002-nena-serisi-mr-802-85-ray-spot.jpg", "/images/products/ray-spot/MR%20802-85/003-nena-serisi-mr-802-85-ray-spot.jpg", "/images/products/ray-spot/MR%20802-85/004-nena-serisi-mr-802-85-ray-spot.jpg", "/images/products/ray-spot/MR%20802-85/005-nena-serisi-mr-802-85-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-1000-118": { id: "ms-1000-118", name: "SHANA SERİSİ MS 1000-118 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 1000-118", images: ["/images/products/siva-ustu/MS%201000-118/001-shana-serisi-ms-1000-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%201000-118/002-shana-serisi-ms-1000-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%201000-118/003-shana-serisi-ms-1000-118-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-1000-150": { id: "ms-1000-150", name: "SHANA SERİSİ MS 1000-150 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 1000-150", images: ["/images/products/siva-ustu/MS%201000-150/001-shana-serisi-ms-1000-150-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%201000-150/002-shana-serisi-ms-1000-150-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%201000-150/003-shana-serisi-ms-1000-150-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-1000-85": { id: "ms-1000-85", name: "SHANA SERİSİ MS 1000-85 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 1000-85", images: ["/images/products/siva-ustu/MS%201000-85/001-shana-serisi-ms-1000-85-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%201000-85/002-shana-serisi-ms-1000-85-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%201000-85/003-shana-serisi-ms-1000-85-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-500-1": { id: "ms-500-1", name: "NORA SERİSİ MS 500-1 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 500-1", images: ["/images/products/siva-ustu/MS%20500-1/001-nora-serisi-ms-500-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-1/002-nora-serisi-ms-500-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-1/003-nora-serisi-ms-500-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-1/004-nora-serisi-ms-500-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-1/005-nora-serisi-ms-500-1-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-500-2": { id: "ms-500-2", name: "NORA SERİSİ MS 500-2 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 500-2", images: ["/images/products/siva-ustu/MS%20500-2/001-nora-serisi-ms-500-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-2/002-nora-serisi-ms-500-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-2/003-nora-serisi-ms-500-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-2/004-nora-serisi-ms-500-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-2/005-nora-serisi-ms-500-2-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-500-3": { id: "ms-500-3", name: "NORA SERİSİ MS 500-3 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 500-3", images: ["/images/products/siva-ustu/MS%20500-3/001-nora-serisi-ms-500-3-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-3/002-nora-serisi-ms-500-3-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20500-3/003-nora-serisi-ms-500-3-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-605-100": { id: "ms-605-100", name: "TINA SERİSİ MS 605-100 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 605-100", images: ["/images/products/siva-ustu/MS%20605-100/001-tina-serisi-ms-605-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-100/002-tina-serisi-ms-605-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-100/003-tina-serisi-ms-605-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-100/004-tina-serisi-ms-605-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-100/005-tina-serisi-ms-605-100-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-605-118": { id: "ms-605-118", name: "TINA SERİSİ MS 605-118 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 605-118", images: ["/images/products/siva-ustu/MS%20605-118/001-tina-serisi-ms-605-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-118/002-tina-serisi-ms-605-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-118/003-tina-serisi-ms-605-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-118/004-tina-serisi-ms-605-118-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-605-60": { id: "ms-605-60", name: "NORA SERİSİ MS 605-60 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 605-60", images: ["/images/products/siva-ustu/MS%20605-60/001-nora-serisi-ms-605-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-60/002-nora-serisi-ms-605-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-60/003-nora-serisi-ms-605-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20605-60/004-tina-serisi-ms-605-60-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-1-100": { id: "ms-612-1-100", name: "CARLA SERİSİ MS 612-1-100 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-1-100", images: ["/images/products/siva-ustu/MS%20612-1-100/001-carla-serisi-ms-612-1-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-1-100/002-carla-serisi-ms-612-1-100-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-1-118": { id: "ms-612-1-118", name: "CARLA SERİSİ MS 612-1-118 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-1-118", images: ["/images/products/siva-ustu/MS%20612-1-118/001-carla-serisi-ms-612-1-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-1-118/002-carla-serisi-ms-612-1-118-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-1-60": { id: "ms-612-1-60", name: "CARLA SERİSİ MS 612-1-60 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-1-60", images: ["/images/products/siva-ustu/MS%20612-1-60/001-carla-serisi-ms-612-1-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-1-60/002-carla-serisi-ms-612-1-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-1-60/003-carla-serisi-ms-612-1-60-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-1-85": { id: "ms-612-1-85", name: "CARLA SERİSİ MS 612-85 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-1-85", images: ["/images/products/siva-ustu/MS%20612-1-85/001-carla-serisi-ms-612-85-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-1-85/002-carla-serisi-ms-612-85-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-2-100": { id: "ms-612-2-100", name: "CARLA SERİSİ MS 612-2-100 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-2-100", images: ["/images/products/siva-ustu/MS%20612-2-100/001-carla-serisi-ms-612-2-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-2-100/002-carla-serisi-ms-612-2-100-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-2-100/003-carla-serisi-ms-612-2-100-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-2-118": { id: "ms-612-2-118", name: "CARLA SERİSİ MS 612-2-118 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-2-118", images: ["/images/products/siva-ustu/MS%20612-2-118/001-carla-serisi-ms-612-2-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-2-118/002-carla-serisi-ms-612-2-118-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-2-60": { id: "ms-612-2-60", name: "CARLA SERİSİ MS 612-2-60 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-2-60", images: ["/images/products/siva-ustu/MS%20612-2-60/001-carla-serisi-ms-612-2-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-2-60/002-carla-serisi-ms-612-2-60-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-2-85": { id: "ms-612-2-85", name: "CARLA SERİSİ MS 612-2-85 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-2-85", images: ["/images/products/siva-ustu/MS%20612-2-85/001-carla-serisi-ms-612-2-85-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-2-85/002-carla-serisi-ms-612-2-85-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-3-118": { id: "ms-612-3-118", name: "CARLA SERİSİ MS 612-3-118 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-3-118", images: ["/images/products/siva-ustu/MS%20612-3-118/001-carla-serisi-ms-612-3-118-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-3-118/002-carla-serisi-ms-612-3-118-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-612-3-60": { id: "ms-612-3-60", name: "CARLA SERİSİ MS 612-3-60 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 612-3-60", images: ["/images/products/siva-ustu/MS%20612-3-60/001-carla-serisi-ms-612-3-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20612-3-60/002-carla-serisi-ms-612-3-60-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-613": { id: "ms-613", name: "PUTO SERİSİ MS 613-60 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 613", images: ["/images/products/siva-ustu/MS%20613/001-puto-serisi-ms-613-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20613/002-puto-serisi-ms-613-60-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20613/003-puto-serisi-ms-613-60-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-614": { id: "ms-614", name: "PUTO SERİSİ MS 614 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 614", images: ["/images/products/siva-ustu/MS%20614/001-puto-serisi-ms-614-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20614/002-puto-serisi-ms-614-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20614/003-puto-serisi-ms-614-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-615": { id: "ms-615", name: "PUTO SERİSİ MS 615 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 615", images: ["/images/products/siva-ustu/MS%20615/001-puto-serisi-ms-615-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20615/002-puto-serisi-ms-615-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20615/003-puto-serisi-ms-615-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-615-1": { id: "ms-615-1", name: "PUTO SERİSİ MS 615-1 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 615-1", images: ["/images/products/siva-ustu/MS%20615-1/001-puto-serisi-ms-615-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20615-1/002-puto-serisi-ms-615-1-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-616-1": { id: "ms-616-1", name: "TİNTA SERİSİ MS 616-1 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 616-1", images: ["/images/products/siva-ustu/MS%20616-1/001-tinta-serisi-ms-616-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-1/002-tinta-serisi-ms-616-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-1/003-tinta-serisi-ms-616-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-1/004-tinta-serisi-ms-616-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-1/005-tinta-serisi-ms-616-1-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-616-2": { id: "ms-616-2", name: "TİNTA SERİSİ MS 616-2 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 616-2", images: ["/images/products/siva-ustu/MS%20616-2/001-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/002-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/003-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/004-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/005-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/006-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/007-tinta-serisi-ms-616-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20616-2/008-tinta-serisi-ms-616-2-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-617-1": { id: "ms-617-1", name: "TİNTA SERİSİ MS 617-1 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 617-1", images: ["/images/products/siva-ustu/MS%20617-1/001-tinta-serisi-ms-617-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20617-1/002-tinta-serisi-ms-617-1-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-617-2": { id: "ms-617-2", name: "TİNTA SERİSİ MS 617-2 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 617-2", images: ["/images/products/siva-ustu/MS%20617-2/001-tinta-serisi-ms-617-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20617-2/002-tinta-serisi-ms-617-2-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-624": { id: "ms-624", name: "BRUNA SERİSİ MS 624-4 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 624", images: ["/images/products/siva-ustu/MS%20624/001-bruna-serisi-ms-624-4-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20624/002-bruna-serisi-ms-624-4-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-630": { id: "ms-630", name: "TINTA SERİSİ MS 630 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 630", images: ["/images/products/siva-ustu/MS%20630/001-tinta-serisi-ms-630-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20630/001-tinta-serisi-ms-631-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20630/002-tinta-serisi-ms-630-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20630/002-tinta-serisi-ms-631-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-650": { id: "ms-650", name: "REKTA SERİSİ MS 650 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 650", images: ["/images/products/siva-ustu/ms%20650/001-rekta-serisi-ms-650-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/ms%20650/001-rekta-serisi-ms-650-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/ms%20650/001-rekta-serisi-ms-650-3-siva-ustu-spot.jpg", "/images/products/siva-ustu/ms%20650/002-rekta-serisi-ms-650-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/ms%20650/002-rekta-serisi-ms-650-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/ms%20650/002-rekta-serisi-ms-650-3-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-700-110": { id: "ms-700-110", name: "ORNA SERİSİ MS 700-110 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 700-110", images: ["/images/products/siva-ustu/MS%20700-110/001-orna-serisi-ms-700-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-110/002-orna-serisi-ms-700-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-110/003-orna-serisi-ms-700-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-110/004-orna-serisi-ms-700-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-110/005-orna-serisi-ms-700-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-110/006-orna-serisi-ms-700-110-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-700-130": { id: "ms-700-130", name: "ORNA SERİSİ MS 700-130 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 700-130", images: ["/images/products/siva-ustu/MS%20700-130/001-orna-serisi-ms-700-130-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-130/002-orna-serisi-ms-700-130-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-130/003-orna-serisi-ms-700-130-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-130/004-orna-serisi-ms-700-130-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-130/005-orna-serisi-ms-700-130-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-700-70": { id: "ms-700-70", name: "ORNA SERİSİ MS 700-70 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 700-70", images: ["/images/products/siva-ustu/MS%20700-70/001-orna-serisi-ms-700-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-70/002-orna-serisi-ms-700-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-70/003-orna-serisi-ms-700-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-70/004-orna-serisi-ms-700-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-70/005-orna-serisi-ms-700-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-70/006-orna-serisi-ms-700-70-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-700-90": { id: "ms-700-90", name: "ORNA SERİSİ MS 700-90 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 700-90", images: ["/images/products/siva-ustu/MS%20700-90/001-orna-serisi-ms-700-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-90/002-orna-serisi-ms-700-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-90/003-orna-serisi-ms-700-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-90/004-orna-serisi-ms-700-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-90/005-orna-serisi-ms-700-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20700-90/006-orna-serisi-ms-700-90-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-701-110": { id: "ms-701-110", name: "ORNA SERİSİ MS 701-110 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 701-110", images: ["/images/products/siva-ustu/MS%20701-110/001-orna-serisi-ms-701-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-110/002-orna-serisi-ms-701-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-110/003-orna-serisi-ms-701-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-110/004-orna-serisi-ms-701-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-110/005-orna-serisi-ms-701-110-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-110/006-orna-serisi-ms-701-110-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-701-70": { id: "ms-701-70", name: "ORNA SERİSİ MS 701-70 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 701-70", images: ["/images/products/siva-ustu/MS%20701-70/001-orna-serisi-ms-701-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-70/002-orna-serisi-ms-701-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-70/003-orna-serisi-ms-701-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-70/004-orna-serisi-ms-701-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-70/005-orna-serisi-ms-701-70-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-70/006-orna-serisi-ms-701-70-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-701-90": { id: "ms-701-90", name: "ORNA SERİSİ MS 701-90 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 701-90", images: ["/images/products/siva-ustu/MS%20701-90/001-orna-serisi-ms-701-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-90/002-orna-serisi-ms-701-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-90/003-orna-serisi-ms-701-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-90/004-orna-serisi-ms-701-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-90/005-orna-serisi-ms-701-90-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20701-90/006-orna-serisi-ms-701-90-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "surface-mounted/ms-702": { id: "ms-702", name: "SHAIN SERİSİ MS 702 SIVA ÜSTÜ SPOT", category: "Sıva Üstü", categorySlug: "surface-mounted", code: "MS 702", images: ["/images/products/siva-ustu/MS%20702/001-shain-serisi-ms-702-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/001-shain-serisi-ms-702-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/001-shain-serisi-ms-702-3-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/001-shain-serisi-ms-702-4-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/002-shain-serisi-ms-702-1-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/002-shain-serisi-ms-702-2-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/002-shain-serisi-ms-702-3-siva-ustu-spot.jpg", "/images/products/siva-ustu/MS%20702/002-shain-serisi-ms-702-4-siva-ustu-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/mbf-101": { id: "mbf-101", name: "BAFFLE SERİSİ MBF 101 BAFFLE ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MBF 101", images: ["/images/products/siva-alti/MBF%20101/001-baffle-serisi-mbf-101-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF%20101/002-minia-serisi-md-010-siva-alti-spot.jpg", "/images/products/siva-alti/MBF%20101/003-minia-serisi-md-010-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/mbf-102": { id: "mbf-102", name: "BAFFLE SERİSİ MBF 102 BAFFLE ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MBF 102", images: ["/images/products/siva-alti/MBF%20102/001-baffle-serisi-mbf-102-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF%20102/002-baffle-serisi-mbf-102-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF%20102/003-baffle-serisi-mbf-102-baffle-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/mbf-103": { id: "mbf-103", name: "BAFFLE SERİSİ MBF 103 BAFFLE ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MBF 103", images: ["/images/products/siva-alti/MBF%20103/001-baffle-serisi-mbf-103-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF%20103/002-baffle-serisi-mbf-103-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF%20103/003-baffle-serisi-mbf-103-baffle-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/mbf100": { id: "mbf100", name: "BAFFLE SERİSİ MBF 100 BAFFLE ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MBF100", images: ["/images/products/siva-alti/MBF100/001-baffle-serisi-mbf-100-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF100/002-baffle-serisi-mbf-100-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF100/003-baffle-serisi-mbf-100-baffle-alti-spot.jpg", "/images/products/siva-alti/MBF100/004-baffle-serisi-mbf-100-baffle-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-010": { id: "md-010", name: "MİNİA SERİSİ MD 010 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 010", images: ["/images/products/siva-alti/MD%20010/001-minia-serisi-md-010-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20010/002-minia-serisi-md-010-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-011": { id: "md-011", name: "MİNİA SERİSİ MD 011 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 011", images: ["/images/products/siva-alti/MD%20011/001-minia-serisi-md-011-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20011/002-minia-serisi-md-011-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20011/003-minia-serisi-md-011-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20011/004-minia-serisi-md-011-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1000-100": { id: "md-1000-100", name: "VİGGO SERİSİ MD 1000-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1000-100", images: ["/images/products/siva-alti/MD%201000-100/001-viggo-serisi-md-1000-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-100/002-viggo-serisi-md-1000-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-100/003-viggo-serisi-md-1000-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-100/004-viggo-serisi-md-1000-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-100/005-viggo-serisi-md-1000-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-100/006-viggo-serisi-md-1000-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-100/007-viggo-serisi-md-1000-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1000-60": { id: "md-1000-60", name: "VİGGO SERİSİ MD 1000-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1000-60", images: ["/images/products/siva-alti/MD%201000-60/001-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-60/002-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-60/003-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-60/004-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-60/005-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-60/006-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-60/007-viggo-serisi-md-1000-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1000-85": { id: "md-1000-85", name: "VİGGO SERİSİ MD 1000-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1000-85", images: ["/images/products/siva-alti/MD%201000-85/001-viggo-serisi-md-1000-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-85/002-viggo-serisi-md-1000-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-85/003-viggo-serisi-md-1000-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-85/004-viggo-serisi-md-1000-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-85/005-viggo-serisi-md-1000-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-85/006-viggo-serisi-md-1000-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201000-85/007-viggo-serisi-md-1000-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1001-100": { id: "md-1001-100", name: "VİGGO SERİSİ MD 1001-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1001-100", images: ["/images/products/siva-alti/MD%201001-100/001-viggo-serisi-md-1001-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-100/002-viggo-serisi-md-1001-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-100/003-viggo-serisi-md-1001-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-100/004-viggo-serisi-md-1001-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-100/005-viggo-serisi-md-1001-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-100/006-viggo-serisi-md-1001-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-100/007-viggo-serisi-md-1001-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1001-60": { id: "md-1001-60", name: "VİGGO SERİSİ MD 1001-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1001-60", images: ["/images/products/siva-alti/MD%201001-60/001-viggo-serisi-md-1001-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-60/002-viggo-serisi-md-1001-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-60/003-viggo-serisi-md-1001-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-60/004-viggo-serisi-md-1001-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-60/005-viggo-serisi-md-1001-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-60/006-viggo-serisi-md-1001-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-60/007-viggo-serisi-md-1001-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1001-85": { id: "md-1001-85", name: "VİGGO SERİSİ MD 1000-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1001-85", images: ["/images/products/siva-alti/MD%201001-85/001-viggo-serisi-md-1000-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-85/001-viggo-serisi-md-1001-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-85/003-viggo-serisi-md-1001-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-85/004-viggo-serisi-md-1001-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-85/005-viggo-serisi-md-1001-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-85/006-viggo-serisi-md-1001-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201001-85/007-viggo-serisi-md-1001-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-1-100": { id: "md-101-1-100", name: "TESCA SERİSİ MD 101-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-1-100", images: ["/images/products/siva-alti/MD%20101-1-100/001-tesca-serisi-md-101-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-100/002-tesca-serisi-md-101-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-100/003-tesca-serisi-md-101-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-100/004-tesca-serisi-md-101-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-100/005-tesca-serisi-md-101-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-1-118": { id: "md-101-1-118", name: "TESCA SERİSİ MD 101-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-1-118", images: ["/images/products/siva-alti/MD%20101-1-118/001-tesca-serisi-md-101-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-118/002-tesca-serisi-md-101-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-118/003-tesca-serisi-md-101-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-118/004-tesca-serisi-md-101-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-1-60": { id: "md-101-1-60", name: "TESCA SERİSİ MD 101-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-1-60", images: ["/images/products/siva-alti/MD%20101-1-60/001-tesca-serisi-md-101-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-60/002-tesca-serisi-md-101-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-60/003-tesca-serisi-md-101-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-60/004-tesca-serisi-md-101-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-1-85": { id: "md-101-1-85", name: "TESCA SERİSİ MD 101-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-1-85", images: ["/images/products/siva-alti/MD%20101-1-85/001-tesca-serisi-md-101-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-85/002-tesca-serisi-md-101-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-85/003-tesca-serisi-md-101-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-1-85/004-tesca-serisi-md-101-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-2-100": { id: "md-101-2-100", name: "TESCA SERİSİ MD 101-2-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-2-100", images: ["/images/products/siva-alti/MD%20101-2-100/001-tesca-serisi-md-101-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-100/002-tesca-serisi-md-101-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-100/003-tesca-serisi-md-101-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-100/004-tesca-serisi-md-101-2-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-2-118": { id: "md-101-2-118", name: "TESCA SERİSİ MD 101-2-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-2-118", images: ["/images/products/siva-alti/MD%20101-2-118/001-tesca-serisi-md-101-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-118/002-tesca-serisi-md-101-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-118/003-tesca-serisi-md-101-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-118/004-tesca-serisi-md-101-2-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-2-60": { id: "md-101-2-60", name: "TESCA SERİSİ MD 101-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-2-60", images: ["/images/products/siva-alti/MD%20101-2-60/001-tesca-serisi-md-101-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-60/002-tesca-serisi-md-101-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-60/003-tesca-serisi-md-101-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-60/004-tesca-serisi-md-101-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-2-85": { id: "md-101-2-85", name: "TESCA SERİSİ MD 101-2-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-2-85", images: ["/images/products/siva-alti/MD%20101-2-85/001-tesca-serisi-md-101-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-85/002-tesca-serisi-md-101-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-85/003-tesca-serisi-md-101-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-2-85/004-tesca-serisi-md-101-2-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-3-100": { id: "md-101-3-100", name: "TESCA SERİSİ MD 101-3-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-3-100", images: ["/images/products/siva-alti/MD%20101-3-100/001-tesca-serisi-md-101-3-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-100/002-tesca-serisi-md-101-3-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-100/003-tesca-serisi-md-101-3-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-100/004-tesca-serisi-md-101-3-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-3-118": { id: "md-101-3-118", name: "TESCA SERİSİ MD 101-3-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-3-118", images: ["/images/products/siva-alti/MD%20101-3-118/001-tesca-serisi-md-101-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-118/002-tesca-serisi-md-101-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-118/003-tesca-serisi-md-101-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-118/004-tesca-serisi-md-101-3-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-3-60": { id: "md-101-3-60", name: "TESCA SERİSİ MD 101-3-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-3-60", images: ["/images/products/siva-alti/MD%20101-3-60/001-tesca-serisi-md-101-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-60/002-tesca-serisi-md-101-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-60/003-tesca-serisi-md-101-3-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-101-3-85": { id: "md-101-3-85", name: "TESCA SERİSİ MD 101-3-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 101-3-85", images: ["/images/products/siva-alti/MD%20101-3-85/001-tesca-serisi-md-101-3-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-85/002-tesca-serisi-md-101-3-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20101-3-85/003-tesca-serisi-md-101-3-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-102-1-100": { id: "md-102-1-100", name: "LİNDA SERİSİ MD 102-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 102-1-100", images: ["/images/products/siva-alti/MD%20102-1-100/001-linda-serisi-md-102-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-100/002-linda-serisi-md-102-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-100/003-linda-serisi-md-102-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-100/004-linda-serisi-md-102-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-100/005-linda-serisi-md-102-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-102-1-118": { id: "md-102-1-118", name: "LİNDA SERİSİ MD 102-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 102-1-118", images: ["/images/products/siva-alti/MD%20102-1-118/001-linda-serisi-md-102-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-118/002-linda-serisi-md-102-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-118/003-linda-serisi-md-102-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-118/004-linda-serisi-md-102-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-118/005-linda-serisi-md-102-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-102-1-60": { id: "md-102-1-60", name: "LİNDA SERİSİ MD 102-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 102-1-60", images: ["/images/products/siva-alti/MD%20102-1-60/001-linda-serisi-md-102-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-60/002-linda-serisi-md-102-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-60/003-linda-serisi-md-102-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-60/004-linda-serisi-md-102-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-60/005-linda-serisi-md-102-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-60/006-linda-serisi-md-102-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-102-1-85": { id: "md-102-1-85", name: "LİNDA SERİSİ MD 102-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 102-1-85", images: ["/images/products/siva-alti/MD%20102-1-85/001-linda-serisi-md-102-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-85/002-linda-serisi-md-102-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-85/003-linda-serisi-md-102-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20102-1-85/004-linda-serisi-md-102-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-103": { id: "md-103", name: "LİNDA SERİSİ MD 103 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 103", images: ["/images/products/siva-alti/MD%20103/001-linda-serisi-md-103-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20103/002-linda-serisi-md-103-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20103/003-linda-serisi-md-103-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20103/004-linda-serisi-md-103-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-104": { id: "md-104", name: "DUASS SERİSİ MD 104 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 104", images: ["/images/products/siva-alti/MD%20104/001-duass-serisi-md-104-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20104/002-duass-serisi-md-104-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20104/004-duass-serisi-md-104-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20104/005-duass-serisi-md-104-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-105": { id: "md-105", name: "DUASS SERİSİ MD 105 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 105", images: ["/images/products/siva-alti/MD%20105/001-duass-serisi-md-105-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20105/002-duass-serisi-md-105-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20105/003-duass-serisi-md-105-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20105/004-duass-serisi-md-105-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20105/005-duass-serisi-md-105-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-107-1-118": { id: "md-107-1-118", name: "ALBA SERİSİ MD 107-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 107-1-118", images: ["/images/products/siva-alti/MD%20107-1-118/001-alba-serisi-md-107-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-1-118/002-alba-serisi-md-107-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-1-118/003-alba-serisi-md-107-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-1-118/004-alba-serisi-md-107-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-1-118/005-alba-serisi-md-107-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-107-2-118": { id: "md-107-2-118", name: "ALBA SERİSİ MD 107-2-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 107-2-118", images: ["/images/products/siva-alti/MD%20107-2-118/001-alba-serisi-md-107-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-2-118/002-alba-serisi-md-107-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-2-118/003-alba-serisi-md-107-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20107-2-118/004-alba-serisi-md-107-2-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-110-1-118": { id: "md-110-1-118", name: "LARA SERİSİ MD 110-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 110-1-118", images: ["/images/products/siva-alti/MD%20110-1-118/001-lara-serisi-md-110-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-1-118/002-lara-serisi-md-110-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-1-118/003-lara-serisi-md-110-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-110-1-60": { id: "md-110-1-60", name: "LARA SERİSİ MD 110-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 110-1-60", images: ["/images/products/siva-alti/MD%20110-1-60/001-lara-serisi-md-110-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-1-60/002-lara-serisi-md-110-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-1-60/003-lara-serisi-md-110-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-110-2-118": { id: "md-110-2-118", name: "LARA SERİSİ MD 110-2-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 110-2-118", images: ["/images/products/siva-alti/MD%20110-2-118/001-lara-serisi-md-110-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-2-118/002-lara-serisi-md-110-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-2-118/003-lara-serisi-md-110-2-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-110-2-60": { id: "md-110-2-60", name: "LARA SERİSİ MD 110-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 110-2-60", images: ["/images/products/siva-alti/MD%20110-2-60/001-lara-serisi-md-110-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-2-60/002-lara-serisi-md-110-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-2-60/003-lara-serisi-md-110-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-2-60/004-lara-serisi-md-110-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-110-3-118": { id: "md-110-3-118", name: "LARA SERİSİ MD 110-3-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 110-3-118", images: ["/images/products/siva-alti/MD%20110-3-118/001-lara-serisi-md-110-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-3-118/002-lara-serisi-md-110-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-3-118/003-lara-serisi-md-110-3-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-110-3-60": { id: "md-110-3-60", name: "LARA SERİSİ MD 110-3-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 110-3-60", images: ["/images/products/siva-alti/MD%20110-3-60/001-lara-serisi-md-110-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-3-60/002-lara-serisi-md-110-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20110-3-60/003-lara-serisi-md-110-3-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-1-100": { id: "md-119-1-100", name: "MATTİA SERİSİ MD 119-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-1-100", images: ["/images/products/siva-alti/MD%20119-1-100/001-mattia-serisi-md-119-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-100/002-mattia-serisi-md-119-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-100/003-mattia-serisi-md-119-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-100/004-mattia-serisi-md-119-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-1-118": { id: "md-119-1-118", name: "MATTİA SERİSİ MD 119-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-1-118", images: ["/images/products/siva-alti/MD%20119-1-118/001-mattia-serisi-md-119-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-118/002-mattia-serisi-md-119-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-118/003-mattia-serisi-md-119-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-118/004-mattia-serisi-md-119-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-118/005-mattia-serisi-md-119-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-1-60": { id: "md-119-1-60", name: "MATTİA SERİSİ MD 119-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-1-60", images: ["/images/products/siva-alti/MD%20119-1-60/001-mattia-serisi-md-119-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-60/002-mattia-serisi-md-119-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-60/003-mattia-serisi-md-119-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-60/004-mattia-serisi-md-119-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-1-85": { id: "md-119-1-85", name: "MATTİA SERİSİ MD 119-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-1-85", images: ["/images/products/siva-alti/MD%20119-1-85/001-mattia-serisi-md-119-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-85/002-mattia-serisi-md-119-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-85/003-mattia-serisi-md-119-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-1-85/004-mattia-serisi-md-119-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-2-100": { id: "md-119-2-100", name: "MATTİA SERİSİ MD 119-2-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-2-100", images: ["/images/products/siva-alti/MD%20119-2-100/001-mattia-serisi-md-119-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-100/002-mattia-serisi-md-119-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-100/003-mattia-serisi-md-119-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-100/004-mattia-serisi-md-119-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-100/005-mattia-serisi-md-119-2-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-2-118": { id: "md-119-2-118", name: "MATTİA SERİSİ MD 119-2-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-2-118", images: ["/images/products/siva-alti/MD%20119-2-118/001-mattia-serisi-md-119-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-118/002-mattia-serisi-md-119-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-118/003-mattia-serisi-md-119-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-118/004-mattia-serisi-md-119-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-118/005-mattia-serisi-md-119-2-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-2-60": { id: "md-119-2-60", name: "MATTİA SERİSİ MD 119-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-2-60", images: ["/images/products/siva-alti/MD%20119-2-60/001-mattia-serisi-md-119-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-60/002-mattia-serisi-md-119-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-60/003-mattia-serisi-md-119-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-60/005-mattia-serisi-md-119-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-60/006-mattia-serisi-md-119-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-60/007-mattia-serisi-md-119-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-2-85": { id: "md-119-2-85", name: "MATTİA SERİSİ MD 119-2-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-2-85", images: ["/images/products/siva-alti/MD%20119-2-85/001-mattia-serisi-md-119-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-85/002-mattia-serisi-md-119-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-85/003-mattia-serisi-md-119-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-2-85/004-mattia-serisi-md-119-2-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-3-60": { id: "md-119-3-60", name: "MATTİA SERİSİ MD 119-3-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-3-60", images: ["/images/products/siva-alti/MD%20119-3-60/001-mattia-serisi-md-119-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-3-60/002-mattia-serisi-md-119-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-3-60/003-mattia-serisi-md-119-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-3-60/004-mattia-serisi-md-119-3-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-119-3-85": { id: "md-119-3-85", name: "MATTİA SERİSİ MD 119-3-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 119-3-85", images: ["/images/products/siva-alti/MD%20119-3-85/001-mattia-serisi-md-119-3-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-3-85/002-mattia-serisi-md-119-3-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20119-3-85/003-mattia-serisi-md-119-3-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-121-1-60": { id: "md-121-1-60", name: "ALBA SERİSİ MD 121-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 121-1-60", images: ["/images/products/siva-alti/MD%20121-1-60/001-alba-serisi-md-121-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-1-60/002-alba-serisi-md-121-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-1-60/003-alba-serisi-md-121-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-1-60/004-alba-serisi-md-121-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-1-60/005-alba-serisi-md-121-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-121-2-60": { id: "md-121-2-60", name: "ALBA SERİSİ MD 121-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 121-2-60", images: ["/images/products/siva-alti/MD%20121-2-60/001-alba-serisi-md-121-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-2-60/002-alba-serisi-md-121-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-2-60/003-alba-serisi-md-121-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-2-60/004-alba-serisi-md-121-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-2-60/005-alba-serisi-md-121-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-121-3-60": { id: "md-121-3-60", name: "ALBA SERİSİ MD 121-3-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 121-3-60", images: ["/images/products/siva-alti/MD%20121-3-60/001-alba-serisi-md-121-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-3-60/002-alba-serisi-md-121-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-3-60/003-alba-serisi-md-121-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-3-60/004-alba-serisi-md-121-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20121-3-60/005-alba-serisi-md-121-3-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-122-1-60": { id: "md-122-1-60", name: "ALBA SERİSİ MD 122-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 122-1-60", images: ["/images/products/siva-alti/MD%20122-1-60/001-alba-serisi-md-122-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-1-60/002-alba-serisi-md-122-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-1-60/003-alba-serisi-md-122-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-1-60/004-alba-serisi-md-122-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-1-60/005-alba-serisi-md-122-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-122-100": { id: "md-122-100", name: "PANA SERİSİ MD 122-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 122-100", images: ["/images/products/siva-alti/MD%20122-100/001-pana-serisi-md-122-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-100/002-pana-serisi-md-122-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-100/003-pana-serisi-md-122-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-100/004-pana-serisi-md-122-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-100/005-pana-serisi-md-122-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-122-118": { id: "md-122-118", name: "PANA SERİSİ MD 122-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 122-118", images: ["/images/products/siva-alti/MD%20122-118/001-pana-serisi-md-122-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-118/002-pana-serisi-md-122-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-118/003-pana-serisi-md-122-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-118/004-pana-serisi-md-122-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-118/005-pana-serisi-md-122-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-122-2-60": { id: "md-122-2-60", name: "ALBA SERİSİ MD 122-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 122-2-60", images: ["/images/products/siva-alti/MD%20122-2-60/001-alba-serisi-md-122-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-2-60/002-alba-serisi-md-122-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-2-60/003-alba-serisi-md-122-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-2-60/004-alba-serisi-md-122-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-122-3-60": { id: "md-122-3-60", name: "ALBA SERİSİ MD 122-3-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 122-3-60", images: ["/images/products/siva-alti/MD%20122-3-60/001-alba-serisi-md-122-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-3-60/002-alba-serisi-md-122-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-3-60/003-alba-serisi-md-122-3-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20122-3-60/004-alba-serisi-md-122-3-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-123-1-60": { id: "md-123-1-60", name: "PANA SERİSİ MD 123-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 123-1-60", images: ["/images/products/siva-alti/MD%20123-1-60/001-pana-serisi-md-123-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20123-1-60/002-pana-serisi-md-123-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20123-1-60/003-md-123-1-60.jpg", "/images/products/siva-alti/MD%20123-1-60/003-pana-serisi-md-123-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20123-1-60/004-md-123-1-60.jpg", "/images/products/siva-alti/MD%20123-1-60/004-pana-serisi-md-123-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20123-1-60/005-pana-serisi-md-123-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-125-100": { id: "md-125-100", name: "AVA SERİSİ MD 125-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 125-100", images: ["/images/products/siva-alti/MD%20125-100/001-ava-serisi-md-125-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-100/002-ava-serisi-md-125-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-100/003-ava-serisi-md-125-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-100/005-ava-serisi-md-125-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-100/006-ava-serisi-md-125-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-125-118": { id: "md-125-118", name: "AVA SERİSİ MD 125-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 125-118", images: ["/images/products/siva-alti/MD%20125-118/001-ava-serisi-md-125-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-118/002-ava-serisi-md-125-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-118/003-ava-serisi-md-125-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-118/004-ava-serisi-md-125-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-118/005-ava-serisi-md-125-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-125-60": { id: "md-125-60", name: "AVA SERİSİ MD 125-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 125-60", images: ["/images/products/siva-alti/MD%20125-60/001-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/002-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/003-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/004-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/005-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/006-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/007-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/008-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/009-ava-serisi-md-125-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-60/010-ava-serisi-md-125-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-125-85": { id: "md-125-85", name: "AVA SERİSİ MD 125-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 125-85", images: ["/images/products/siva-alti/MD%20125-85/001-ava-serisi-md-125-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-85/002-ava-serisi-md-125-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-85/003-ava-serisi-md-125-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-85/005-ava-serisi-md-125-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20125-85/006-ava-serisi-md-125-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-126": { id: "md-126", name: "LIVA SERİSİ MD 126 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 126", images: ["/images/products/siva-alti/MD%20126/001-liva-serisi-md-126-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/001-liva-serisi-md-126-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/001-liva-serisi-md-126-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/001-liva-serisi-md-126-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/002-liva-serisi-md-126-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/002-liva-serisi-md-126-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/002-liva-serisi-md-126-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20126/002-liva-serisi-md-126-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-128-1-60": { id: "md-128-1-60", name: "MATTİA SERİSİ MD 128-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 128-1-60", images: ["/images/products/siva-alti/MD%20128-1-60/001-mattia-serisi-md-128-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20128-1-60/002-mattia-serisi-md-128-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20128-1-60/003-mattia-serisi-md-128-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20128-1-60/004-mattia-serisi-md-128-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20128-1-60/005-mattia-serisi-md-128-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-129-1-60": { id: "md-129-1-60", name: "MATTİA SERİSİ MD 129-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 129-1-60", images: ["/images/products/siva-alti/MD%20129-1-60/001-mattia-serisi-md-129-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20129-1-60/002-mattia-serisi-md-129-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20129-1-60/003-mattia-serisi-md-129-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20129-1-60/004-mattia-serisi-md-129-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20129-1-60/005-mattia-serisi-md-129-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-130-60": { id: "md-130-60", name: "AVA SERİSİ MD 130-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 130-60", images: ["/images/products/siva-alti/MD%20130-60/001-ava-serisi-md-130-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20130-60/002-ava-serisi-md-130-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20130-60/003-ava-serisi-md-130-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20130-60/004-ava-serisi-md-130-60-siva-alti-spot-kurtarildi.jpg", "/images/products/siva-alti/MD%20130-60/005-ava-serisi-md-130-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20130-60/006-ava-serisi-md-130-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20130-60/007-ava-serisi-md-130-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20130-60/008-ava-serisi-md-130-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-131-1-118": { id: "md-131-1-118", name: "RONA SERİSİ MD 131-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 131-1-118", images: ["/images/products/siva-alti/MD%20131-1-118/001-rona-serisi-md-131-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-1-118/002-rona-serisi-md-131-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-1-118/003-rona-serisi-md-131-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-131-2-118": { id: "md-131-2-118", name: "RONA SERİSİ MD 131-2-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 131-2-118", images: ["/images/products/siva-alti/MD%20131-2-118/001-rona-serisi-md-131-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-2-118/002-rona-serisi-md-131-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-2-118/003-rona-serisi-md-131-2-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-2-118/004-rona-serisi-md-131-2-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-131-3-118": { id: "md-131-3-118", name: "RONA SERİSİ MD 131-3-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 131-3-118", images: ["/images/products/siva-alti/MD%20131-3-118/001-rona-serisi-md-131-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-3-118/002-rona-serisi-md-131-3-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20131-3-118/003-rona-serisi-md-131-3-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-140": { id: "md-140", name: "DOLA SERİSİ MD 140  SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 140", images: ["/images/products/siva-alti/MD%20140/001-dola-serisi-md-140-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20140/002-dola-serisi-md-140-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20140/003-dola-serisi-md-140-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20140/004-dola-serisi-md-140-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20140/005-dola-serisi-md-140-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-141": { id: "md-141", name: "SATURN SERİSİ MD 141 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 141", images: ["/images/products/siva-alti/MD%20141/001-saturn-serisi-md-141-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20141/002-saturn-serisi-md-141-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20141/003-saturn-serisi-md-141-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20141/004-saturn-serisi-md-141-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20141/005-saturn-serisi-md-141-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-151": { id: "md-151", name: "NOYA SERİSİ MD 151 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 151", images: ["/images/products/siva-alti/MD%20151/001-noya-serisi-md-151-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/001-noya-serisi-md-151-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/001-noya-serisi-md-151-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/001-noya-serisi-md-151-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/001-noya-serisi-md-151-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/001-noya-serisi-md-151-6-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/002-noya-serisi-md-151-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/002-noya-serisi-md-151-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/002-noya-serisi-md-151-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/002-noya-serisi-md-151-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/002-noya-serisi-md-151-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20151/002-noya-serisi-md-151-6-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-160-1-100": { id: "md-160-1-100", name: "LORA SERİSİ MD 160-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 160-1-100", images: ["/images/products/siva-alti/MD%20160-1-100/001-lora-serisi-md-160-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-100/002-lora-serisi-md-160-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-100/003-lora-serisi-md-160-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-160-1-118": { id: "md-160-1-118", name: "LORA SERİSİ MD 160-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 160-1-118", images: ["/images/products/siva-alti/MD%20160-1-118/001-lora-serisi-md-160-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-118/002-lora-serisi-md-160-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-118/003-lora-serisi-md-160-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-160-1-60": { id: "md-160-1-60", name: "LORA SERİSİ MD 160-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 160-1-60", images: ["/images/products/siva-alti/MD%20160-1-60/001-lora-serisi-md-160-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-60/002-lora-serisi-md-160-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-60/003-lora-serisi-md-160-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-160-1-85": { id: "md-160-1-85", name: "LORA SERİSİ MD 160-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 160-1-85", images: ["/images/products/siva-alti/MD%20160-1-85/001-lora-serisi-md-160-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-85/03-lora-serisi-md-160-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20160-1-85/021-lora-serisi-md-160-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-161-1-100": { id: "md-161-1-100", name: "DİMA SERİSİ MD 161-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 161-1-100", images: ["/images/products/siva-alti/MD%20161-1-100/001-dima-serisi-md-161-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-100/002-dima-serisi-md-161-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-100/003-dima-serisi-md-161-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-161-1-118": { id: "md-161-1-118", name: "DİMA SERİSİ MD 161-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 161-1-118", images: ["/images/products/siva-alti/MD%20161-1-118/001-dima-serisi-md-161-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-118/002-dima-serisi-md-161-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-118/004-dima-serisi-md-161-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-161-1-60": { id: "md-161-1-60", name: "DİMA SERİSİ MD 161-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 161-1-60", images: ["/images/products/siva-alti/MD%20161-1-60/001-dima-serisi-md-161-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-60/002-dima-serisi-md-161-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-60/003-dima-serisi-md-161-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-161-1-85": { id: "md-161-1-85", name: "DİMA SERİSİ MD 161-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 161-1-85", images: ["/images/products/siva-alti/MD%20161-1-85/001-dima-serisi-md-161-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-85/002-dima-serisi-md-161-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20161-1-85/003-dima-serisi-md-161-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-162-1-100": { id: "md-162-1-100", name: "FLEIN SERİSİ MD 162-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 162-1-100", images: ["/images/products/siva-alti/MD%20162-1-100/001-flein-serisi-md-162-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-100/002-flein-serisi-md-162-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-100/003-flein-serisi-md-162-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-162-1-118": { id: "md-162-1-118", name: "FLEIN SERİSİ MD 162-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 162-1-118", images: ["/images/products/siva-alti/MD%20162-1-118/001-flein-serisi-md-162-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-118/002-flein-serisi-md-162-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-118/003-flein-serisi-md-162-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-162-1-60": { id: "md-162-1-60", name: "FLEIN SERİSİ MD 162-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 162-1-60", images: ["/images/products/siva-alti/MD%20162-1-60/001-flein-serisi-md-162-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-60/002-flein-serisi-md-162-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-60/003-flein-serisi-md-162-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-162-1-85": { id: "md-162-1-85", name: "FLEIN SERİSİ MD 162-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 162-1-85", images: ["/images/products/siva-alti/MD%20162-1-85/001-flein-serisi-md-162-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-85/002-flein-serisi-md-162-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20162-1-85/003-flein-serisi-md-162-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-163-1-100": { id: "md-163-1-100", name: "İRA SERİSİ MD 163-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 163-1-100", images: ["/images/products/siva-alti/MD%20163-1-100/001-ira-serisi-md-163-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-100/002-ira-serisi-md-163-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-100/003-ira-serisi-md-163-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-163-1-118": { id: "md-163-1-118", name: "İRA SERİSİ MD 163-1-118 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 163-1-118", images: ["/images/products/siva-alti/MD%20163-1-118/001-ira-serisi-md-163-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-118/002-ira-serisi-md-163-1-118-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-118/003-ira-serisi-md-163-1-118-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-163-1-60": { id: "md-163-1-60", name: "İRA SERİSİ MD 163-1-60SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 163-1-60", images: ["/images/products/siva-alti/MD%20163-1-60/001-ira-serisi-md-163-1-60siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-60/002-ira-serisi-md-163-1-60siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-60/003-ira-serisi-md-163-1-60siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-163-1-85": { id: "md-163-1-85", name: "İRA SERİSİ MD 163-1-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 163-1-85", images: ["/images/products/siva-alti/MD%20163-1-85/001-ira-serisi-md-163-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-85/002-ira-serisi-md-163-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20163-1-85/003-ira-serisi-md-163-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-164-55": { id: "md-164-55", name: "LUNA SERİSİ MD 164-55 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 164-55", images: ["/images/products/siva-alti/MD%20164-55/001-luna-serisi-md-164-55-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20164-55/002-luna-serisi-md-164-55-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-165-55": { id: "md-165-55", name: "QUTA SERİSİ MD 165-55 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 165-55", images: ["/images/products/siva-alti/MD%20165-55/001-quta-serisi-md-165-55-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20165-55/002-quta-serisi-md-165-55-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-170": { id: "md-170", name: "RETA SERİSİ MD 170 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 170", images: ["/images/products/siva-alti/MD%20170/001-reta-serisi-md-170-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20170/001-reta-serisi-md-170-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20170/001-reta-serisi-md-170-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20170/002-reta-serisi-md-170-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20170/002-reta-serisi-md-170-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20170/002-reta-serisi-md-170-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-171": { id: "md-171", name: "DIARA SERİSİ MD 171 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 171", images: ["/images/products/siva-alti/MD%20171/001-diara-serisi-md-171-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20171/001-diara-serisi-md-171-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20171/001-diara-serisi-md-171-1-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20171/002-diara-serisi-md-171-1-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20171/002-diara-serisi-md-171-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20171/002-diara-serisi-md-171-1-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-200-1-60": { id: "md-200-1-60", name: "PANA SERİSİ MD 200-1-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 200-1-60", images: ["/images/products/siva-alti/MD%20200-1-60/001-pana-serisi-md-200-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20200-1-60/002-pana-serisi-md-200-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20200-1-60/003-pana-serisi-md-200-1-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20200-1-60/004-pana-serisi-md-200-1-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-200-2-60": { id: "md-200-2-60", name: "PANA SERİSİ MD 200-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 200-2-60", images: ["/images/products/siva-alti/MD%20200-2-60/001-pana-serisi-md-200-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20200-2-60/002-pana-serisi-md-200-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20200-2-60/003-pana-serisi-md-200-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20200-2-60/004-pana-serisi-md-200-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-601-1-100": { id: "md-601-1-100", name: "LORA SERİSİ MD 160-1-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 601-1-100", images: ["/images/products/siva-alti/MD%20601-1-100/001-lora-serisi-md-160-1-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-603": { id: "md-603", name: "LENA SERİSİ MD 603 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 603", images: ["/images/products/siva-alti/MD%20603/001-lena-serisi-md-603-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20603/002-lena-serisi-md-603-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20603/003-lena-serisi-md-603-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-604": { id: "md-604", name: "LENA SERİSİ MD 604 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 604", images: ["/images/products/siva-alti/MD%20604/001-lena-serisi-md-604-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20604/002-lena-serisi-md-604-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20604/003-lena-serisi-md-604-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-605": { id: "md-605", name: "LENA SERİSİ MD 605 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 605", images: ["/images/products/siva-alti/MD%20605/001-lena-serisi-md-605-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20605/002-lena-serisi-md-605-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20605/003-lena-serisi-md-605-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-616-1": { id: "md-616-1", name: "TİNTA SERİSİ MD 616-1 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 616-1", images: ["/images/products/siva-alti/MD%20616-1/001-tinta-serisi-md-616-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20616-1/002-tinta-serisi-md-616-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20616-1/003-tinta-serisi-md-616-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20616-1/004-tinta-serisi-md-616-1-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-616-2": { id: "md-616-2", name: "TİNTA SERİSİ MD 616-2 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 616-2", images: ["/images/products/siva-alti/MD%20616-2/001-tinta-serisi-md-616-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20616-2/002-tinta-serisi-md-616-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20616-2/003-tinta-serisi-md-616-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20616-2/004-tinta-serisi-md-616-2-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-617-1": { id: "md-617-1", name: "TİNTA SERİSİ MD 617-1 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 617-1", images: ["/images/products/siva-alti/MD%20617-1/001-tinta-serisi-md-617-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20617-1/002-tinta-serisi-md-617-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20617-1/003-tinta-serisi-md-617-1-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-621-4": { id: "md-621-4", name: "BRUNA SERİSİ MD 621-4 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 621-4", images: ["/images/products/siva-alti/MD%20621-4/001-bruna-serisi-md-621-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-4/002-bruna-serisi-md-621-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-4/003-bruna-serisi-md-621-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-4/004-bruna-serisi-md-621-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-4/005-bruna-serisi-md-621-4-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-621-7": { id: "md-621-7", name: "BRUNA SERİSİ MD 621-7 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 621-7", images: ["/images/products/siva-alti/MD%20621-7/001-bruna-serisi-md-621-7-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-7/002-bruna-serisi-md-621-7-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-7/003-bruna-serisi-md-621-7-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-7/004-bruna-serisi-md-621-7-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20621-7/005-bruna-serisi-md-621-7-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-622-1": { id: "md-622-1", name: "BRUNA SERİSİ MD 622-1 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 622-1", images: ["/images/products/siva-alti/MD%20622-1/001-bruna-serisi-md-622-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-1/002-bruna-serisi-md-622-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-1/003-bruna-serisi-md-622-1-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-622-3": { id: "md-622-3", name: "BRUNA SERİSİ MD 622-3 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 622-3", images: ["/images/products/siva-alti/MD%20622-3/001-bruna-serisi-md-622-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-3/002-bruna-serisi-md-622-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-3/003-bruna-serisi-md-622-3-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-622-4": { id: "md-622-4", name: "BRUNA SERİSİ MD 622-4 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 622-4", images: ["/images/products/siva-alti/MD%20622-4/001-bruna-serisi-md-622-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-4/002-bruna-serisi-md-622-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-4/003-bruna-serisi-md-622-4-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-622-5": { id: "md-622-5", name: "BRUNA SERİSİ MD 622-5 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 622-5", images: ["/images/products/siva-alti/MD%20622-5/001-bruna-serisi-md-622-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-5/002-bruna-serisi-md-622-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20622-5/003-bruna-serisi-md-622-5-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-710-1-115": { id: "md-710-1-115", name: "LENA SERİSİ MD 710-1-115 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 710-1-115", images: ["/images/products/siva-alti/MD%20710-1-115/001-lena-serisi-md-710-1-115-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-1-115/002-lena-serisi-md-710-1-115-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-1-115/003-lena-serisi-md-710-1-115-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-1-115/004-lena-serisi-md-710-1-115-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-1-115/005-lena-serisi-md-710-1-115-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-710-2-170": { id: "md-710-2-170", name: "LENA SERİSİ MD 710-2-170 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 710-2-170", images: ["/images/products/siva-alti/MD%20710-2-170/001-lena-serisi-md-710-2-170-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-2-170/002-lena-serisi-md-710-2-170-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-2-170/003-lena-serisi-md-710-2-170-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-2-170/004-lena-serisi-md-710-2-170-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-2-170/005-lena-serisi-md-710-2-170-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-710-3-225": { id: "md-710-3-225", name: "LENA SERİSİ MD 710-3-225 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 710-3-225", images: ["/images/products/siva-alti/MD%20710-3-225/001-lena-serisi-md-710-3-225-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-3-225/002-lena-serisi-md-710-3-225-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-3-225/003-lena-serisi-md-710-3-225-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20710-3-225/004-lena-serisi-md-710-3-225-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-800-185": { id: "md-800-185", name: "ALVARO SERİSİ MD 800-185 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 800-185", images: ["/images/products/siva-alti/MD%20800-185/001-alvaro-serisi-md-800-185-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20800-185/002-alvaro-serisi-md-800-185-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20800-185/003-alvaro-serisi-md-800-185-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20800-185/004-alvaro-serisi-md-800-185-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20800-185/005-alvaro-serisi-md-800-185-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-801-190": { id: "md-801-190", name: "ALVARO SERİSİ MD 801-190 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 801-190", images: ["/images/products/siva-alti/MD%20801-190/001-alvaro-serisi-md-801-190-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20801-190/002-alvaro-serisi-md-801-190-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20801-190/003-alvaro-serisi-md-801-190-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20801-190/004-alvaro-serisi-md-801-190-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20801-190/005-alvaro-serisi-md-801-190-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-900-100": { id: "md-900-100", name: "VİGGO SERİSİ MD 900-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 900-100", images: ["/images/products/siva-alti/MD%20900-100/001-viggo-serisi-md-900-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-100/002-viggo-serisi-md-900-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-100/004-viggo-serisi-md-900-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-100/005-viggo-serisi-md-900-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-900-60": { id: "md-900-60", name: "VİGGO SERİSİ MD 900-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 900-60", images: ["/images/products/siva-alti/MD%20900-60/001-viggo-serisi-md-900-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-60/002-viggo-serisi-md-900-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-60/003-viggo-serisi-md-900-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-60/004-viggo-serisi-md-900-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-900-85": { id: "md-900-85", name: "VİGGO SERİSİ MD 900-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 900-85", images: ["/images/products/siva-alti/MD%20900-85/001-viggo-serisi-md-900-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-85/002-viggo-serisi-md-900-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-85/003-viggo-serisi-md-900-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20900-85/004-viggo-serisi-md-900-85-siva-alti-spot-rev.jpg", "/images/products/siva-alti/MD%20900-85/005-viggo-serisi-md-900-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-901-1-60": { id: "md-901-1-60", name: "VİGGO SERİSİ MD 901-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 901-1-60", images: ["/images/products/siva-alti/MD%20901-1-60/01-viggo-serisi-md-901-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-1-60/02-viggo-serisi-md-901-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-901-100": { id: "md-901-100", name: "VİGGO SERİSİ MD 901-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 901-100", images: ["/images/products/siva-alti/MD%20901-100/001-viggo-serisi-md-901-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-100/002-viggo-serisi-md-901-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-100/003-viggo-serisi-md-901-100-siva-alti-spot-rev.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-901-2-100": { id: "md-901-2-100", name: "VİGGO SERİSİ MD 901-2-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 901-2-100", images: ["/images/products/siva-alti/MD%20901-2-100/001-viggo-serisi-md-901-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-2-100/002-viggo-serisi-md-901-2-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-2-100/003-viggo-serisi-md-901-2-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-901-2-60": { id: "md-901-2-60", name: "VİGGO SERİSİ MD 901-2-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 901-2-60", images: ["/images/products/siva-alti/MD%20901-2-60/001-viggo-serisi-md-901-2-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-2-60/002-viggo-serisi-md-901-2-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-901-2-85": { id: "md-901-2-85", name: "VİGGO SERİSİ MD 901-2-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 901-2-85", images: ["/images/products/siva-alti/MD%20901-2-85/001-viggo-serisi-md-901-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-2-85/002-viggo-serisi-md-901-2-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-2-85/003-viggo-serisi-md-901-2-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-901-85": { id: "md-901-85", name: "VİGGO SERİSİ MD 901-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 901-85", images: ["/images/products/siva-alti/MD%20901-85/001-viggo-serisi-md-901-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-85/002-viggo-serisi-md-901-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20901-85/003-viggo-serisi-md-901-85-siva-alti-spot-rev.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-902-100": { id: "md-902-100", name: "VİGGO SERİSİ MD 902-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 902-100", images: ["/images/products/siva-alti/MD%20902-100/001-viggo-serisi-md-902-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20902-100/002-viggo-serisi-md-902-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-902-60": { id: "md-902-60", name: "VİGGO SERİSİ MD 902-60SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 902-60", images: ["/images/products/siva-alti/MD%20902-60/001-viggo-serisi-md-902-60siva-alti-spot.jpg", "/images/products/siva-alti/MD%20902-60/002-viggo-serisi-md-902-60siva-alti-spot.jpg", "/images/products/siva-alti/MD%20902-60/003-viggo-serisi-md-902-60siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-902-85": { id: "md-902-85", name: "VİGGO SERİSİ MD 902-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 902-85", images: ["/images/products/siva-alti/MD%20902-85/001-viggo-serisi-md-902-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20902-85/002-viggo-serisi-md-902-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-903-100": { id: "md-903-100", name: "VİGGO SERİSİ MD 903-100 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 903-100", images: ["/images/products/siva-alti/MD%20903-100/001-viggo-serisi-md-903-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20903-100/002-viggo-serisi-md-903-100-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-903-60": { id: "md-903-60", name: "VİGGO SERİSİ MD 903-60 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 903-60", images: ["/images/products/siva-alti/MD%20903-60/001-viggo-serisi-md-903-60-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20903-60/002-viggo-serisi-md-903-60-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-903-85": { id: "md-903-85", name: "VİGGO SERİSİ MD 903-85 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 903-85", images: ["/images/products/siva-alti/MD%20903-85/001-viggo-serisi-md-903-85-siva-alti-spot.jpg", "/images/products/siva-alti/MD%20903-85/002-viggo-serisi-md-903-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md150": { id: "md150", name: " NOYA SERİSİ MD 150-1 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD150", images: ["/images/products/siva-alti/MD150/001-noya-serisi-md-150-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/001-noya-serisi-md-150-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/001-noya-serisi-md-150-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/001-noya-serisi-md-150-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/001-noya-serisi-md-150-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/001-noya-serisi-md-150-6-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/002-noya-serisi-md-150-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/002-noya-serisi-md-150-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/002-noya-serisi-md-150-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/002-noya-serisi-md-150-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/002-noya-serisi-md-150-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/002-noya-serisi-md-150-6-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/003-noya-serisi-md-150-1-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/003-noya-serisi-md-150-2-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/003-noya-serisi-md-150-3-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/003-noya-serisi-md-150-4-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/003-noya-serisi-md-150-5-siva-alti-spot.jpg", "/images/products/siva-alti/MD150/003-noya-serisi-md-150-6-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1002": { id: "md-1002", name: "VİGGO SERİSİ MD 1002 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1002", images: ["/images/products/siva-alti/md%201002/001-viggo-serisi-md-1002-100-siva-alti-spot.jpg", "/images/products/siva-alti/md%201002/001-viggo-serisi-md-1002-60-siva-alti-spot.jpg", "/images/products/siva-alti/md%201002/001-viggo-serisi-md-1002-85-siva-alti-spot.jpg", "/images/products/siva-alti/md%201002/002-viggo-serisi-md-1002-100-siva-alti-spot.jpg", "/images/products/siva-alti/md%201002/002-viggo-serisi-md-1002-60-siva-alti-spot.jpg", "/images/products/siva-alti/md%201002/002-viggo-serisi-md-1002-85-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "recessed/md-1003": { id: "md-1003", name: "VOKO SERİSİ MD 1003 SIVA ALTI SPOT", category: "Sıva Altı", categorySlug: "recessed", code: "MD 1003", images: ["/images/products/siva-alti/MD%201003/001-voko-serisi-md-1003-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/001-voko-serisi-md-1003-35-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/001-voko-serisi-md-1003-50-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/001-voko-serisi-md-1003-75-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/002-voko-serisi-md-1003-100-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/002-voko-serisi-md-1003-35-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/002-voko-serisi-md-1003-50-siva-alti-spot.jpg", "/images/products/siva-alti/MD%201003/002-voko-serisi-md-1003-75-siva-alti-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-503-400": { id: "ms-503-400", name: "MS 503-400", category: "Lineer", categorySlug: "linear", code: "MS 503-400", images: ["/images/products/siva-ustu-lineer/MS%20503-400/001-ms-503-400.jpg", "/images/products/siva-ustu-lineer/MS%20503-400/002-ms-503-400.jpg", "/images/products/siva-ustu-lineer/MS%20503-400/003-ms-503-400.jpg", "/images/products/siva-ustu-lineer/MS%20503-400/004-ms-503-400.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-503-500": { id: "ms-503-500", name: "MS 503-500", category: "Lineer", categorySlug: "linear", code: "MS 503-500", images: ["/images/products/siva-ustu-lineer/MS%20503-500/001-ms-503-500.jpg", "/images/products/siva-ustu-lineer/MS%20503-500/002-ms-503-500.jpg", "/images/products/siva-ustu-lineer/MS%20503-500/003-ms-503-500.jpg", "/images/products/siva-ustu-lineer/MS%20503-500/004-ms-503-500.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-503-600": { id: "ms-503-600", name: "MS 503-600", category: "Lineer", categorySlug: "linear", code: "MS 503-600", images: ["/images/products/siva-ustu-lineer/MS%20503-600/001-ms-503-600.jpg", "/images/products/siva-ustu-lineer/MS%20503-600/002-ms-503-600.jpg", "/images/products/siva-ustu-lineer/MS%20503-600/003-ms-503-600.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-504-500": { id: "ms-504-500", name: "MS 504-500", category: "Lineer", categorySlug: "linear", code: "MS 504-500", images: ["/images/products/siva-ustu-lineer/MS%20504-500/001-ms-504-500.jpg", "/images/products/siva-ustu-lineer/MS%20504-500/002-ms-504-500.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-504-600": { id: "ms-504-600", name: "MS 504-600", category: "Lineer", categorySlug: "linear", code: "MS 504-600", images: ["/images/products/siva-ustu-lineer/MS%20504-600/001-ms-504-600.jpg", "/images/products/siva-ustu-lineer/MS%20504-600/002-ms-504-600.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-504-700": { id: "ms-504-700", name: "MS 504-700", category: "Lineer", categorySlug: "linear", code: "MS 504-700", images: ["/images/products/siva-ustu-lineer/MS%20504-700/001-ms-504-700.jpg", "/images/products/siva-ustu-lineer/MS%20504-700/002-ms-504-700.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-619": { id: "ms-619", name: "MS 619", category: "Lineer", categorySlug: "linear", code: "MS 619", images: ["/images/products/siva-ustu-lineer/MS%20619/001-ms-619.jpg", "/images/products/siva-ustu-lineer/MS%20619/002-ms-619.jpg", "/images/products/siva-ustu-lineer/MS%20619/003-ms-619.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-620": { id: "ms-620", name: "NORA SERİSİ | MS 620 SIVA ÜSTÜ SARKIT VE LİNEER", category: "Lineer", categorySlug: "linear", code: "MS 620", images: ["/images/products/siva-ustu-lineer/MS%20620/001-ms-620.jpg", "/images/products/siva-ustu-lineer/MS%20620/002-ms-620.jpg", "/images/products/siva-ustu-lineer/MS%20620/003-ms-620.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-621": { id: "ms-621", name: "NORA SERİSİ | MS 621 SIVA ÜSTÜ SARKIT VE LİNEER", category: "Lineer", categorySlug: "linear", code: "MS 621", images: ["/images/products/siva-ustu-lineer/MS%20621/001-ms-621.jpg", "/images/products/siva-ustu-lineer/MS%20621/002-ms-621.jpg", "/images/products/siva-ustu-lineer/MS%20621/003-ms-621.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-622": { id: "ms-622", name: "NORA SERİSİ MS 622 SIVA ÜSTÜ SARKIT VE LİNEER", category: "Lineer", categorySlug: "linear", code: "MS 622", images: ["/images/products/siva-ustu-lineer/MS%20622/001-nora-serisi-ms-622-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20622/002-nora-serisi-ms-622-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20622/003-nora-serisi-ms-622-siva-ustu-sarkit-ve-lineer.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-623": { id: "ms-623", name: "NORA SERİSİ MS 623 SIVA ÜSTÜ SARKIT VE LİNEER", category: "Lineer", categorySlug: "linear", code: "MS 623", images: ["/images/products/siva-ustu-lineer/MS%20623/001-nora-serisi-ms-623-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20623/002-nora-serisi-ms-623-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20623/003-nora-serisi-ms-623-siva-ustu-sarkit-ve-lineer.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-660": { id: "ms-660", name: "NORA SERİSİ MS 660 SIVA ÜSTÜ SARKIT VE LİNEER", category: "Lineer", categorySlug: "linear", code: "MS 660", images: ["/images/products/siva-ustu-lineer/MS%20660/001-nora-serisi-ms-660-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20660/002-nora-serisi-ms-660-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20660/003-nora-serisi-ms-660-siva-ustu-sarkit-ve-lineer.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "linear/ms-670": { id: "ms-670", name: "NORA SERİSİ MS 670 SIVA ÜSTÜ SARKIT VE LİNEER", category: "Lineer", categorySlug: "linear", code: "MS 670", images: ["/images/products/siva-ustu-lineer/MS%20670/001-nora-serisi-ms-670-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20670/002-nora-serisi-ms-670-siva-ustu-sarkit-ve-lineer.jpg", "/images/products/siva-ustu-lineer/MS%20670/003-nora-serisi-ms-670-siva-ustu-sarkit-ve-lineer.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-100": { id: "mrm-100", name: " MAGNET SERİSİ MRM 100 MAGNET RAY SPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 100", images: ["/images/products/magnet-ray-spot/MRM%20100/001-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/002-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/003-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/004-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/005-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/006-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/007-magnet-serisi-mrm-100-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/008-magnet-serisi-mrm-100-55-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20100/009-magnet-serisi-mrm-101-45-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-101": { id: "mrm-101", name: " MAGNET SERİSİ MRM 101 MAGNET RAY SPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 101", images: ["/images/products/magnet-ray-spot/MRM%20101/001-magnet-serisi-mrm-101-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20101/002-magnet-serisi-mrm-101-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20101/003-magnet-serisi-mrm-101-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20101/004-magnet-serisi-mrm-101-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20101/005-magnet-serisi-mrm-101-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20101/006-magnet-serisi-mrm-101-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20101/007-magnet-serisi-mrm-101-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-102-1": { id: "mrm-102-1", name: "-MAGNET-SERISI-MRM-102-1-MAGNET-RAY-SPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 102-1", images: ["/images/products/magnet-ray-spot/MRM%20102-1/001-magnet-serisi-mrm-102-1-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20102-1/002-magnet-serisi-mrm-102-1-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20102-1/003-magnet-serisi-mrm-102-1-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20102-1/004-magnet-serisi-mrm-102-1-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-102-2": { id: "mrm-102-2", name: "-MAGNET-SERISI-MRM-102-2-MAGNET-RAY-SPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 102-2", images: ["/images/products/magnet-ray-spot/MRM%20102-2/001-magnet-serisi-mrm-102-2-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20102-2/002-magnet-serisi-mrm-102-2-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20102-2/003-magnet-serisi-mrm-102-2-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20102-2/004-magnet-serisi-mrm-102-2-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-102-3": { id: "mrm-102-3", name: "-MAGNET-SERISI-MRM-102-3-MAGNET-RAYSPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 102-3", images: ["/images/products/magnet-ray-spot/MRM%20102-3/001-magnet-serisi-mrm-102-3-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20102-3/002-magnet-serisi-mrm-102-3-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20102-3/003-magnet-serisi-mrm-102-3-magnet-rayspot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-102-4": { id: "mrm-102-4", name: "-MAGNET-SERISI-MRM-102-4-MAGNET-RAYSPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 102-4", images: ["/images/products/magnet-ray-spot/MRM%20102-4/001-magnet-serisi-mrm-102-4-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20102-4/002-magnet-serisi-mrm-102-4-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20102-4/003-magnet-serisi-mrm-102-4-magnet-rayspot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-103-3": { id: "mrm-103-3", name: "-MAGNET-SERISI-MRM-103-3-MAGNET-RAYSPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 103-3", images: ["/images/products/magnet-ray-spot/MRM%20103-3/001-magnet-serisi-mrm-103-3-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20103-3/002-magnet-serisi-mrm-103-3-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20103-3/003-magnet-serisi-mrm-103-3-magnet-rayspot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-103-4": { id: "mrm-103-4", name: "-MAGNET-SERISI-MRM-103-4-MAGNET-RAYSPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 103-4", images: ["/images/products/magnet-ray-spot/MRM%20103-4/001-magnet-serisi-mrm-103-4-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20103-4/002-magnet-serisi-mrm-103-4-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/MRM%20103-4/003-magnet-serisi-mrm-103-4-magnet-rayspot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-104": { id: "mrm-104", name: " MAGNET SERİSİ MRM 104 MAGNET RAY SPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 104", images: ["/images/products/magnet-ray-spot/MRM%20104/001-magnet-serisi-mrm-104-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/002-magnet-serisi-mrm-104-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/003-magnet-serisi-mrm-104-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/004-magnet-serisi-mrm-104-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/004-magnet-serisi-mrm-104-219-magnet-ray-spot-teknik.jpg", "/images/products/magnet-ray-spot/MRM%20104/004-magnet-serisi-mrm-104-219-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/005-magnet-serisi-mrm-104-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/005-magnet-serisi-mrm-104-219-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/006-magnet-serisi-mrm-104-118-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20104/007-magnet-serisi-mrm-104-219-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-105": { id: "mrm-105", name: " MAGNET SERİSİ MRM 105 MAGNET RAY SPOT", category: "Magnet", categorySlug: "magnet", code: "MRM 105", images: ["/images/products/magnet-ray-spot/MRM%20105/001-magnet-serisi-mrm-105-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/002-magnet-serisi-mrm-105-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/003-magnet-serisi-mrm-105-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/004-magnet-serisi-mrm-105-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/004-magnet-serisi-mrm-105-118-magnet-ray-spot-teknik.jpg", "/images/products/magnet-ray-spot/MRM%20105/004-magnet-serisi-mrm-105-118-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/004-magnet-serisi-mrm-105-219-magnet-ray-spot-teknik.jpg", "/images/products/magnet-ray-spot/MRM%20105/004-magnet-serisi-mrm-105-219-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/004-magnet-serisi-mrm-105-328-magnet-ray-spot-teknik.jpg", "/images/products/magnet-ray-spot/MRM%20105/005-magnet-serisi-mrm-105-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/MRM%20105/006-magnet-serisi-mrm-102-328-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-300-60": { id: "mrm-300-60", name: "MAGNET SERİSİ MRM 300-60 MAGNET SARKIT", category: "Magnet", categorySlug: "magnet", code: "MRM 300-60", images: ["/images/products/magnet-ray-spot/MRM%20300-60/001-magnet-serisi-mrm-300-60-magnet-sarkit.jpg", "/images/products/magnet-ray-spot/MRM%20300-60/002-magnet-serisi-mrm-300-60-magnet-sarkit.jpg", "/images/products/magnet-ray-spot/MRM%20300-60/003-magnet-serisi-mrm-300-60-magnet-sarkit.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-102-5": { id: "mrm-102-5", name: "-MAGNET-SERISI-MRM-102-5-MAGNET-RAYSPOT", category: "Magnet", categorySlug: "magnet", code: "mrm 102-5", images: ["/images/products/magnet-ray-spot/mrm%20102-5/001-magnet-serisi-mrm-102-5-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/mrm%20102-5/002-magnet-serisi-mrm-102-5-magnet-rayspot.jpg", "/images/products/magnet-ray-spot/mrm%20102-5/003-magnet-serisi-mrm-102-5-magnet-rayspot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-106": { id: "mrm-106", name: " MAGNET SERİSİ MRM 106 MAGNET RAY SPOT", category: "Magnet", categorySlug: "magnet", code: "mrm 106", images: ["/images/products/magnet-ray-spot/mrm%20106/001-magnet-serisi-mrm-106-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/mrm%20106/002-magnet-serisi-mrm-106-magnet-ray-spot.jpg", "/images/products/magnet-ray-spot/mrm%20106/003-magnet-serisi-mrm-106-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-107": { id: "mrm-107", name: " MAGNET SERİSİ MRM 107 MAGNET RAY SPOT", category: "Magnet", categorySlug: "magnet", code: "mrm 107", images: ["/images/products/magnet-ray-spot/mrm%20107/001-magnet-serisi-mrm-107-magnet-ray-spot.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "magnet/mrm-109": { id: "mrm-109", name: " MAGNET SERİSİ MRM 109 MAGNET", category: "Magnet", categorySlug: "magnet", code: "mrm 109", images: ["/images/products/magnet-ray-spot/mrm%20109/001-magnet-serisi-mrm-109-magnet-sarkit.jpg", "/images/products/magnet-ray-spot/mrm%20109/002-magnet-serisi-mrm-109-1-magnet.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-100": { id: "mj-100", name: "ETA SERİSİ | MJ 100 POLİKARBON ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 100", images: ["/images/products/endustriyel/MJ%20100/002-eta-serisi-mj100-600-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/007-eta-serisi-mj100-600-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/008-eta-serisi-mj100-1200-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/009-eta-serisi-mj100-600-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/010-eta-serisi-mj100-1500-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/011-eta-serisi-mj100-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/012-eta-serisi-mj100-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/013-eta-serisi-mj100-120-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/013-eta-serisi-mj100-150-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/013-eta-serisi-mj100-60-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/014-eta-serisi-mj100-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20100/015-eta-serisi-mj100-endustriyel-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-101": { id: "mj-101", name: "ETA SERİSİ | MJ 101 ALÜMİNYUM ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 101", images: ["/images/products/endustriyel/MJ%20101/001-eta-serisi-mj101-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20101/002-eta-serisi-mj101-600-endustriyel-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-102": { id: "mj-102", name: "ETA SERİSİ | MJ 102 POLİKARBON ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 102", images: ["/images/products/endustriyel/MJ%20102/001-eta-serisi-mj102-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJ%20102/002-eta-serisi-mj102-600-endustriyel-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-103": { id: "mj-103", name: "ETA SERİSİ | MJ 103 ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 103", images: ["/images/products/endustriyel/MJ%20103/001-eta-serisi-mj103-etanj.jpg", "/images/products/endustriyel/MJ%20103/002-eta-serisi-mj103-600-etanj.jpg", "/images/products/endustriyel/MJ%20103/003-eta-serisi-mj103-1200-etanj.jpg", "/images/products/endustriyel/MJ%20103/004-eta-serisi-mj103-1500-etanj.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-106": { id: "mj-106", name: "ENDİ SERİSİ | MJ 106 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 106", images: ["/images/products/endustriyel/MJ%20106/001-endi-serisi-mj106-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MJ%20106/002-endi-serisi-mj106-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-107": { id: "mj-107", name: "ENDİ SERİSİ | MJ 107E YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 107", images: ["/images/products/endustriyel/MJ%20107E/001-endi-serisi-mj107e-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MJ%20107E/003-endi-serisi-mj107e-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-108": { id: "mj-108", name: "BELİNDA SERİSİ | MJ 108 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 108", images: ["/images/products/endustriyel/MJ%20108/001-belinda-serisi-mj108-yuksek-tavan-aydinlatma.jpg", "/images/products/endustriyel/MJ%20108/002-belinda-serisi-mj108-yuksek-tavan-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-109": { id: "mj-109", name: "BELİNDA SERİSİ | MJ 109 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 109", images: ["/images/products/endustriyel/MJ%20109/001-belinda-serisi-mj109-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MJ%20109/002-belinda-serisi-mj109-600-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MJ%20109/003-belinda-serisi-mj109-1200-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-110": { id: "mj-110", name: "RONDA-SERISI-MJ110-YUKSEK-TAVAN-ARMATUR (1)", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 110", images: ["/images/products/endustriyel/MJ%20110/001-ronda-serisi-mj110-yuksek-tavan-armatur-1.jpg", "/images/products/endustriyel/MJ%20110/002-ronda-serisi-mj110-yuksek-tavan-armatur-1.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mj-111": { id: "mj-111", name: "RONDA-SERISI-MJ111-YUKSEK-TAVAN-ARMATUR (1)", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 111", images: ["/images/products/endustriyel/MJ%20111/001-ronda-serisi-mj111-yuksek-tavan-armatur-1.jpg", "/images/products/endustriyel/MJ%20111/002-ronda-serisi-mj111-yuksek-tavan-armatur-1.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mjl-100": { id: "mjl-100", name: "LED-BAR-SERISI-MJL100-ENDUSTRIYEL-AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJL 100", images: ["/images/products/endustriyel/MJL%20100/003-led-bar-serisi-mjl100-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJL%20100/004-led-bar-serisi-mjl100-endustriyel-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mjl-101": { id: "mjl-101", name: "LED-BAR-SERISI-MJL101-ENDUSTRIYEL-AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJL 101", images: ["/images/products/endustriyel/MJL%20101/001-led-bar-serisi-mjl101-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJL%20101/002-led-bar-serisi-mjl101-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJL%20101/003-led-bar-serisi-mjl101-endustriyel-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mjl-102": { id: "mjl-102", name: "LED-BAR-SERISI-MJL102-ENDUSTRIYEL-AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJL 102", images: ["/images/products/endustriyel/MJL%20102/001-led-bar-serisi-mjl102-endustriyel-aydinlatma.jpg", "/images/products/endustriyel/MJL%20102/002-led-bar-serisi-mjl102-endustriyel-aydinlatma.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mk-200": { id: "mk-200", name: "MK 200  SENSÖRLÜ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MK 200", images: ["/images/products/endustriyel/MK%20200/01-mk-200-sensorlu-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mk-300": { id: "mk-300", name: "MK 300  SENSÖRLÜ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MK 300", images: ["/images/products/endustriyel/MK%20300/01-mk-300-sensorlu-armatur.jpg", "/images/products/endustriyel/MK%20300/02-mk-300-sensorlu-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mk-400": { id: "mk-400", name: "MK 400  SENSÖRLÜ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MK 400", images: ["/images/products/endustriyel/MK%20400/01-mk-400-sensorlu-armatur.jpg", "/images/products/endustriyel/MK%20400/02-mk-400-sensorlu-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mo-100-120": { id: "mo-100-120", name: "ETANJ SERİSİ MO 100-120 ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MO 100-120", images: ["/images/products/endustriyel/MO%20100-120/001-etanj-serisi-mo-100-120-etanj-armatur.jpg", "/images/products/endustriyel/MO%20100-120/002-etanj-serisi-mo-100-120-etanj-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mo-100-60": { id: "mo-100-60", name: "ETANJ SERİSİ MO 100-60 ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MO 100-60", images: ["/images/products/endustriyel/MO%20100-60/001-etanj-serisi-mo-100-60-etanj-armatur.jpg", "/images/products/endustriyel/MO%20100-60/002-etanj-serisi-mo-100-60-etanj-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mo-101-120": { id: "mo-101-120", name: "ETANJ SERİSİ MO 101-120 ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MO 101-120", images: ["/images/products/endustriyel/MO%20101-120/01-etanj-serisi-mo-101-120-etanj-armatur.jpg", "/images/products/endustriyel/MO%20101-120/02-etanj-serisi-mo-101-120-etanj-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mo-101-60": { id: "mo-101-60", name: "ETANJ SERİSİ MO 101-60 ETANJ ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MO 101-60", images: ["/images/products/endustriyel/MO%20101-60/001-etanj-serisi-mo-101-60-etanj-armatur.jpg", "/images/products/endustriyel/MO%20101-60/002-etanj-serisi-mo-101-60-etanj-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mp-100-30": { id: "mp-100-30", name: "DOSIA SERİSİ | MJ 104-300 SIVA ÜSTÜ PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 104-300", images: ["/images/products/endustriyel/MP%20100-30/001-dosia-serisi-mps-100-30-panel-armatur.jpg", "/images/products/endustriyel/MP%20100-30/002-dosia-serisi-mps-100-30-panel-armatur.jpg", "/images/products/endustriyel/MP%20100-30/003-dosia-serisi-mps-100-30-panel-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mp-200-30": { id: "mp-200-30", name: "DOSIA SERİSİ | MJ 106-300 CLIP-IN PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 106-300", images: ["/images/products/endustriyel/MP%20200-30/001-dosia-serisi-mp-200-30-clip-in-panel-armatur.jpg", "/images/products/endustriyel/MP%20200-30/002-dosia-serisi-mp-200-30-clip-in-panel-armatur.jpg", "/images/products/endustriyel/MP%20200-30/003-dosia-serisi-mp-200-30-clip-in-panel-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mp-200-60": { id: "mp-200-60", name: "DOSIA SERİSİ | MJ 106-600 CLIP-IN PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 106-600", images: ["/images/products/endustriyel/MP%20200-60/001-dosia-serisi-mp-200-60-clip-in-panel-armatur.jpg", "/images/products/endustriyel/MP%20200-60/002-dosia-serisi-mp-200-60-clip-in-panel-armatur.jpg", "/images/products/endustriyel/MP%20200-60/003-dosia-serisi-mp-200-60-clip-in-panel-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mp-300-30": { id: "mp-300-30", name: "DOSIA SERİSİ | MP 300-30 SIVA ALTI PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MP 300-30", images: ["/images/products/endustriyel/MPS%20300-30/01-mp-300-30.jpg", "/images/products/endustriyel/MPS%20300-30/02-mp-300-30.jpg", "/images/products/endustriyel/MPS%20300-30/03-mp-300-30.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mp-300-60": { id: "mp-300-60", name: "DOSIA SERİSİ | MJ 105-600 SIVA ALTI PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 105-600", images: ["/images/products/endustriyel/MP%20300-60/01-mp-300-60.jpg", "/images/products/endustriyel/MP%20300-60/02-mp-300-60.jpg", "/images/products/endustriyel/MP%20300-60/03-mp-300-60.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mps-100-30": { id: "mps-100-30", name: "DOSIA SERİSİ | MJ 105-300 SIVA ALTI PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 105-300", images: ["/images/products/endustriyel/MP%20100-30/001-dosia-serisi-mps-100-30-panel-armatur.jpg", "/images/products/endustriyel/MP%20100-30/002-dosia-serisi-mps-100-30-panel-armatur.jpg", "/images/products/endustriyel/MP%20100-30/003-dosia-serisi-mps-100-30-panel-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mps-100-60": { id: "mps-100-60", name: "DOSIA SERİSİ | MJ 104-600 SIVA ÜSTÜ PANEL AYDINLATMA", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MJ 104-600", images: ["/images/products/endustriyel/MPS%20100-60/01-magnet-serisi-mps-100-60.jpg", "/images/products/endustriyel/MPS%20100-60/02-magnet-serisi-mps-100-60.jpg", "/images/products/endustriyel/MPS%20100-60/03-magnet-serisi-mps-100-60.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/mps-300-30": { id: "mps-300-30", name: "MP 300-30", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MPS 300-30", images: ["/images/products/endustriyel/MPS%20300-30/01-mp-300-30.jpg", "/images/products/endustriyel/MPS%20300-30/02-mp-300-30.jpg", "/images/products/endustriyel/MPS%20300-30/03-mp-300-30.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/myt-100": { id: "myt-100", name: " DELİNA SERİSİ MYT 100 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MYT 100", images: ["/images/products/endustriyel/MYT%20100/01-delina-serisi-myt-100-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MYT%20100/02-delina-serisi-myt-100-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/myt-101": { id: "myt-101", name: " DELİNA SERİSİ MYT 101 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MYT 101", images: ["/images/products/endustriyel/MYT%20101/01-delina-serisi-myt-101-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MYT%20101/02-delina-serisi-myt-101-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/myt-102": { id: "myt-102", name: " DELİNA SERİSİ MYT 102 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MYT 102", images: ["/images/products/endustriyel/MYT%20102/01-delina-serisi-myt-102-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MYT%20102/02-delina-serisi-myt-102-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "industrial-lighting/myt-103": { id: "myt-103", name: " DELİNA SERİSİ MYT 103 YÜKSEK TAVAN ARMATÜR", category: "Endüstriyel Aydınlatma", categorySlug: "industrial-lighting", code: "MYT 103", images: ["/images/products/endustriyel/MYT%20103/01-delina-serisi-myt-103-yuksek-tavan-armatur.jpg", "/images/products/endustriyel/MYT%20103/02-delina-serisi-myt-103-yuksek-tavan-armatur.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-110": { id: "mo-110", name: "MOSS SERİSİ MO 110 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 110", images: ["/images/products/dis-mekan/MO%20110/001-moss-serisi-mo-110-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20110/002-moss-serisi-mo-110-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20110/003-moss-serisi-mo-110-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20110/004-moss-serisi-mo-110-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-111": { id: "mo-111", name: "MOSS SERİSİ MO 111 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 111", images: ["/images/products/dis-mekan/MO%20111/001-moss-serisi-mo-111-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20111/002-moss-serisi-mo-111-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20111/003-moss-serisi-mo-111-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20111/003.MOSS%20SERI%CC%87SI%CC%87%20MO%20111%20DIS%CC%A7%20MEKAN-APLI%CC%87K.jpg", "/images/products/dis-mekan/MO%20111/004-moss-serisi-mo-111-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-112": { id: "mo-112", name: "MOSS SERİSİ MO 112 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 112", images: ["/images/products/dis-mekan/MO%20112/001-moss-serisi-mo-112-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20112/002-moss-serisi-mo-112-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20112/003-moss-serisi-mo-112-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-113": { id: "mo-113", name: "MOSS SERİSİ MO 113 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 113", images: ["/images/products/dis-mekan/MO%20113/001-moss-serisi-mo-113-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20113/002-moss-serisi-mo-113-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-114": { id: "mo-114", name: "MOSS SERİSİ MO 114 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 114", images: ["/images/products/dis-mekan/MO%20114/001-moss-serisi-mo-114-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20114/002-moss-serisi-mo-114-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20114/003-moss-serisi-mo-114-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20114/004-moss-serisi-mo-114-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-120": { id: "mo-120", name: "MOSS SERİSİ MO 120 DIŞ MEKAN KAZIKLI ÇİM", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 120", images: ["/images/products/dis-mekan/MO%20120/001-moss-serisi-mo-120-dis-mekan-kazikli-cim.jpg", "/images/products/dis-mekan/MO%20120/002-moss-serisi-mo-120-dis-mekan-aplik-kazikli-cim.jpg", "/images/products/dis-mekan/MO%20120/003-moss-serisi-mo-120-dis-mekan-aplik-kazikli-cim.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-130": { id: "mo-130", name: "JİWA SERİSİ MO 130 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 130", images: ["/images/products/dis-mekan/MO%20130/001-jiwa-serisi-mo-130-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20130/002-jiwa-serisi-mo-130-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20130/003-jiwa-serisi-mo-130-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-131": { id: "mo-131", name: "JİWA SERİSİ MO 131 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 131", images: ["/images/products/dis-mekan/MO%20131/001-jiwa-serisi-mo-131-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20131/002-jiwa-serisi-mo-131-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20131/003-jiwa-serisi-mo-131-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20131/004-jiwa-serisi-mo-131-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-132": { id: "mo-132", name: "JİWA SERİSİ MO 132 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 132", images: ["/images/products/dis-mekan/MO%20132/001-jiwa-serisi-mo-132-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20132/002-jiwa-serisi-mo-132-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20132/003-jiwa-serisi-mo-132-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20132/004-jiwa-serisi-mo-132-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20132/005-jiwa-serisi-mo-132-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-133": { id: "mo-133", name: "JİWA SERİSİ MO 133 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 133", images: ["/images/products/dis-mekan/MO%20133/001-jiwa-serisi-mo-133-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20133/001-mo-133.jpg", "/images/products/dis-mekan/MO%20133/002-jiwa-serisi-mo-133-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20133/003-jiwa-serisi-mo-133-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-134": { id: "mo-134", name: "JİWA SERİSİ MO 134 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 134", images: ["/images/products/dis-mekan/MO%20134/001-jiwa-serisi-mo-134-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20134/002-jiwa-serisi-mo-134-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20134/003-jiwa-serisi-mo-134-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20134/004-jiwa-serisi-mo-134-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-135": { id: "mo-135", name: "JİWA SERİSİ MO 135 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 135", images: ["/images/products/dis-mekan/MO%20135/001-jiwa-serisi-mo-135-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20135/002-jiwa-serisi-mo-135-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20135/003-jiwa-serisi-mo-135-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-136": { id: "mo-136", name: "JİWA SERİSİ MO 136 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 136", images: ["/images/products/dis-mekan/MO%20136/001-jiwa-serisi-mo-136-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20136/002-jiwa-serisi-mo-136-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20136/003-jiwa-serisi-mo-136-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-000": { id: "mo-000", name: "DORIKA SERİSİ MO 000 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 000", images: ["/images/products/dis-mekan/MO%20000/001-dorika-serisi-mo-000-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-200": { id: "mo-200", name: "DORIKA SERİSİ MO 200 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 200", images: ["/images/products/dis-mekan/MO%20200/001-dorika-serisi-mo-200-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20200/002-dorika-serisi-mo-200-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20200/003-dorika-serisi-mo-200-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20200/004-dorika-serisi-mo-200-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-201": { id: "mo-201", name: "DORIKA SERİSİ MO 201 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 201", images: ["/images/products/dis-mekan/MO%20201/001-dorika-serisi-mo-201-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20201/002-dorika-serisi-mo-201-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20201/003-dorika-serisi-mo-201-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-202": { id: "mo-202", name: "DORIKA SERİSİ MO 202 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 202", images: ["/images/products/dis-mekan/MO%20202/001-dorika-serisi-mo-202-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20202/002-dorika-serisi-mo-202-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20202/003-dorika-serisi-mo-202-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20202/004-dorika-serisi-mo-202-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-203": { id: "mo-203", name: "DORIKA SERİSİ MO 203 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 203", images: ["/images/products/dis-mekan/MO%20203/001-dorika-serisi-mo-203-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20203/002-dorika-serisi-mo-203-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20203/003-dorika-serisi-mo-203-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-204": { id: "mo-204", name: "DORIKA SERİSİ MO 204 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 204", images: ["/images/products/dis-mekan/MO%20204/001-dorika-serisi-mo-204-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20204/002-dorika-serisi-mo-204-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-204-1": { id: "mo-204-1", name: "DORIKA SERİSİ MO 204-1 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 204-1", images: ["/images/products/dis-mekan/MO%20204-1/001-dorika-serisi-mo-204-1-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-205": { id: "mo-205", name: "DORIKA SERİSİ MO 205 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 205", images: ["/images/products/dis-mekan/MO%20205/001-dorika-serisi-mo-205-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20205/002-dorika-serisi-mo-205-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-206": { id: "mo-206", name: "DORIKA SERİSİ MO 206 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 206", images: ["/images/products/dis-mekan/MO%20206/001-dorika-serisi-mo-206-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20206/002-dorika-serisi-mo-206-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-207": { id: "mo-207", name: "DORIKA SERİSİ MO 207 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 207", images: ["/images/products/dis-mekan/MO%20207/001-dorika-serisi-mo-207-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20207/002-dorika-serisi-mo-207-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-208": { id: "mo-208", name: "DORIKA SERİSİ MO 208 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 208", images: ["/images/products/dis-mekan/MO%20208/001-dorika-serisi-mo-208-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20208/002-dorika-serisi-mo-208-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-209": { id: "mo-209", name: "DORIKA SERİSİ MO 209 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 209", images: ["/images/products/dis-mekan/MO%20209/001-dorika-serisi-mo-209-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20209/002-dorika-serisi-mo-209-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-209-1": { id: "mo-209-1", name: "DORIKA SERİSİ MO 209-1 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 209-1", images: ["/images/products/dis-mekan/MO%20209-1/001-dorika-serisi-mo-209-1-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20209-1/002-dorika-serisi-mo-209-1-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-209-2": { id: "mo-209-2", name: "DORIKA SERİSİ MO 209-2 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 209-2", images: ["/images/products/dis-mekan/MO%20209-2/001-dorika-serisi-mo-209-2-ikili-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20209-2/002-dorika-serisi-mo-209-2-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-210": { id: "mo-210", name: "DORIKA SERİSİ MO 210 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 210", images: ["/images/products/dis-mekan/MO%20210/001-dorika-serisi-mo-210-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20210/002-dorika-serisi-mo-210-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-210-1": { id: "mo-210-1", name: "DORIKA SERİSİ MO 210-1 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 210-1", images: ["/images/products/dis-mekan/MO%20210-1/001-dorika-serisi-mo-210-1-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-211": { id: "mo-211", name: "DORIKA SERİSİ MO 211 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 211", images: ["/images/products/dis-mekan/MO%20211/001-dorika-serisi-mo-211-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20211/002-dorika-serisi-mo-211-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-212": { id: "mo-212", name: "DORIKA SERİSİ MO 212 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 212", images: ["/images/products/dis-mekan/MO%20212/001-dorika-serisi-mo-212-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20212/002-dorika-serisi-mo-212-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-213": { id: "mo-213", name: "DORIKA SERİSİ MO 213 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 213", images: ["/images/products/dis-mekan/MO%20213/001-dorika-serisi-mo-213-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20213/002-dorika-serisi-mo-213-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-214": { id: "mo-214", name: "DORIKA SERİSİ MO 214 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 214", images: ["/images/products/dis-mekan/MO%20214/001-dorika-serisi-mo-214-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20214/002-dorika-serisi-mo-214-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-215": { id: "mo-215", name: "DORIKA SERİSİ MO 215 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 215", images: ["/images/products/dis-mekan/MO%20215/001-dorika-serisi-mo-215-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20215/002-dorika-serisi-mo-215-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-216": { id: "mo-216", name: "DORIKA SERİSİ MO 216 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 216", images: ["/images/products/dis-mekan/MO%20216/001-dorika-serisi-mo-216-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20216/002-dorika-serisi-mo-216-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20216/003-dorika-serisi-mo-216-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-217": { id: "mo-217", name: "DORIKA SERİSİ MO 217 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 217", images: ["/images/products/dis-mekan/MO%20217/001-dorika-serisi-mo-217-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20217/002-dorika-serisi-mo-217-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20217/003-dorika-serisi-mo-217-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-218": { id: "mo-218", name: "DORIKA SERİSİ MO 218 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 218", images: ["/images/products/dis-mekan/MO%20218/001-dorika-serisi-mo-218-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20218/002-dorika-serisi-mo-218-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-219": { id: "mo-219", name: "DORIKA SERİSİ MO 219 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 219", images: ["/images/products/dis-mekan/MO%20219/001-dorika-serisi-mo-219-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20219/002-dorika-serisi-mo-219-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-220": { id: "mo-220", name: "DORIKA SERİSİ MO 220 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 220", images: ["/images/products/dis-mekan/MO%20220/001-dorika-serisi-mo-220-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20220/002-dorika-serisi-mo-220-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-221": { id: "mo-221", name: "DORIKA SERİSİ MO 221 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 221", images: ["/images/products/dis-mekan/MO%20221/001-dorika-serisi-mo-221-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20221/002-dorika-serisi-mo-221-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-222": { id: "mo-222", name: "DORIKA SERİSİ MO 222 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 222", images: ["/images/products/dis-mekan/MO%20222/001-dorika-serisi-mo-222-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20222/002-dorika-serisi-mo-222-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-223": { id: "mo-223", name: "DORIKA SERİSİ MO 223 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 223", images: ["/images/products/dis-mekan/MO%20223/001-dorika-serisi-mo-223-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20223/002-dorika-serisi-mo-223-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-224": { id: "mo-224", name: "DORIKA SERİSİ MO 224 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 224", images: ["/images/products/dis-mekan/MO%20224/001-dorika-serisi-mo-224-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20224/002-dorika-serisi-mo-224-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-225": { id: "mo-225", name: "DORIKA SERİSİ MO 225 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 225", images: ["/images/products/dis-mekan/MO%20225/001-dorika-serisi-mo-225-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-226": { id: "mo-226", name: "DORIKA SERİSİ MO 226 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 226", images: ["/images/products/dis-mekan/MO%20226/001-dorika-serisi-mo-226-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20226/002-dorika-serisi-mo-226-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-227": { id: "mo-227", name: "DORIKA SERİSİ MO 227 DIŞ MEKAN APLİK", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 227", images: ["/images/products/dis-mekan/MO%20227/001-dorika-serisi-mo-227-dis-mekan-aplik.jpg", "/images/products/dis-mekan/MO%20227/002-dorika-serisi-mo-227-dis-mekan-aplik.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-228": { id: "mo-228", name: "DORIKA SERİSİ MO 228 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 228", images: ["/images/products/dis-mekan/MO%20228/001-dorika-serisi-mo-228-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20228/002-dorika-serisi-mo-228-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-229": { id: "mo-229", name: "DORIKA SERİSİ MO 229 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 229", images: ["/images/products/dis-mekan/MO%20229/001-dorika-serisi-mo-229-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20229/002-dorika-serisi-mo-229-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-230": { id: "mo-230", name: "DORIKA SERİSİ MO 230 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 230", images: ["/images/products/dis-mekan/MO%20230/001-dorika-serisi-mo-230-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-231": { id: "mo-231", name: "DORIKA SERİSİ MO 231 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 231", images: ["/images/products/dis-mekan/MO%20231/001-dorika-serisi-mo-231-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20231/002-dorika-serisi-mo-231-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-232": { id: "mo-232", name: "DORIKA SERİSİ MO 232 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 232", images: ["/images/products/dis-mekan/MO%20232/001-dorika-serisi-mo-232-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20232/002-dorika-serisi-mo-232-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-233": { id: "mo-233", name: "DORIKA SERİSİ MO 233 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 233", images: ["/images/products/dis-mekan/MO%20233/001-dorika-serisi-mo-233-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20233/002-dorika-serisi-mo-233-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-234": { id: "mo-234", name: "DORIKA SERİSİ MO 234 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 234", images: ["/images/products/dis-mekan/MO%20234/001-dorika-serisi-mo-234-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20234/002-dorika-serisi-mo-234-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-235": { id: "mo-235", name: "DORIKA SERİSİ MO 235 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 235", images: ["/images/products/dis-mekan/MO%20235/001-dorika-serisi-mo-235-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20235/002-dorika-serisi-mo-235-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-236": { id: "mo-236", name: "DORIKA SERİSİ MO 236 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 236", images: ["/images/products/dis-mekan/MO%20236/001-dorika-serisi-mo-236-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20236/002-dorika-serisi-mo-236-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-237": { id: "mo-237", name: "DORIKA SERİSİ MO 237 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 237", images: ["/images/products/dis-mekan/MO%20237/001-dorika-serisi-mo-237-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20237/002-dorika-serisi-mo-237-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-238": { id: "mo-238", name: "DORIKA SERİSİ MO 238 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 238", images: ["/images/products/dis-mekan/MO%20238/001-dorika-serisi-mo-238-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20238/002-dorika-serisi-mo-238-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-239": { id: "mo-239", name: "DORIKA SERİSİ MO 239 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 239", images: ["/images/products/dis-mekan/MO%20239/001-dorika-serisi-mo-239-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20239/002-dorika-serisi-mo-239-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-240": { id: "mo-240", name: "DORIKA SERİSİ MO 240 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 240", images: ["/images/products/dis-mekan/MO%20240/001-dorika-serisi-mo-240-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20240/002-dorika-serisi-mo-240-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-241": { id: "mo-241", name: "DORIKA SERİSİ MO 241 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 241", images: ["/images/products/dis-mekan/MO%20241/001-dorika-serisi-mo-241-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20241/002-dorika-serisi-mo-241-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-242": { id: "mo-242", name: "DORIKA SERİSİ MO 242 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 242", images: ["/images/products/dis-mekan/MO%20242/001-dorika-serisi-mo-242-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20242/002-dorika-serisi-mo-242-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-243": { id: "mo-243", name: "DORIKA SERİSİ MO 243 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 243", images: ["/images/products/dis-mekan/MO%20243/001-dorika-serisi-mo-243-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20243/002-dorika-serisi-mo-243-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-244": { id: "mo-244", name: "DORIKA SERİSİ MO 244 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 244", images: ["/images/products/dis-mekan/MO%20244/001-dorika-serisi-mo-244-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20244/002-dorika-serisi-mo-244-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-245": { id: "mo-245", name: "DORIKA SERİSİ MO 245 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 245", images: ["/images/products/dis-mekan/MO%20245/001-dorika-serisi-mo-245-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20245/002-dorika-serisi-mo-245-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-246": { id: "mo-246", name: "DORIKA SERİSİ MO 246 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 246", images: ["/images/products/dis-mekan/MO%20246/001-dorika-serisi-mo-246-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20246/002-dorika-serisi-mo-246-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-247": { id: "mo-247", name: "DORIKA SERİSİ MO 247 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 247", images: ["/images/products/dis-mekan/MO%20247/001-dorika-serisi-mo-247-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20247/002-dorika-serisi-mo-247-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-248": { id: "mo-248", name: "DORIKA SERİSİ MO 248 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 248", images: ["/images/products/dis-mekan/MO%20248/001-dorika-serisi-mo-248-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20248/002-dorika-serisi-mo-248-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20248/003-dorika-serisi-mo-248-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-248-2": { id: "mo-248-2", name: "DORIKA SERİSİ MO 248-2 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 248-2", images: ["/images/products/dis-mekan/MO%20248-2/003-dorika-serisi-mo-248-2-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-248-3": { id: "mo-248-3", name: "DORIKA SERİSİ MO 248-3 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 248-3", images: ["/images/products/dis-mekan/MO%20248-3/001-dorika-serisi-mo-248-3-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-249": { id: "mo-249", name: "DORIKA SERİSİ MO 249 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 249", images: ["/images/products/dis-mekan/MO%20249/002-dorika-serisi-mo-249-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-249-1": { id: "mo-249-1", name: "DORIKA SERİSİ MO 249-1 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 249-1", images: ["/images/products/dis-mekan/MO%20249-1/001-dorika-serisi-mo-249-1-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20249-1/002-dorika-serisi-mo-249-1-dis-mekan-lambader.jpg", "/images/products/dis-mekan/MO%20249-1/003-dorika-serisi-mo-249-1-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-249-2": { id: "mo-249-2", name: "DORIKA SERİSİ MO 249-2 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 249-2", images: ["/images/products/dis-mekan/MO%20249-2/001-dorika-serisi-mo-249-2-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-249-3": { id: "mo-249-3", name: "DORIKA SERİSİ MO 249-3 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 249-3", images: ["/images/products/dis-mekan/MO%20249-3/001-dorika-serisi-mo-249-3-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-250": { id: "mo-250", name: "DORIKA SERİSİ MO 250 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 250", images: ["/images/products/dis-mekan/MO%20250/001-dorika-serisi-mo-250-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-250-1": { id: "mo-250-1", name: "DORIKA SERİSİ MO 250-1 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 250-1", images: ["/images/products/dis-mekan/MO%20250-1/001-dorika-serisi-mo-250-1-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-250-2": { id: "mo-250-2", name: "DORIKA SERİSİ MO 250-2 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 250-2", images: ["/images/products/dis-mekan/MO%20250-2/001-dorika-serisi-mo-250-2-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  "outdoor/mo-250-3": { id: "mo-250-3", name: "DORIKA SERİSİ MO 250-3 DIŞ MEKAN LAMBADER", category: "Dış Mekan", categorySlug: "outdoor", code: "MO 250-3", images: ["/images/products/dis-mekan/MO%20250-3/001-dorika-serisi-mo-250-3-dis-mekan-lambader.jpg"], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },
  // Acil Aydınlatma ve Yönlendirmeler (YAMAS serisi)
  "emergency-lighting/mx-100": { ...ACIL_EMERGENCY_SHARED, id: "mx-100", name: "YAMAS SERİSİ | MX 100 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 100", images: [acilImg("mx 100", ACIL_FILE["mx 100"])], relatedIds: ["mx-101", "mx-201", "mx-301"] },
  "emergency-lighting/mx-101": { ...ACIL_EMERGENCY_SHARED, id: "mx-101", name: "YAMAS SERİSİ | MX 101 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 101", images: [acilImg("mx 101", ACIL_FILE["mx 101"])], relatedIds: ["mx-201", "mx-100", "mx-301", "mx-102"] },
  "emergency-lighting/mx-102": { ...ACIL_EMERGENCY_SHARED, id: "mx-102", name: "YAMAS SERİSİ | MX 102 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 102", images: [acilImg("mx 102", ACIL_FILE["mx 102"])], relatedIds: ["mx-101", "mx-201", "mx-302"] },
  "emergency-lighting/mx-103": { ...ACIL_EMERGENCY_SHARED, id: "mx-103", name: "YAMAS SERİSİ | MX 103 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 103", images: [acilImg("mx 103", ACIL_FILE["mx 103"])], relatedIds: ["mx-102", "mx-202", "mx-303"] },
  "emergency-lighting/mx-104": { ...ACIL_EMERGENCY_SHARED, id: "mx-104", name: "YAMAS SERİSİ | MX 104 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 104", images: [acilImg("mx 104", ACIL_FILE["mx 104"])], relatedIds: ["mx-103", "mx-204", "mx-304"] },
  "emergency-lighting/mx-105": { ...ACIL_EMERGENCY_SHARED, id: "mx-105", name: "YAMAS SERİSİ | MX 105 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 105", images: [acilImg("mx 105", ACIL_FILE["mx 105"])], relatedIds: ["mx-104", "mx-205", "mx-305"] },
  "emergency-lighting/mx-106": { ...ACIL_EMERGENCY_SHARED, id: "mx-106", name: "YAMAS SERİSİ | MX 106 SIVA ÜSTÜ ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 106", images: [acilImg("mx 106", ACIL_FILE["mx 106"])], relatedIds: ["mx-105", "mx-206", "mx-306"] },
  "emergency-lighting/mx-200": { ...ACIL_EMERGENCY_SHARED, id: "mx-200", name: "YAMAS SERİSİ | MX 200 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 200", images: [acilImg("mx 200", ACIL_FILE["mx 200"])], relatedIds: ["mx-201", "mx-100", "mx-300"] },
  "emergency-lighting/mx-201": { ...ACIL_EMERGENCY_SHARED, id: "mx-201", name: "YAMAS SERİSİ | MX 201 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 201", images: [acilImg("mx 201", ACIL_FILE["mx 201"])], relatedIds: ["mx-101", "mx-200", "mx-301"] },
  "emergency-lighting/mx-202": { ...ACIL_EMERGENCY_SHARED, id: "mx-202", name: "YAMAS SERİSİ | MX 202 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 202", images: [acilImg("mx 202", ACIL_FILE["mx 202"])], relatedIds: ["mx-201", "mx-102", "mx-302"] },
  "emergency-lighting/mx-203": { ...ACIL_EMERGENCY_SHARED, id: "mx-203", name: "YAMAS SERİSİ | MX 203 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 203", images: [acilImg("mx 203", ACIL_FILE["mx 203"])], relatedIds: ["mx-202", "mx-103", "mx-303"] },
  "emergency-lighting/mx-204": { ...ACIL_EMERGENCY_SHARED, id: "mx-204", name: "YAMAS SERİSİ | MX 204 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 204", images: [acilImg("mx 204", ACIL_FILE["mx 204"])], relatedIds: ["mx-203", "mx-104", "mx-304"] },
  "emergency-lighting/mx-205": { ...ACIL_EMERGENCY_SHARED, id: "mx-205", name: "YAMAS SERİSİ | MX 205 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 205", images: [acilImg("mx 205", ACIL_FILE["mx 205"])], relatedIds: ["mx-204", "mx-105", "mx-305"] },
  "emergency-lighting/mx-206": { ...ACIL_EMERGENCY_SHARED, id: "mx-206", name: "YAMAS SERİSİ | MX 206 SARKIT ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 206", images: [acilImg("mx 206", ACIL_FILE["mx 206"])], relatedIds: ["mx-205", "mx-106", "mx-306"] },
  "emergency-lighting/mx-300": { ...ACIL_EMERGENCY_SHARED, id: "mx-300", name: "YAMAS SERİSİ | MX 300 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 300", images: [acilImg("mx 300", ACIL_FILE["mx 300"])], relatedIds: ["mx-301", "mx-100", "mx-200"] },
  "emergency-lighting/mx-301": { ...ACIL_EMERGENCY_SHARED, id: "mx-301", name: "YAMAS SERİSİ | MX 301 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 301", images: [acilImg("mx 301", ACIL_FILE["mx 301"])], relatedIds: ["mx-101", "mx-201", "mx-300"] },
  "emergency-lighting/mx-302": { ...ACIL_EMERGENCY_SHARED, id: "mx-302", name: "YAMAS SERİSİ | MX 302 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 302", images: [acilImg("mx 302", ACIL_FILE["mx 302"])], relatedIds: ["mx-301", "mx-102", "mx-202"] },
  "emergency-lighting/mx-303": { ...ACIL_EMERGENCY_SHARED, id: "mx-303", name: "YAMAS SERİSİ | MX 303 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 303", images: [acilImg("mx 303", ACIL_FILE["mx 303"])], relatedIds: ["mx-302", "mx-103", "mx-203"] },
  "emergency-lighting/mx-304": { ...ACIL_EMERGENCY_SHARED, id: "mx-304", name: "YAMAS SERİSİ | MX 304 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 304", images: [acilImg("mx 304", ACIL_FILE["mx 304"])], relatedIds: ["mx-303", "mx-104", "mx-204"] },
  "emergency-lighting/mx-305": { ...ACIL_EMERGENCY_SHARED, id: "mx-305", name: "YAMAS SERİSİ | MX 305 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 305", images: [acilImg("mx 305", ACIL_FILE["mx 305"])], relatedIds: ["mx-304", "mx-105", "mx-205"] },
  "emergency-lighting/mx-306": { ...ACIL_EMERGENCY_SHARED, id: "mx-306", name: "YAMAS SERİSİ | MX 306 SIVA ALTI ACİL AYDINLATMA ve YÖNLENDİRME ARMATÜRÜ", code: "MX 306", images: [acilImg("mx 306", ACIL_FILE["mx 306"])], relatedIds: ["mx-305", "mx-106", "mx-206"] },
  // Bronz Koleksiyon (Masialux ozel-koleksiyon/bronz)
  "bronze-collection/mb-100-100": { ...BRONZ_COLLECTION_SHARED, id: "mb-100-100", name: "Bronz Koleksiyon | MB 100-100 RAY SPOT", code: "MB 100-100", subtitle: "Masialux Bronz Serisi Ledli Ray Spot Armatür MB 100-100 | 20W – 30W", images: [bronzImg("MB 100-100", BRONZ_RAY_FILE("MB 100-100"))], relatedIds: ["mb-506", "mb-104-1", "me-755", "mb-100-60"] },
  "bronze-collection/mb-100-60": { ...BRONZ_COLLECTION_SHARED, id: "mb-100-60", name: "Bronz Koleksiyon | MB 100-60 RAY SPOT", code: "MB 100-60", images: [bronzImg("MB 100-60", BRONZ_RAY_FILE("MB 100-60"))], relatedIds: ["mb-100-100", "mb-100-85", "mb-506"] },
  "bronze-collection/mb-100-85": { ...BRONZ_COLLECTION_SHARED, id: "mb-100-85", name: "Bronz Koleksiyon | MB 100-85 RAY SPOT", code: "MB 100-85", images: [bronzImg("MB 100-85", BRONZ_RAY_FILE("MB 100-85"))], relatedIds: ["mb-100-100", "mb-100-60", "mb-507"] },
  "bronze-collection/mb-104-1": { ...BRONZ_COLLECTION_SHARED, id: "mb-104-1", name: "Bronz Koleksiyon | MB 104-1 SIVA ALTI", code: "MB 104-1", images: [bronzImg("MB 104-1", BRONZ_SIVA_ALTI_FILE("MB 104-1"))], relatedIds: ["mb-100-100", "mb-104-2", "mb-600-1"] },
  "bronze-collection/mb-104-2": { ...BRONZ_COLLECTION_SHARED, id: "mb-104-2", name: "Bronz Koleksiyon | MB 104-2 SIVA ALTI", code: "MB 104-2", images: [bronzImg("MB 104-2", BRONZ_SIVA_ALTI_FILE("MB 104-2"))], relatedIds: ["mb-104-1", "mb-500", "mb-506"] },
  "bronze-collection/mb-500": { ...BRONZ_COLLECTION_SHARED, id: "mb-500", name: "Bronz Koleksiyon | MB 500 YARI SIVA ÜSTÜ", code: "MB 500", images: [bronzImg("MB 500", BRONZ_SIVA_USTU_FILE("MB 500"))], relatedIds: ["mb-506", "mb-507", "mb-104-2"] },
  "bronze-collection/mb-506": { ...BRONZ_COLLECTION_SHARED, id: "mb-506", name: "Bronz Koleksiyon | MB 506 YARI SIVA ÜSTÜ", code: "MB 506", images: [bronzImg("MB 506", BRONZ_SIVA_USTU_FILE("MB 506"))], relatedIds: ["mb-100-100", "mb-500", "mb-507"] },
  "bronze-collection/mb-507": { ...BRONZ_COLLECTION_SHARED, id: "mb-507", name: "Bronz Koleksiyon | MB 507 SIVA ÜSTÜ", code: "MB 507", images: [bronzImg("MB 507", BRONZ_SIVA_USTU_FILE("MB 507"))], relatedIds: ["mb-506", "mb-600-1", "mb-600-2"] },
  "bronze-collection/mb-600-1": { ...BRONZ_COLLECTION_SHARED, id: "mb-600-1", name: "Bronz Koleksiyon | MB 600-1 SIVA ÜSTÜ", code: "MB 600-1", images: [bronzImg("MB 600-1", BRONZ_SIVA_USTU_FILE("MB 600-1"))], relatedIds: ["mb-600-2", "mb-104-1", "mb-507"] },
  "bronze-collection/mb-600-2": { ...BRONZ_COLLECTION_SHARED, id: "mb-600-2", name: "Bronz Koleksiyon | MB 600-2 SIVA ÜSTÜ", code: "MB 600-2", images: [bronzImg("MB 600-2", BRONZ_SIVA_USTU_FILE("MB 600-2"))], relatedIds: ["mb-600-1", "mb-500", "mb-100-60"] },
  // Aplik (wall-light) — Masialux ozel-koleksiyon/aplik
  "wall-light/me-1000": { ...APLIK_WALL_LIGHT_SHARED, id: "me-1000", name: "Aplik ME 1000", code: "ME 1000", subtitle: "Masialux Modern Duvar Aplik | ME 1000", images: [aplikImg("ME 1000", APLIK_FILE["ME 1000"])], relatedIds: ["me-150", "me-909"] },
  "wall-light/me-150": { ...APLIK_WALL_LIGHT_SHARED, id: "me-150", name: "Özel Koleksiyon Aplik | ME 150", code: "ME 150", subtitle: "Masialux Modern Duvar Aplik | ME 150", images: [aplikImg("ME 150", APLIK_FILE["ME 150"])], relatedIds: ["me-166", "me-162", "me-152"] },
  "wall-light/me-152": { ...APLIK_WALL_LIGHT_SHARED, id: "me-152", name: "Aplik ME 152", code: "ME 152", images: [aplikImg("ME 152", APLIK_FILE["ME 152"])], relatedIds: ["me-153", "me-150"] },
  "wall-light/me-153": { ...APLIK_WALL_LIGHT_SHARED, id: "me-153", name: "Aplik ME 153", code: "ME 153", images: [aplikImg("ME 153", APLIK_FILE["ME 153"])], relatedIds: ["me-153-1", "me-154"] },
  "wall-light/me-153-1": { ...APLIK_WALL_LIGHT_SHARED, id: "me-153-1", name: "Aplik ME 153-1", code: "ME 153-1", images: [aplikImg("ME 153-1", APLIK_FILE["ME 153-1"])], relatedIds: ["me-153", "me-154"] },
  "wall-light/me-154": { ...APLIK_WALL_LIGHT_SHARED, id: "me-154", name: "Aplik ME 154", code: "ME 154", images: [aplikImg("ME 154", APLIK_FILE["ME 154"])], relatedIds: ["me-155", "me-153"] },
  "wall-light/me-155": { ...APLIK_WALL_LIGHT_SHARED, id: "me-155", name: "Aplik ME 155", code: "ME 155", images: [aplikImg("ME 155", APLIK_FILE["ME 155"])], relatedIds: ["me-156", "me-154"] },
  "wall-light/me-156": { ...APLIK_WALL_LIGHT_SHARED, id: "me-156", name: "Aplik ME 156", code: "ME 156", images: [aplikImg("ME 156", APLIK_FILE["ME 156"])], relatedIds: ["me-158", "me-155"] },
  "wall-light/me-158": { ...APLIK_WALL_LIGHT_SHARED, id: "me-158", name: "Aplik ME 158", code: "ME 158", images: [aplikImg("ME 158", APLIK_FILE["ME 158"])], relatedIds: ["me-159", "me-156"] },
  "wall-light/me-159": { ...APLIK_WALL_LIGHT_SHARED, id: "me-159", name: "Aplik ME 159", code: "ME 159", images: [aplikImg("ME 159", APLIK_FILE["ME 159"])], relatedIds: ["me-160", "me-158"] },
  "wall-light/me-160": { ...APLIK_WALL_LIGHT_SHARED, id: "me-160", name: "Aplik ME 160", code: "ME 160", images: [aplikImg("ME 160", APLIK_FILE["ME 160"])], relatedIds: ["me-161", "me-159"] },
  "wall-light/me-161": { ...APLIK_WALL_LIGHT_SHARED, id: "me-161", name: "Aplik ME 161", code: "ME 161", images: [aplikImg("ME 161", APLIK_FILE["ME 161"])], relatedIds: ["me-162", "me-160"] },
  "wall-light/me-162": { ...APLIK_WALL_LIGHT_SHARED, id: "me-162", name: "Aplik ME 162", code: "ME 162", images: [aplikImg("ME 162", APLIK_FILE["ME 162"])], relatedIds: ["me-994", "me-163", "me-161"] },
  "wall-light/me-163": { ...APLIK_WALL_LIGHT_SHARED, id: "me-163", name: "Aplik ME 163", code: "ME 163", images: [aplikImg("ME 163", APLIK_FILE["ME 163"])], relatedIds: ["me-162", "me-164"] },
  "wall-light/me-164": { ...APLIK_WALL_LIGHT_SHARED, id: "me-164", name: "Aplik ME 164", code: "ME 164", images: [aplikImg("ME 164", APLIK_FILE["ME 164"])], relatedIds: ["me-165", "me-163"] },
  "wall-light/me-165": { ...APLIK_WALL_LIGHT_SHARED, id: "me-165", name: "Aplik ME 165", code: "ME 165", images: [aplikImg("ME 165", APLIK_FILE["ME 165"])], relatedIds: ["me-166", "me-164"] },
  "wall-light/me-166": { ...APLIK_WALL_LIGHT_SHARED, id: "me-166", name: "Aplik ME 166", code: "ME 166", images: [aplikImg("ME 166", APLIK_FILE["ME 166"])], relatedIds: ["me-171", "me-165"] },
  "wall-light/me-171": { ...APLIK_WALL_LIGHT_SHARED, id: "me-171", name: "Aplik ME 171", code: "ME 171", images: [aplikImg("ME 171", APLIK_FILE["ME 171"])], relatedIds: ["me-172", "me-166"] },
  "wall-light/me-172": { ...APLIK_WALL_LIGHT_SHARED, id: "me-172", name: "Aplik ME 172", code: "ME 172", images: [aplikImg("ME 172", APLIK_FILE["ME 172"])], relatedIds: ["me-173", "me-171"] },
  "wall-light/me-173": { ...APLIK_WALL_LIGHT_SHARED, id: "me-173", name: "Aplik ME 173", code: "ME 173", images: [aplikImg("ME 173", APLIK_FILE["ME 173"])], relatedIds: ["me-175", "me-172"] },
  "wall-light/me-175": { ...APLIK_WALL_LIGHT_SHARED, id: "me-175", name: "Aplik ME 175", code: "ME 175", images: [aplikImg("ME 175", APLIK_FILE["ME 175"])], relatedIds: ["me-177", "me-173"] },
  "wall-light/me-177": { ...APLIK_WALL_LIGHT_SHARED, id: "me-177", name: "Aplik ME 177", code: "ME 177", images: [aplikImg("ME 177", APLIK_FILE["ME 177"])], relatedIds: ["me-188", "me-175"] },
  "wall-light/me-188": { ...APLIK_WALL_LIGHT_SHARED, id: "me-188", name: "Aplik ME 188", code: "ME 188", images: [aplikImg("ME 188", APLIK_FILE["ME 188"])], relatedIds: ["me-240", "me-177"] },
  "wall-light/me-240": { ...APLIK_WALL_LIGHT_SHARED, id: "me-240", name: "Aplik ME 240", code: "ME 240", images: [aplikImg("ME 240", APLIK_FILE["ME 240"])], relatedIds: ["me-324", "me-188"] },
  "wall-light/me-324": { ...APLIK_WALL_LIGHT_SHARED, id: "me-324", name: "Aplik ME 324", code: "ME 324", images: [aplikImg("ME 324", APLIK_FILE["ME 324"])], relatedIds: ["me-325", "me-240"] },
  "wall-light/me-325": { ...APLIK_WALL_LIGHT_SHARED, id: "me-325", name: "Aplik ME 325", code: "ME 325", images: [aplikImg("ME 325", APLIK_FILE["ME 325"])], relatedIds: ["me-326", "me-324"] },
  "wall-light/me-326": { ...APLIK_WALL_LIGHT_SHARED, id: "me-326", name: "Aplik ME 326", code: "ME 326", images: [aplikImg("ME 326", APLIK_FILE["ME 326"])], relatedIds: ["me-327", "me-325"] },
  "wall-light/me-327": { ...APLIK_WALL_LIGHT_SHARED, id: "me-327", name: "Aplik ME 327", code: "ME 327", images: [aplikImg("ME 327", APLIK_FILE["ME 327"])], relatedIds: ["me-328", "me-326"] },
  "wall-light/me-328": { ...APLIK_WALL_LIGHT_SHARED, id: "me-328", name: "Aplik ME 328", code: "ME 328", images: [aplikImg("ME 328", APLIK_FILE["ME 328"])], relatedIds: ["me-330", "me-327"] },
  "wall-light/me-330": { ...APLIK_WALL_LIGHT_SHARED, id: "me-330", name: "Aplik ME 330", code: "ME 330", images: [aplikImg("ME 330", APLIK_FILE["ME 330"])], relatedIds: ["me-331", "me-328"] },
  "wall-light/me-331": { ...APLIK_WALL_LIGHT_SHARED, id: "me-331", name: "Aplik ME 331", code: "ME 331", images: [aplikImg("ME 331", APLIK_FILE["ME 331"])], relatedIds: ["me-334", "me-330"] },
  "wall-light/me-334": { ...APLIK_WALL_LIGHT_SHARED, id: "me-334", name: "Aplik ME 334", code: "ME 334", images: [aplikImg("ME 334", APLIK_FILE["ME 334"])], relatedIds: ["me-335", "me-331"] },
  "wall-light/me-335": { ...APLIK_WALL_LIGHT_SHARED, id: "me-335", name: "Aplik ME 335", code: "ME 335", images: [aplikImg("ME 335", APLIK_FILE["ME 335"])], relatedIds: ["me-748", "me-334"] },
  "wall-light/me-748": { ...APLIK_WALL_LIGHT_SHARED, id: "me-748", name: "Aplik ME 748", code: "ME 748", images: [aplikImg("ME 748", APLIK_FILE["ME 748"])], relatedIds: ["me-749", "me-335"] },
  "wall-light/me-749": { ...APLIK_WALL_LIGHT_SHARED, id: "me-749", name: "Aplik ME 749", code: "ME 749", images: [aplikImg("ME 749", APLIK_FILE["ME 749"])], relatedIds: ["me-751", "me-748"] },
  "wall-light/me-751": { ...APLIK_WALL_LIGHT_SHARED, id: "me-751", name: "Aplik ME 751", code: "ME 751", images: [aplikImg("ME 751", APLIK_FILE["ME 751"])], relatedIds: ["me-753", "me-749"] },
  "wall-light/me-753": { ...APLIK_WALL_LIGHT_SHARED, id: "me-753", name: "Aplik ME 753", code: "ME 753", images: [aplikImg("ME 753", APLIK_FILE["ME 753"])], relatedIds: ["me-754", "me-751"] },
  "wall-light/me-754": { ...APLIK_WALL_LIGHT_SHARED, id: "me-754", name: "Aplik ME 754", code: "ME 754", images: [aplikImg("ME 754", APLIK_FILE["ME 754"])], relatedIds: ["me-755", "me-753"] },
  "wall-light/me-755": { ...APLIK_WALL_LIGHT_SHARED, id: "me-755", name: "Özel Koleksiyon Aplik ME 755", code: "ME 755", images: [aplikImg("ME 755", APLIK_FILE["ME 755"])], relatedIds: ["me-757", "me-754", "me-756"] },
  "wall-light/me-756": { ...APLIK_WALL_LIGHT_SHARED, id: "me-756", name: "Aplik ME 756", code: "ME 756", images: [aplikImg("ME 756", APLIK_FILE["ME 756"])], relatedIds: ["me-755", "me-757", "me-780"] },
  "wall-light/me-757": { ...APLIK_WALL_LIGHT_SHARED, id: "me-757", name: "Özel Koleksiyon Aplik ME 757", code: "ME 757", images: [aplikImg("ME 757", APLIK_FILE["ME 757"])], relatedIds: ["me-755", "me-756", "me-780"] },
  "wall-light/me-780": { ...APLIK_WALL_LIGHT_SHARED, id: "me-780", name: "Aplik ME 780", code: "ME 780", images: [aplikImg("ME 780", APLIK_FILE["ME 780"])], relatedIds: ["me-909", "me-756", "me-757"] },
  "wall-light/me-909": { ...APLIK_WALL_LIGHT_SHARED, id: "me-909", name: "Aplik ME 909", code: "ME 909", images: [aplikImg("ME 909", APLIK_FILE["ME 909"])], relatedIds: ["me-990", "me-780", "me-1000"] },
  "wall-light/me-990": { ...APLIK_WALL_LIGHT_SHARED, id: "me-990", name: "Özel Koleksiyon Aplik ME 990", code: "ME 990", subtitle: "Masialux Modern Duvar Aplik | ME 990", images: [aplikImg("ME 990", APLIK_FILE["ME 990"])], relatedIds: ["me-991", "me-909", "me-999"] },
  "wall-light/me-991": { ...APLIK_WALL_LIGHT_SHARED, id: "me-991", name: "Özel Koleksiyon Aplik ME 991", code: "ME 991", images: [aplikImg("ME 991", APLIK_FILE["ME 991"])], relatedIds: ["me-992", "me-990"] },
  "wall-light/me-992": { ...APLIK_WALL_LIGHT_SHARED, id: "me-992", name: "Özel Koleksiyon Aplik ME 992", code: "ME 992", images: [aplikImg("ME 992", APLIK_FILE["ME 992"])], relatedIds: ["me-993", "me-991"] },
  "wall-light/me-993": { ...APLIK_WALL_LIGHT_SHARED, id: "me-993", name: "Özel Koleksiyon Aplik ME 993", code: "ME 993", images: [aplikImg("ME 993", APLIK_FILE["ME 993"])], relatedIds: ["me-994", "me-992"] },
  "wall-light/me-994": { ...APLIK_WALL_LIGHT_SHARED, id: "me-994", name: "Özel Koleksiyon Aplik ME 994", code: "ME 994", subtitle: "Masialux Modern Duvar Aplik | ME 994", features: [{ label: "IP Koruma", value: "IP 20" }], images: [aplikImg("ME 994", APLIK_FILE["ME 994"])], relatedIds: ["me-993", "me-995", "me-162"] },
  "wall-light/me-995": { ...APLIK_WALL_LIGHT_SHARED, id: "me-995", name: "Özel Koleksiyon Aplik ME 995", code: "ME 995", images: [aplikImg("ME 995", APLIK_FILE["ME 995"])], relatedIds: ["me-994", "me-996"] },
  "wall-light/me-996": { ...APLIK_WALL_LIGHT_SHARED, id: "me-996", name: "Özel Koleksiyon Aplik ME 996", code: "ME 996", images: [aplikImg("ME 996", APLIK_FILE["ME 996"])], relatedIds: ["me-995", "me-997"] },
  "wall-light/me-997": { ...APLIK_WALL_LIGHT_SHARED, id: "me-997", name: "Özel Koleksiyon Aplik ME 997", code: "ME 997", images: [aplikImg("ME 997", APLIK_FILE["ME 997"])], relatedIds: ["me-996", "me-998"] },
  "wall-light/me-998": { ...APLIK_WALL_LIGHT_SHARED, id: "me-998", name: "Özel Koleksiyon Aplik ME 998", code: "ME 998", images: [aplikImg("ME 998", APLIK_FILE["ME 998"])], relatedIds: ["me-997", "me-999"] },
  "wall-light/me-999": { ...APLIK_WALL_LIGHT_SHARED, id: "me-999", name: "Özel Koleksiyon Aplik ME 999", code: "ME 999", images: [aplikImg("ME 999", APLIK_FILE["ME 999"])], relatedIds: ["me-998", "me-990"] },
};

/** Masialux URL slug'ı farklı olan ürünler: yerel slug → scraped key */
/** Yerel slug (tiresiz vb.) → scraped JSON anahtarı */
const SCRAPED_KEY_ALIASES: Record<string, string> = {
  "ray-spot/mr-602-100": "ray-spot/mr-602",
  "recessed/mbf100": "recessed/mbf-100",
  "recessed/mbf101": "recessed/mbf-101",
  "recessed/mbf102": "recessed/mbf-102",
  "recessed/mbf103": "recessed/mbf-103",
  "recessed/md150": "recessed/md-150-1",
  "recessed/md-901-85": "recessed/md-901-1-85",
  "recessed/md-901-100": "recessed/md-901-1-100",
  "recessed/md-617-1": "recessed/md-617-1-60",
  "recessed/md-616-2": "recessed/md-616-2-60",
  "recessed/md-616-1": "recessed/md-616-1-60",
  "recessed/md-601-1-100": "recessed/md-160-1-100",
  "recessed/md-125-118": "recessed/md-125-1-118",
  "recessed/md-125-100": "recessed/md-125-1-100",
  "recessed/md-122-100": "recessed/md-122-1-100",
  "recessed/md-122-118": "recessed/md-122-1-118",
  "recessed/md-121-2-60": "recessed/md-122-2-60",
  // Lineer: Masialux lineer kategorisi sıva üstü URL’leri kullandığı için scraped key surface-mounted
  "linear/ms-503-400": "surface-mounted/ms-503-400",
  "linear/ms-503-500": "surface-mounted/ms-503-500",
  "linear/ms-503-600": "surface-mounted/ms-503-600",
  "linear/ms-504-500": "surface-mounted/ms-504-500",
  "linear/ms-504-600": "surface-mounted/ms-504-600",
  "linear/ms-504-700": "surface-mounted/ms-504-700",
  "linear/ms-619": "surface-mounted/ms-619",
  "linear/ms-620": "surface-mounted/ms-619",
  "linear/ms-621": "surface-mounted/ms-619",
  "linear/ms-622": "surface-mounted/ms-622",
  "linear/ms-623": "surface-mounted/ms-623",
  "linear/ms-660": "surface-mounted/ms-660",
  "linear/ms-670": "surface-mounted/ms-670",
  // Magnet: Masialux sayfa başlıkları varyant kodları kullanıyor (100-55, 101-45, 104-1 vb.)
  "magnet/mrm-100": "magnet/mrm-100-55",
  "magnet/mrm-101": "magnet/mrm-101-45",
  "magnet/mrm-104": "magnet/mrm-104-1",
  "magnet/mrm-105": "magnet/mrm-105-1",
  "magnet/mrm-300-60": "magnet/mrm-109",
  // Endüstriyel DOSIA: slug → Masialux scraped key (isim/seri Masialux ile aynı)
  "industrial-lighting/mp-100-30": "industrial-lighting/mj-104-300",
  "industrial-lighting/mps-100-30": "industrial-lighting/mj-105-300",
  "industrial-lighting/mps-100-60": "industrial-lighting/mj-104-600",
  "industrial-lighting/mp-200-30": "industrial-lighting/mj-106-300",
  "industrial-lighting/mp-200-60": "industrial-lighting/mj-106-600",
  "industrial-lighting/mp-300-60": "industrial-lighting/mj-105-600",
};

/** Label'a göre tekrarları kaldır (ilk geçen kalır) */
function dedupeByLabel<T extends { label: string }>(items: T[]): T[] {
  if (!items?.length) return items ?? [];
  const seen = new Set<string>();
  return items.filter((item) => {
    const k = (item.label || "").trim().toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Endüstriyel ürünlerde açıklama içindeki "Kullanım Alanları" metnini kaldırıp usageAreas'a taşır */
const INDUSTRIAL_USAGE_MARKERS = /Kullanım\s+Alanları|KULLANIM\s+ALANLARI/i;
const INDUSTRIAL_USAGE_AREAS_ORDER = [
  "Fabrikalar",
  "Otoparklar",
  "Tüneller",
  "Garajlar",
  "Şantiye Alanları",
  "Depolar",
  "Nemli ve Tozlu Dış Ortamlar",
];

function extractUsageAreasFromIndustrialDescription(merged: ProductDetail): void {
  if (merged.categorySlug !== "industrial-lighting" || !merged.description) return;
  const desc = merged.description;
  const idx = desc.search(INDUSTRIAL_USAGE_MARKERS);
  if (idx === -1) return;
  const before = desc.slice(0, idx).trim();
  const afterMarker = desc.slice(idx).replace(INDUSTRIAL_USAGE_MARKERS, "").trim();
  const extracted = INDUSTRIAL_USAGE_AREAS_ORDER.filter((area) =>
    afterMarker.includes(area)
  );
  if (extracted.length > 0) {
    merged.description = before;
    merged.usageAreas = extracted;
  }
}

/** Tüm metin alanlarına glossary çevirisini uygular (locale en veya ar ise). */
function applyGlossaryToDetail(detail: ProductDetail, locale: LocaleProduct): void {
  if (detail.name) detail.name = translateWithGlossary(detail.name, locale);
  if (detail.category) detail.category = translateWithGlossary(detail.category, locale);
  if (detail.subtitle) detail.subtitle = translateWithGlossary(detail.subtitle, locale);
  if (detail.description) detail.description = translateWithGlossary(detail.description, locale);
  if (detail.usageAreas?.length)
    detail.usageAreas = detail.usageAreas.map((a) => translateWithGlossary(a, locale));
  if (detail.features?.length) {
    detail.features = detail.features.map((f) => ({
      label: translateWithGlossary(f.label, locale),
      value: translateWithGlossary(f.value, locale),
    }));
  }
  if (detail.technicalSpecs?.length) {
    detail.technicalSpecs = detail.technicalSpecs.map((s) => ({
      label: translateWithGlossary(s.label, locale),
      value: translateWithGlossary(s.value, locale),
    }));
  }
  if (detail.mountingSafetyWarnings?.length)
    detail.mountingSafetyWarnings = detail.mountingSafetyWarnings.map((w) =>
      translateWithGlossary(w, locale)
    );
  if (detail.importantWarnings?.length)
    detail.importantWarnings = detail.importantWarnings.map((w) =>
      translateWithGlossary(w, locale)
    );
  if (detail.warrantyTerms) {
    if (detail.warrantyTerms.title)
      detail.warrantyTerms.title = translateWithGlossary(detail.warrantyTerms.title, locale);
    if (detail.warrantyTerms.items?.length)
      detail.warrantyTerms.items = detail.warrantyTerms.items.map((i) =>
        translateWithGlossary(i, locale)
      );
  }
  if (detail.downloads?.length)
    detail.downloads = detail.downloads.map((d) => ({
      ...d,
      label: translateWithGlossary(d.label, locale),
    }));
  if (detail.bodyColorOptions?.length)
    detail.bodyColorOptions = detail.bodyColorOptions.map((o) => ({
      ...o,
      label: translateWithGlossary(o.label, locale),
    }));
  if (detail.lightColorOptions?.length)
    detail.lightColorOptions = detail.lightColorOptions.map((o) => ({
      ...o,
      label: translateWithGlossary(o.label, locale),
    }));
}

export function getProductDetail(
  categorySlug: string,
  productSlug: string,
  locale?: string
): ProductDetail | null {
  const key = `${categorySlug}/${productSlug}`;
  const base = detailMap[key];
  const scrapedKey = SCRAPED_KEY_ALIASES[key] ?? key;
  const scrapedMap = productDetailsScraped as unknown as Record<string, ProductDetail | undefined>;
  const scraped = scrapedMap[key] ?? scrapedMap[scrapedKey];

  // Dış Mekan: scraped yoksa (özellikle yeni eklenenler) mevcut bir outdoor şablonunu baz al
  // Böylece eski dış mekan ürünlerindeki subtitle/description/uyarılar/garanti vb. alanlar da görünür.
  if (categorySlug === "outdoor" && base && !scraped) {
    const product = getProductById("outdoor", productSlug);
    const outdoorProducts = getProductsByCategory("outdoor");
    const idx = outdoorProducts.findIndex((p) => p.id === productSlug);
    const relatedIds = outdoorProducts
      .filter((_, i) => i !== idx)
      .slice(0, 6)
      .map((p) => p.id);

    const template = scrapedMap["outdoor/mo-110"];
    const merged: ProductDetail = {
      ...base,
      ...(template ?? {}),
      id: productSlug,
      name: product?.name ?? base.name,
      category: product?.category ?? base.category ?? "Dış Mekan",
      categorySlug: "outdoor",
      code: product?.code ?? base.code,
      images: base.images ?? template?.images,
      relatedIds,
    };
    merged.features = dedupeByLabel(merged.features ?? []);
    merged.technicalSpecs = dedupeByLabel(merged.technicalSpecs ?? []);

    const loc = locale === "en" || locale === "ar" ? locale : undefined;
    if (loc) {
      const overrides = productDetailTranslations[loc][key];
      if (overrides) {
        if (overrides.name != null) merged.name = overrides.name;
        if (overrides.category != null) merged.category = overrides.category;
        if (overrides.subtitle != null) merged.subtitle = overrides.subtitle;
        if (overrides.description != null) merged.description = overrides.description;
        if (overrides.usageAreas != null) merged.usageAreas = overrides.usageAreas;
        if (overrides.features != null) merged.features = overrides.features;
        if (overrides.technicalSpecs != null) merged.technicalSpecs = overrides.technicalSpecs;
        if (overrides.mountingSafetyWarnings != null)
          merged.mountingSafetyWarnings = overrides.mountingSafetyWarnings;
        if (overrides.importantWarnings != null) merged.importantWarnings = overrides.importantWarnings;
        if (overrides.warrantyTerms != null) merged.warrantyTerms = overrides.warrantyTerms;
        if (overrides.downloads != null) merged.downloads = overrides.downloads;
        if (overrides.bodyColorOptions != null) merged.bodyColorOptions = overrides.bodyColorOptions;
        if (overrides.lightColorOptions != null) merged.lightColorOptions = overrides.lightColorOptions;
      }
      applyGlossaryToDetail(merged, loc);
    }

    return merged;
  }

  // Sıva Üstü: scraped yoksa (yeni eklenen ürünler) mevcut bir surface-mounted şablonunu baz al
  // Böylece eski sıva üstü ürünlerindeki subtitle/description/uyarılar/garanti vb. alanlar da görünür.
  if (categorySlug === "surface-mounted" && base && !scraped) {
    const product = getProductById("surface-mounted", productSlug);
    const surfaceMountedProducts = getProductsByCategory("surface-mounted");
    const idx = surfaceMountedProducts.findIndex((p) => p.id === productSlug);
    const relatedIds = surfaceMountedProducts
      .filter((_, i) => i !== idx)
      .slice(0, 6)
      .map((p) => p.id);

    const template = scrapedMap["surface-mounted/ms-700-70"] ?? scrapedMap["surface-mounted/ms-612-1-100"];
    const merged: ProductDetail = {
      ...base,
      ...(template ?? {}),
      id: productSlug,
      name: product?.name ?? base.name,
      category: product?.category ?? base.category ?? "Sıva Üstü",
      categorySlug: "surface-mounted",
      code: product?.code ?? base.code,
      images: base.images ?? template?.images,
      relatedIds,
    };
    merged.features = dedupeByLabel(merged.features ?? []);
    merged.technicalSpecs = dedupeByLabel(merged.technicalSpecs ?? []);

    const loc = locale === "en" || locale === "ar" ? locale : undefined;
    if (loc) {
      const overrides = productDetailTranslations[loc][key];
      if (overrides) {
        if (overrides.name != null) merged.name = overrides.name;
        if (overrides.category != null) merged.category = overrides.category;
        if (overrides.subtitle != null) merged.subtitle = overrides.subtitle;
        if (overrides.description != null) merged.description = overrides.description;
        if (overrides.usageAreas != null) merged.usageAreas = overrides.usageAreas;
        if (overrides.features != null) merged.features = overrides.features;
        if (overrides.technicalSpecs != null) merged.technicalSpecs = overrides.technicalSpecs;
        if (overrides.mountingSafetyWarnings != null)
          merged.mountingSafetyWarnings = overrides.mountingSafetyWarnings;
        if (overrides.importantWarnings != null) merged.importantWarnings = overrides.importantWarnings;
        if (overrides.warrantyTerms != null) merged.warrantyTerms = overrides.warrantyTerms;
        if (overrides.downloads != null) merged.downloads = overrides.downloads;
        if (overrides.bodyColorOptions != null) merged.bodyColorOptions = overrides.bodyColorOptions;
        if (overrides.lightColorOptions != null) merged.lightColorOptions = overrides.lightColorOptions;
      }
      applyGlossaryToDetail(merged, loc);
    }

    return merged;
  }

  // Sıva Altı: scraped yoksa (yeni eklenen ürünler) mevcut bir recessed şablonunu baz al
  // Böylece eski sıva altı ürünlerindeki subtitle/description/uyarılar/garanti vb. alanlar da görünür.
  if (categorySlug === "recessed" && base && !scraped) {
    const product = getProductById("recessed", productSlug);
    const recessedProducts = getProductsByCategory("recessed");
    const idx = recessedProducts.findIndex((p) => p.id === productSlug);
    const relatedIds = recessedProducts
      .filter((_, i) => i !== idx)
      .slice(0, 6)
      .map((p) => p.id);

    const template = scrapedMap["recessed/md-010"];
    const merged: ProductDetail = {
      ...base,
      ...(template ?? {}),
      id: productSlug,
      name: product?.name ?? base.name,
      category: product?.category ?? base.category ?? "Sıva Altı",
      categorySlug: "recessed",
      code: product?.code ?? base.code,
      images: base.images ?? template?.images,
      relatedIds,
    };
    merged.features = dedupeByLabel(merged.features ?? []);
    merged.technicalSpecs = dedupeByLabel(merged.technicalSpecs ?? []);

    const loc = locale === "en" || locale === "ar" ? locale : undefined;
    if (loc) {
      const overrides = productDetailTranslations[loc][key];
      if (overrides) {
        if (overrides.name != null) merged.name = overrides.name;
        if (overrides.category != null) merged.category = overrides.category;
        if (overrides.subtitle != null) merged.subtitle = overrides.subtitle;
        if (overrides.description != null) merged.description = overrides.description;
        if (overrides.usageAreas != null) merged.usageAreas = overrides.usageAreas;
        if (overrides.features != null) merged.features = overrides.features;
        if (overrides.technicalSpecs != null) merged.technicalSpecs = overrides.technicalSpecs;
        if (overrides.mountingSafetyWarnings != null)
          merged.mountingSafetyWarnings = overrides.mountingSafetyWarnings;
        if (overrides.importantWarnings != null) merged.importantWarnings = overrides.importantWarnings;
        if (overrides.warrantyTerms != null) merged.warrantyTerms = overrides.warrantyTerms;
        if (overrides.downloads != null) merged.downloads = overrides.downloads;
        if (overrides.bodyColorOptions != null) merged.bodyColorOptions = overrides.bodyColorOptions;
        if (overrides.lightColorOptions != null) merged.lightColorOptions = overrides.lightColorOptions;
      }
      applyGlossaryToDetail(merged, loc);
    }

    return merged;
  }

  // Sarkıt: detailMap/scraped yoksa products listesinden detay oluştur (Masialux Özel Koleksiyon Sarkıt formatı + gövde renk seçenekleri)
  if (!base && !scraped && categorySlug === "pendant") {
    const product = getProductById("pendant", productSlug);
    if (product) {
      const pendantProducts = getProductsByCategory("pendant");
      const idx = pendantProducts.findIndex((p) => p.id === productSlug);
      const relatedIds = pendantProducts
        .filter((_, i) => i !== idx)
        .slice(0, 6)
        .map((p) => p.id);
      const merged: ProductDetail = {
        id: productSlug,
        name: product.name,
        category: product.category,
        categorySlug: "pendant",
        code: product.code,
        features: [],
        technicalSpecs: [],
        usageAreas: [],
        relatedIds,
        images: product.listImagePath ? [product.listImagePath] : undefined,
        bodyColorOptions: PENDANT_BODY_COLORS,
      };
      const loc = locale === "en" || locale === "ar" ? locale : undefined;
      if (loc) applyGlossaryToDetail(merged, loc);
      return merged;
    }
  }

  // Lambader: detailMap/scraped yoksa products listesinden minimal detay (Masialux’ta sayfası olmayan ürünler)
  if (!base && !scraped && categorySlug === "lamp-shade") {
    const product = getProductById("lamp-shade", productSlug);
    if (product) {
      const lampShadeProducts = getProductsByCategory("lamp-shade");
      const idx = lampShadeProducts.findIndex((p) => p.id === productSlug);
      const relatedIds = lampShadeProducts
        .filter((_, i) => i !== idx)
        .slice(0, 6)
        .map((p) => p.id);
      const merged: ProductDetail = {
        id: productSlug,
        name: product.name,
        category: product.category,
        categorySlug: "lamp-shade",
        code: product.code,
        features: [],
        technicalSpecs: [],
        usageAreas: [],
        relatedIds,
        images: product.listImagePath ? [product.listImagePath] : undefined,
      };
      const loc = locale === "en" || locale === "ar" ? locale : undefined;
      if (loc) applyGlossaryToDetail(merged, loc);
      return merged;
    }
  }

  if (!base && !scraped) return null;
  const merged: ProductDetail = {
    ...(base ?? {
      id: productSlug,
      name: scraped?.name ?? "",
      category: "",
      categorySlug,
      features: [],
      technicalSpecs: [],
      usageAreas: [],
      relatedIds: [],
    }),
    ...scraped,
    id: productSlug,
  };
  merged.features = dedupeByLabel(merged.features ?? []);
  merged.technicalSpecs = dedupeByLabel(merged.technicalSpecs ?? []);
  if (merged.categorySlug === "bronze-collection") {
    // Bronz Koleksiyon: tüm ürünlerde teknik kartlar aynı şablondan gelsin
    merged.technicalSpecs = [...BRONZ_COLLECTION_SHARED.technicalSpecs];
  }
  if (scrapedKey !== key && scraped?.name) {
    const modelFromSlug = productSlug.toUpperCase().replace(/-/g, " ");
    merged.name = (merged.name || "").replace(/\bMS\s*619\b/gi, modelFromSlug);
  }
  if (key === "magnet/mrm-300-60") merged.name = base?.name ?? "MAGNET SERİSİ MRM 300-60 MAGNET SARKIT";
  extractUsageAreasFromIndustrialDescription(merged);
  if (merged.categorySlug === "pendant") merged.bodyColorOptions = PENDANT_BODY_COLORS;

  const loc = locale === "en" || locale === "ar" ? locale : undefined;
  if (loc) {
    const overrides = productDetailTranslations[loc][key];
    if (overrides) {
      if (overrides.name != null) merged.name = overrides.name;
      if (overrides.category != null) merged.category = overrides.category;
      if (overrides.subtitle != null) merged.subtitle = overrides.subtitle;
      if (overrides.description != null) merged.description = overrides.description;
      if (overrides.usageAreas != null) merged.usageAreas = overrides.usageAreas;
      if (overrides.features != null) merged.features = overrides.features;
      if (overrides.technicalSpecs != null) merged.technicalSpecs = overrides.technicalSpecs;
      if (overrides.mountingSafetyWarnings != null)
        merged.mountingSafetyWarnings = overrides.mountingSafetyWarnings;
      if (overrides.importantWarnings != null)
        merged.importantWarnings = overrides.importantWarnings;
      if (overrides.warrantyTerms != null) merged.warrantyTerms = overrides.warrantyTerms;
      if (overrides.downloads != null) merged.downloads = overrides.downloads;
      if (overrides.bodyColorOptions != null) merged.bodyColorOptions = overrides.bodyColorOptions;
      if (overrides.lightColorOptions != null)
        merged.lightColorOptions = overrides.lightColorOptions;
    }
    applyGlossaryToDetail(merged, loc);
  }

  return merged;
}
