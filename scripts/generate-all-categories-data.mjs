/**
 * public/images/products/ altındaki kategori klasörlerini tarar,
 * Ray Spot standardında ürün listesi ve detay üretir.
 * Çalıştırma: node scripts/generate-all-categories-data.mjs
 *
 * Kategori -> Klasör eşlemesi (SEO uyumlu slug; klasörler rename-product-folders-to-slugs.mjs ile yeniden adlandırılmış olmalı):
 * - ray-spot -> ray-spot
 * - surface-mounted -> siva-ustu
 * - recessed -> siva-alti
 * - linear -> siva-ustu-lineer
 * - magnet -> magnet-ray-spot
 * - industrial-lighting -> endustriyel
 * - outdoor -> dis-mekan
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsBase = path.join(__dirname, "../public/images/products");

const CATEGORY_CONFIG = [
  { categorySlug: "ray-spot", categoryName: "Ray Spot", folderName: "ray-spot" },
  { categorySlug: "surface-mounted", categoryName: "Sıva Üstü", folderName: "siva-ustu" },
  { categorySlug: "recessed", categoryName: "Sıva Altı", folderName: "siva-alti" },
  { categorySlug: "linear", categoryName: "Lineer", folderName: "siva-ustu-lineer" },
  { categorySlug: "magnet", categoryName: "Magnet", folderName: "magnet-ray-spot" },
  { categorySlug: "industrial-lighting", categoryName: "Endüstriyel Aydınlatma", folderName: "endustriyel" },
  { categorySlug: "outdoor", categoryName: "Dış Mekan", folderName: "dis-mekan" },
];

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
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutNum = withoutExt.replace(/^\d+\./, "");
  return withoutNum.replace(/\s+SERİSİ\s+/, " SERİSİ | ");
}

const allCategoryProducts = [];
const allDetailEntries = [];

for (const config of CATEGORY_CONFIG) {
  const categoryBase = path.join(productsBase, config.folderName);
  if (!fs.existsSync(categoryBase)) {
    console.warn("Klasör yok, atlanıyor:", config.folderName);
    continue;
  }

  const dirs = fs.readdirSync(categoryBase, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const products = [];
  const details = [];

  for (const folder of dirs) {
    if (config.categorySlug === "ray-spot" && folder === "TRİFAZE RAY") continue;
    const folderPath = path.join(categoryBase, folder);
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
      const segment = config.folderName + "/" + encodeURIComponent(folder) + "/" + encodeURIComponent(f);
      return "/images/products/" + segment;
    });

    products.push({
      id: slug,
      name: productName,
      category: config.categoryName,
      categorySlug: config.categorySlug,
      code: folder,
      listImagePath: imagePaths[0],
    });

    details.push({
      id: slug,
      name: productName,
      category: config.categoryName,
      categorySlug: config.categorySlug,
      code: folder,
      images: imagePaths,
      features: [],
      technicalSpecs: [],
      usageAreas: [],
      relatedIds: [],
    });
  }

  if (products.length === 0) {
    console.warn("Ürün yok, atlanıyor:", config.folderName);
    continue;
  }

  allCategoryProducts.push({ config, products, details });
  allDetailEntries.push(...details.map((d) => ({ key: `${d.categorySlug}/${d.id}`, detail: d })));
}

// Build products.ts exports: one array per category + getProductsByCategory + getProductById + otherCategoryPlaceholders + allProducts
function toArrayName(slug) {
  if (slug === "ray-spot") return "raySpotProducts";
  if (slug === "surface-mounted") return "surfaceMountedProducts";
  if (slug === "industrial-lighting") return "industrialLightingProducts";
  return slug.split("-").map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join("") + "Products";
}

const productArrayLines = [];
const getProductsByCategoryCases = [];
for (const { config, products } of allCategoryProducts) {
  const arrName = toArrayName(config.categorySlug);
  const lines = products.map(
    (p) => `  { id: ${JSON.stringify(p.id)}, name: ${JSON.stringify(p.name)}, category: ${JSON.stringify(p.category)}, categorySlug: ${JSON.stringify(p.categorySlug)}, code: ${JSON.stringify(p.code)}, listImagePath: ${JSON.stringify(p.listImagePath)} },`
  );
  productArrayLines.push(`export const ${arrName}: Product[] = [\n${lines.join("\n")}\n];`);
  const returnExpr = arrName;
  getProductsByCategoryCases.push(`  if (categorySlug === ${JSON.stringify(config.categorySlug)}) return ${returnExpr};`);
}

const allProductsSpread = allCategoryProducts.map(({ config }) => `...${toArrayName(config.categorySlug)}`).join(", ");

const productsTs = `/**
 * Ürün listeleri: public/images/products/ altındaki kategori klasörlerinden türetilir.
 * Yenilemek için: node scripts/generate-all-categories-data.mjs
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  code?: string;
  listImagePath?: string;
}

${productArrayLines.join("\n\n")}

/** Kategori slug'ına göre ürün listesi */
export function getProductsByCategory(categorySlug: string): Product[] {
${getProductsByCategoryCases.join("\n")}
  return [];
}

