#!/usr/bin/env node
/**
 * Masialux kategori sayfasından tüm ürün linklerini toplar ve
 * scripts/masialux-product-urls.txt dosyasına yazar.
 *
 * Kullanım:
 *   node scripts/collect-masialux-category-urls.mjs
 *   node scripts/collect-masialux-category-urls.mjs "https://masialux.com/urun-category/ray-spot/"
 *
 * Varsayılan: Ray Spot kategorisi (34 ürün, 3 sayfa).
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const BASE_URL = process.argv[2] || "https://masialux.com/urun-category/ray-spot/";
const URLS_FILE = process.argv[3]
  ? join(ROOT, process.argv[3].startsWith("scripts/") ? process.argv[3] : "scripts/" + process.argv[3])
  : join(ROOT, "scripts", "masialux-product-urls.txt");

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AsialuxSync/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

function extractProductLinks(html) {
  const $ = cheerio.load(html);
  const links = new Set();
  $('a[href*="/urun/"]').each((_, a) => {
    const href = $(a).attr("href");
    if (href && href.includes("/urun/") && !href.includes("/urun-category/")) {
      const normalized = href.replace(/\/$/, "");
      links.add(normalized);
    }
  });
  return [...links];
}

function extractPaginationUrls(html, baseUrl) {
  const $ = cheerio.load(html);
  const pages = new Set([baseUrl.replace(/\/$/, "")]);
  $('a[href*="/page/"]').each((_, a) => {
    const href = $(a).attr("href");
    if (href && href.includes("/urun-category/") && href.includes("/page/")) {
      pages.add(href.replace(/\/$/, ""));
    }
  });
  return [...pages];
}

async function main() {
  console.log("Kategori:", BASE_URL);
  const allLinks = new Set();

  const baseNormalized = BASE_URL.replace(/\/$/, "");
  const firstHtml = await fetchPage(BASE_URL);
  const firstLinks = extractProductLinks(firstHtml);
  firstLinks.forEach((u) => allLinks.add(u));
  console.log("Sayfa 1:", firstLinks.length, "ürün");

  let paginationUrls = extractPaginationUrls(firstHtml, BASE_URL).filter((u) => u !== baseNormalized);
  if (paginationUrls.length === 0) {
    const baseWithoutTrailing = baseNormalized;
    paginationUrls = [
      baseWithoutTrailing + "/page/2/",
      baseWithoutTrailing + "/page/3/",
    ];
  }
  for (let i = 0; i < paginationUrls.length; i++) {
    const url = paginationUrls[i];
    try {
      const html = await fetchPage(url);
      const links = extractProductLinks(html);
      if (links.length === 0) break;
      links.forEach((u) => allLinks.add(u));
      console.log("Sayfa", i + 2, ":", links.length, "ürün");
      await new Promise((r) => setTimeout(r, 600));
    } catch (e) {
      console.warn("Sayfa atlandı:", url, e.message);
    }
  }

  // HTML'de link yoksa 8–15. sayfaları dene (çok ürünlü kategoriler için)
  const maxExtraPage = 15;
  for (let p = 8; p <= maxExtraPage; p++) {
    const url = baseNormalized + "/page/" + p + "/";
    try {
      const html = await fetchPage(url);
      const links = extractProductLinks(html);
      if (links.length === 0) break;
      links.forEach((u) => allLinks.add(u));
      console.log("Sayfa", p, ":", links.length, "ürün");
      await new Promise((r) => setTimeout(r, 600));
    } catch (e) {
      break;
    }
  }

  const sorted = [...allLinks].sort();
  const header = `# Masialux ürün sayfası linkleri — collect-masialux-category-urls.mjs ile toplandı
# Kategori: ${BASE_URL}
# Toplam: ${sorted.length} ürün
#
# Güncellemek için: node scripts/collect-masialux-category-urls.mjs "<kategori-url>" [çıktı-dosyası]
# Ardından: node scripts/sync-masialux-details.mjs [urls-dosyası]
#
`;
  writeFileSync(URLS_FILE, header + sorted.map((u) => u + "\n").join(""), "utf-8");
  console.log("Yazıldı:", URLS_FILE, "→", sorted.length, "link");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
