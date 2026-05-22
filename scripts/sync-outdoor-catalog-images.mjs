#!/usr/bin/env node
/**
 * Masialux dış mekan katalogundan çalışan ilk görsel URL'lerini çeker ve
 * products.ts + productDetails.ts içindeki admin/images/serve/* linklerini günceller.
 */
import * as cheerio from "cheerio";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CATALOG_URL = "https://masialux.com/katalog/10/dis-mekan-aydinlatma";

function slugToProductId(catalogSlug) {
  // mo-249-1-50-dis-mekan-aydinlatma -> mo-249-1 (çap suffix'i atlanır)
  const withDiameter = catalogSlug.match(/^(mo-\d+(?:-\d+)+)-\d+-dis-mekan-aydinlatma$/);
  if (withDiameter) return withDiameter[1];
  // mo-200-dis-mekan-aydinlatma -> mo-200
  const plain = catalogSlug.match(/^(mo-\d+(?:-\d+)?)-dis-mekan-aydinlatma$/);
  return plain ? plain[1] : null;
}

async function fetchCatalogMap() {
  const res = await fetch(CATALOG_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AsialuxSync/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const map = new Map();

  $("a[href*='/urun/']").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (!href.includes("dis-mekan-aydinlatma/mo-")) return;
    const catalogSlug = href.replace(/\/$/, "").split("/").pop();
    const productId = slugToProductId(catalogSlug);
    if (!productId) return;
    const img = $(a).find("img").first();
    let src = img.attr("src") || img.attr("data-src") || "";
    if (!src) return;
    if (!src.startsWith("http")) src = `https://masialux.com${src.startsWith("/") ? "" : "/"}${src}`;
    if (!map.has(productId)) map.set(productId, src);
  });

  return map;
}

function replaceServeUrls(content, imageMap) {
  let updated = 0;
  const serveRe = /https:\/\/masialux\.com\/admin\/images\/serve\/\d+/g;
  const newContent = content.replace(
    /listImagePath: "https:\/\/masialux\.com\/admin\/images\/serve\/\d+"/g,
    (match) => {
      const idMatch = match.match(/id: "([^"]+)"/);
      return match;
    }
  );

  // Per-product replacement using id on same line
  const lines = content.split("\n");
  const out = lines.map((line) => {
    const idMatch = line.match(/id: "(mo-[^"]+)"/);
    const serveMatch = line.match(/https:\/\/masialux\.com\/admin\/images\/serve\/\d+/);
    if (!idMatch || !serveMatch) return line;
    const productId = idMatch[1];
    const newUrl = imageMap.get(productId);
    if (!newUrl) return line;
    if (line.includes(serveMatch[0])) {
      updated++;
      return line.replace(serveMatch[0], newUrl);
    }
    return line;
  });

  return { text: out.join("\n"), updated };
}

function replaceImagesArrayFirst(content, imageMap) {
  let updated = 0;
  const keyRe = /"outdoor\/(mo-[^"]+)":\s*\{[^}]*images:\s*\["(https:\/\/masialux\.com\/admin\/images\/serve\/\d+)"/g;
  const newContent = content.replace(keyRe, (full, productId, oldUrl) => {
    const newUrl = imageMap.get(productId);
    if (!newUrl || newUrl === oldUrl) return full;
    updated++;
    return full.replace(oldUrl, newUrl);
  });
  return { text: newContent, updated };
}

async function main() {
  const imageMap = await fetchCatalogMap();
  console.log("Catalog products with images:", imageMap.size);

  const productsPath = join(ROOT, "data/products.ts");
  const detailsPath = join(ROOT, "data/productDetails.ts");

  let products = readFileSync(productsPath, "utf8");
  let details = readFileSync(detailsPath, "utf8");

  const p1 = replaceServeUrls(products, imageMap);
  products = p1.text;
  console.log("products.ts serve replacements:", p1.updated);

  const d1 = replaceServeUrls(details, imageMap);
  details = d1.text;
  console.log("productDetails.ts serve replacements:", d1.updated);

  const d2 = replaceImagesArrayFirst(details, imageMap);
  details = d2.text;
  console.log("productDetails.ts images[0] replacements:", d2.updated);

  const missing = [];
  for (const line of products.split("\n")) {
    if (!line.includes("admin/images/serve")) continue;
    const m = line.match(/id: "(mo-[^"]+)"/);
    if (m && !imageMap.has(m[1])) missing.push(m[1]);
  }
  if (missing.length) console.log("No catalog image for:", missing.join(", "));

  writeFileSync(productsPath, products);
  writeFileSync(detailsPath, details);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