/** Kategori ve ürün id (slug) ile tek ürün */
export function getProductById(categorySlug: string, productId: string): Product | undefined {
  const list = getProductsByCategory(categorySlug);
  return list.find((p) => p.id === productId);
}

/** Diğer kategoriler (henüz klasör yok): placeholder */
export const otherCategoryPlaceholders: Product[] = [
  { id: "aplik-ap-450", name: "Aplik AP-450", category: "Aplik", categorySlug: "wall-light" },
  { id: "sarkit-sk-520", name: "Sarkıt SK-520", category: "Sarkıt", categorySlug: "pendant" },
  { id: "abajur-ab-910", name: "Abajur AB-910", category: "Abajur ve Lambader", categorySlug: "lamp-shade" },
  { id: "bronz-br-920", name: "Bronz Koleksiyon BR-920", category: "Bronz Koleksiyon", categorySlug: "bronze-collection" },
  { id: "acil-ac-940", name: "Acil Aydınlatma AC-940", category: "Acil Aydınlatma ve Yönlendirmeler", categorySlug: "emergency-lighting" },
];

export const allProducts: Product[] = [${allProductsSpread}, ...otherCategoryPlaceholders];
`;

// Build productDetails.ts
const detailMapLines = [];
for (const { key, detail } of allDetailEntries) {
  const imagesStr = detail.images.map((url) => JSON.stringify(url)).join(", ");
  detailMapLines.push(
    `  "${key}": { id: ${JSON.stringify(detail.id)}, name: ${JSON.stringify(detail.name)}, category: ${JSON.stringify(detail.category)}, categorySlug: ${JSON.stringify(detail.categorySlug)}, code: ${JSON.stringify(detail.code)}, images: [${imagesStr}], features: [], technicalSpecs: [], usageAreas: [], relatedIds: [] },`
  );
}

const productDetailsTs = `/**
 * Ürün detayları: public/images/products/ altındaki kategori klasörlerinden türetilir.
 * Yenilemek için: node scripts/generate-all-categories-data.mjs
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
${detailMapLines.join("\n")}
};

export function getProductDetail(categorySlug: string, productSlug: string): ProductDetail | null {
  return detailMap[\`\${categorySlug}/\${productSlug}\`] ?? null;
}
`;

fs.writeFileSync(path.join(__dirname, "../data/products.ts"), productsTs);
fs.writeFileSync(path.join(__dirname, "../data/productDetails.ts"), productDetailsTs);

console.log("Üretilen kategoriler:", allCategoryProducts.map((c) => c.config.categorySlug + " (" + c.products.length + " ürün)").join(", "));
console.log("Yazıldı: data/products.ts, data/productDetails.ts");
