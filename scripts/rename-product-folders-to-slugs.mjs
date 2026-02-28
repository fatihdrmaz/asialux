#!/usr/bin/env node
/**
 * public/images/products/ altındaki kategori klasörlerini SEO uyumlu slug isimlere yeniden adlandırır.
 * Proda deploy öncesi bir kez çalıştırın. Klasör isimleri artık küçük harf, tire, ASCII olacak.
 *
 * Çalıştırma: node scripts/rename-product-folders-to-slugs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsBase = path.join(__dirname, "../public/images/products");

/** Eski klasör adı -> yeni slug (SEO uyumlu). Birden fazla yazım (Unicode vb.) aynı slug'a gidebilir. */
const FOLDER_TO_SLUG = {
  "ACİL YÖNLENDİRME LAMBALARI": "acil-yonlendirme-lambalari",
  APLİK: "aplik",
  "Bronz Koleksiyon": "bronz-koleksiyon",
  "DIŞ MEKAN": "dis-mekan",
  ENDÜSTRİYEL: "endustriyel",
  "LAMBADER MASA LAMBASI": "lambader-masa-lambasi",
  "MAGNET RAY SPOT": "magnet-ray-spot",
  "RAY SPOT": "ray-spot",
  SARKIT: "sarkit",
  "SIVA ALTI": "siva-alti",
  "SIVA ÜSTÜ": "siva-ustu",
  "SIVE ÜSTÜ LİNEER": "siva-ustu-lineer",
};

function nameToSlug(name) {
  return name
    .normalize("NFD")
    .replace(/\s+/g, "-")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .toLowerCase();
}

if (!fs.existsSync(productsBase)) {
  console.error("Klasör bulunamadı:", productsBase);
  process.exit(1);
}

const existing = fs.readdirSync(productsBase, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let renamed = 0;
for (const [oldName, slug] of Object.entries(FOLDER_TO_SLUG)) {
  const found = existing.find(
    (d) => d === oldName || d.normalize("NFC") === oldName.normalize("NFC") || nameToSlug(d) === slug
  );
  if (!found || found === slug) continue;
  const oldPath = path.join(productsBase, found);
  const newPath = path.join(productsBase, slug);
  if (fs.existsSync(newPath)) {
    console.warn("Hedef zaten var, atlanıyor:", found, "->", slug);
    continue;
  }
  fs.renameSync(oldPath, newPath);
  console.log("Yeniden adlandırıldı:", found, "->", slug);
  renamed++;
}

console.log("Toplam", renamed, "klasör güncellendi. Kod tarafında FOLDER sabitleri ve generate script'leri slug kullanacak şekilde güncellenmeli.");
