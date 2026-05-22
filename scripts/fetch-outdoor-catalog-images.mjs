#!/usr/bin/env node
import * as cheerio from "cheerio";

const CATALOG_URL = "https://masialux.com/katalog/10/dis-mekan-aydinlatma";

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AsialuxSync/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

function normalizeSrc(src) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  if (src.startsWith("//")) return `https:${src}`;
  return `https://masialux.com${src.startsWith("/") ? "" : "/"}${src}`;
}

async function main() {
  const html = await fetchHtml(CATALOG_URL);
  const $ = cheerio.load(html);
  const items = new Map();

  $("a[href*='/urun/']").each((_, a) => {
    const href = $(a).attr("href") || "";
    if (!href.includes("dis-mekan-aydinlatma/mo-")) return;
    const slug = href.replace(/\/$/, "").split("/").pop();
    const img = $(a).find("img").first();
    const src = normalizeSrc(img.attr("src") || img.attr("data-src") || "");
    if (!slug || !src) return;
    if (!items.has(slug)) items.set(slug, { slug, href, src });
  });

  const arr = [...items.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  const mo200entry = arr.find((x) => x.slug.startsWith("mo-200-dis"));
  console.log("mo200", mo200entry);

  const head = mo200entry?.src
    ? await fetch(mo200entry.src, { method: "HEAD" })
    : null;
  console.log("mo200 HEAD", head?.status, head?.headers.get("content-type"));

  console.log(JSON.stringify({ count: arr.length, sample: arr.slice(0, 5) }, null, 2));

  // Test MO 200 product page for additional image sources
  const mo200 = await fetchHtml(
    "https://masialux.com/urun/309/dis-mekan-aydinlatma/mo-200-dis-mekan-aydinlatma"
  );
  const $2 = cheerio.load(mo200);
  const imgs = [];
  $2("img").each((_, img) => {
    const src = normalizeSrc($2(img).attr("src") || "");
    if (src && (src.includes("serve/") || src.includes("uploads"))) imgs.push(src);
  });
  console.log("mo200 imgs", [...new Set(imgs)].slice(0, 8));

  for (const s of arr.map((x) => x.slug).filter((x) => x.includes("249") || x.includes("250"))) {
    console.log("special", s, arr.find((x) => x.slug === s)?.src);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
