#!/usr/bin/env node
/**
 * public/images/products/ altındaki tüm ürün görsellerinin dosya adlarını
 * SEO ve prod deploy uyumlu yapar (küçük harf, tire, ASCII).
 * Referansları data/products.ts ve data/productDetails.ts içinde günceller.
 *
 * Çalıştırma: node scripts/rename-product-images-to-slugs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsBase = path.join(__dirname, "../public/images/products");
const ROOT = path.join(__dirname, "..");

const IMG_EXT = /\.(jpg|jpeg|png|webp)$/i;

function slugifyFilename(name) {
  const ext = path.extname(name).toLowerCase();
  const base = name.slice(0, -ext.length);
  const leadingNum = base.match(/^(\d+)\.?\s*/);
  const prefix = leadingNum ? leadingNum[1] + "-" : "";
  const rest = (leadingNum ? base.slice(leadingNum[0].length) : base).trim();
  const slug = rest
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
    .replace(/[^a-z0-9-]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const out = (prefix + (slug || "image")).replace(/-+/g, "-").replace(/^-|-$/g, "") + ext;
  return out || "image" + ext;
}

function walkDir(dir, baseDir, list) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(baseDir, full);
    if (e.isDirectory()) {
      walkDir(full, baseDir, list);
    } else if (e.isFile() && IMG_EXT.test(e.name)) {
      list.push(rel.split(path.sep).join("/"));
    }
  }
}

function pathToUrlPath(relativePath) {
  const parts = relativePath.split("/");
  if (parts.length < 2) return "/images/products/" + relativePath;
  const category = parts[0];
  const filename = parts[parts.length - 1];
  const middle = parts.slice(1, -1).map((s) => encodeURIComponent(s)).join("/");
  return "/images/products/" + category + "/" + middle + "/" + filename;
}

// 1) Topla: tüm görsel dosyaları (relative path)
const allFiles = [];
walkDir(productsBase, productsBase, allFiles);

const mapping = {};
let renamed = 0;

for (const rel of allFiles) {
  const parts = rel.split("/");
  const filename = parts[parts.length - 1];
  const newFilename = slugifyFilename(filename);
  if (newFilename === filename) continue;

  const dir = path.join(productsBase, path.dirname(rel));
  const oldPath = path.join(productsBase, rel);
  const newPath = path.join(dir, newFilename);

  if (fs.existsSync(newPath) && path.relative(oldPath, newPath) !== "") {
    console.warn("Hedef dosya zaten var, atlanıyor:", rel);
    continue;
  }

  try {
    fs.renameSync(oldPath, newPath);
  } catch (err) {
    console.warn("Yeniden adlandırılamadı:", rel, err.message);
    continue;
  }

  const newRel = path.dirname(rel) + "/" + newFilename;
  if (path.dirname(rel)) {
    mapping[rel] = newRel;
    renamed++;
  }
}

console.log("Yeniden adlandırılan dosya sayısı:", renamed);

// 2) products.ts ve productDetails.ts içindeki /images/products/... yollarını güncelle
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const pathRe = /\/images\/products\/([^"'\s]+?\.(?:jpg|jpeg|png|webp))/gi;
  let count = 0;
  content = content.replace(pathRe, (fullMatch) => {
    const afterPrefix = fullMatch.replace(/^\/images\/products\//, "");
    const decoded = afterPrefix.split("/").map((s) => decodeURIComponent(s)).join("/");
    const newRel = mapping[decoded];
    if (!newRel) return fullMatch;
    count++;
    return pathToUrlPath(newRel);
  });
  if (count > 0) {
    fs.writeFileSync(filePath, content);
    console.log("Güncellendi:", filePath, count, "referans");
  }
}

if (renamed > 0) {
  updateFile(path.join(ROOT, "data/products.ts"));
  updateFile(path.join(ROOT, "data/productDetails.ts"));
}

// 3) Helper çağrılarındaki dosya adlarını güncelle (her zaman çalıştır) (acilListImagePath, sarkitListImagePath, lambaderListImagePath)
const productsPath = path.join(ROOT, "data/products.ts");
let productsContent = fs.readFileSync(productsPath, "utf8");
const helperRe = /(acilListImagePath|sarkitListImagePath|lambaderListImagePath)\(([^,]+),\s*"([^"]+)"\)/g;
let helperCount = 0;
productsContent = productsContent.replace(helperRe, (match, fn, sub, filename) => {
  const newName = slugifyFilename(filename);
  if (newName === filename) return match;
  helperCount++;
  return `${fn}(${sub}, "${newName}")`;
});
if (helperCount > 0) {
  fs.writeFileSync(productsPath, productsContent);
  console.log("Helper argümanları güncellendi (products.ts):", helperCount);
}

// 4) productDetailsScraped.json içinde images varsa güncelle (sadece mapping varsa)
const scrapedPath = path.join(ROOT, "data/productDetailsScraped.json");
if (renamed > 0 && fs.existsSync(scrapedPath)) {
  const scraped = JSON.parse(fs.readFileSync(scrapedPath, "utf8"));
  let scrapedCount = 0;
  for (const key of Object.keys(scraped)) {
    const entry = scraped[key];
    if (entry?.images && Array.isArray(entry.images)) {
      entry.images = entry.images.map((url) => {
        const m = url.match(/\/images\/products\/(.+?\.(?:jpg|jpeg|png|webp))$/i);
        if (!m) return url;
        const decoded = m[1].split("/").map((s) => decodeURIComponent(s)).join("/");
        const newRel = mapping[decoded];
        if (!newRel) return url;
        scrapedCount++;
        return pathToUrlPath(newRel);
      });
    }
  }
  if (scrapedCount > 0) {
    fs.writeFileSync(scrapedPath, JSON.stringify(scraped, null, 2));
    console.log("Güncellendi:", scrapedPath, scrapedCount, "referans");
  }
}

console.log("Bitti.");
