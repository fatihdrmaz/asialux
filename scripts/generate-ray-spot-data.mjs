/**
 * public/images/products/ray-spot/ altındaki klasörleri tarar,
 * data/products.ts ve data/productDetails.ts için Ray Spot verisini üretir.
 * Klasör adı SEO uyumlu (rename-product-folders-to-slugs.mjs ile yeniden adlandırılmış olmalı).
 * Çalıştırma: node scripts/generate-ray-spot-data.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAY_SPOT_FOLDER = "ray-spot";
const raySpotBase = path.join(__dirname, "../public/images/products", RAY_SPOT_FOLDER);

if (!fs.existsSync(raySpotBase)) {
  console.error("ray-spot klasörü bulunamadı:", raySpotBase);
  process.exit(1);
}

const dirs = fs.readdirSync(raySpotBase, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const products = [];
const details = [];

function folderToSlug(folder) {
  return folder
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

function fileNameToProductName(filename) {
  // "001.RENARDO SERİSİ MR 601-118 RAY SPOT.jpg" -> "RENARDO SERİSİ | MR 601-118 RAY SPOT"
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutNum = withoutExt.replace(/^\d+\./, "");
  return withoutNum.replace(/\s+SERİSİ\s+/, " SERİSİ | ");
}

for (const folder of dirs) {
  const folderPath = path.join(raySpotBase, folder);
  const files = fs.readdirSync(folderPath)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/^\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.match(/^\d+/)?.[0] || "0", 10);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

  if (files.length === 0) continue;

  const firstFile = files[0];
  const productName = fileNameToProductName(firstFile);
  const slug = folderToSlug(folder);

  const imagePaths = files.map((f) => {
    const segment = RAY_SPOT_FOLDER + "/" + encodeURIComponent(folder) + "/" + encodeURIComponent(f);
    return "/images/products/" + segment;
  });

  const firstImagePath = imagePaths[0];

  products.push({
    id: slug,
    name: productName,
    category: "Ray Spot",
    categorySlug: "ray-spot",
    code: folder,
    listImagePath: firstImagePath,
  });

  details.push({
    id: slug,
    name: productName,
    category: "Ray Spot",
    categorySlug: "ray-spot",
    code: folder,
    images: imagePaths,
    features: [],
    technicalSpecs: [],
    usageAreas: [],
    relatedIds: [],
  });
}

// products.ts içeriği (sadece raySpotProducts kısmı)
const productLines = products.map(
  (p) => `  { id: ${JSON.stringify(p.id)}, name: ${JSON.stringify(p.name)}, category: ${JSON.stringify(p.category)}, categorySlug: ${JSON.stringify(p.categorySlug)}, code: ${JSON.stringify(p.code)}, listImagePath: ${JSON.stringify(p.listImagePath)} },`
);

// productDetails: her ürün için images array ile
const detailLines = details.map((d) => {
  const imagesStr = d.images.map((url) => JSON.stringify(url)).join(", ");
  return `  "ray-spot/${d.id}": { id: ${JSON.stringify(d.id)}, name: ${JSON.stringify(d.name)}, category: ${JSON.stringify(d.category)}, categorySlug: ${JSON.stringify(d.categorySlug)}, code: ${JSON.stringify(d.code)}, images: [${imagesStr}], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },`;
});

fs.writeFileSync(
  path.join(__dirname, "../scripts/ray-spot-products-output.txt"),
  "// raySpotProducts array entries:\n" + productLines.join("\n")
);

fs.writeFileSync(
  path.join(__dirname, "../scripts/ray-spot-details-output.txt"),
  "// detailMap entries:\n" + detailLines.join("\n")
);

const productDetailsTs = `/**
 * Ürün detay verileri – Ray Spot: public/images/products/RAY SPOT/ klasörlerinden türetilir.
 * Yenilemek için: node scripts/generate-ray-spot-data.mjs
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
  features: ProductFeature[];
  technicalSpecs: ProductFeature[];
  usageAreas: string[];
  stockCode?: string;
  relatedIds: string[];
  images?: string[];
}

const detailMap: Record<string, ProductDetail> = {
${detailLines.join("\n")}
};

export function getProductDetail(categorySlug: string, productSlug: string): ProductDetail | null {
  return detailMap[\`\${categorySlug}/\${productSlug}\`] ?? null;
}
`;

fs.writeFileSync(path.join(__dirname, "../data/productDetails.ts"), productDetailsTs);

console.log("Üretilen ürün sayısı:", products.length);
console.log("Çıktı: scripts/ray-spot-*.txt ve data/productDetails.ts");
