#!/usr/bin/env node
/**
 * Masialux arama sayfasından (?s=...) ürün linklerini toplar.
 * Kullanım: node scripts/collect-masialux-search-urls.mjs "MATTIA" [çıktı-dosyası]
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const query = process.argv[2] || "MATTIA";
const outFile = process.argv[3]
  ? join(ROOT, process.argv[3].startsWith("scripts/") ? process.argv[3] : "scripts/" + process.argv[3])
  : join(ROOT, "scripts", "masialux-search-urls.txt");

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
      links.add(href.replace(/\/$/, ""));
    }
  });
  return [...links];
}

async function main() {
  const base = `https://masialux.com/?s=${encodeURIComponent(query)}`;
  const allLinks = new Set();

  for (let p = 1; p <= 3; p++) {
    const url = p === 1 ? base : `${base}&paged=${p}`;
    try {
      const html = await fetchPage(url);
      const links = extractProductLinks(html);
      if (links.length === 0) break;
      links.forEach((u) => allLinks.add(u));
      console.log("Sayfa", p, ":", links.length, "ürün");
      await new Promise((r) => setTimeout(r, 500));
    } catch (e) {
      console.warn(e.message);
      break;
    }
  }

  const sorted = [...allLinks].sort();
  const header = `# Masialux arama: ?s=${query}
# Toplam: ${sorted.length} link
#
`;
  writeFileSync(outFile, header + sorted.map((u) => u + "\n").join(""), "utf-8");
  console.log("Yazıldı:", outFile, "→", sorted.length, "link");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
