#!/usr/bin/env node
/**
 * Masialux ürün sayfalarından detay çeker.
 * Kullanım:
 * 1. scripts/masialux-product-urls.txt dosyasına her satıra bir ürün linki yaz (örn. https://masialux.com/urun/ray-spot-luca-serisi-mr-1001/)
 * 2. node scripts/sync-masialux-details.mjs
 * 3. Oluşan data/productDetailsScraped.json, getProductDetail içinde mevcut detayla birleştirilir.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DEFAULT_URLS_FILE = join(ROOT, "scripts", "masialux-product-urls.txt");
const URLS_FILE = process.argv[2] ? join(ROOT, process.argv[2].startsWith("scripts/") ? process.argv[2] : "scripts/" + process.argv[2]) : DEFAULT_URLS_FILE;
const OUT_FILE = join(ROOT, "data", "productDetailsScraped.json");
const MERGE_WITH_EXISTING = URLS_FILE !== DEFAULT_URLS_FILE;

/** URL'den kategori ve ürün id'si çıkar: .../urun/ray-spot-luca-serisi-mr-1001/ → { categorySlug: 'ray-spot', id: 'mr-1001' } */
function parseProductKey(url) {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    const match = path.match(/\/urun\/([^/]+)/);
    if (!match) return null;
    const slug = match[1];
    if (slug === "__trashed") return { categorySlug: "recessed", id: "from-title" };
    const categorySlug = slug.split("-").slice(0, 2).join("-");
    const idMatch =
      slug.match(/mrm-?\d+(?:-\d+)*/i) ||
      slug.match(/mr-?\d+(?:-\d+)*/i) ||
      slug.match(/ms-?\d+(?:-\d+)*/i) ||
      slug.match(/me-?\d+(?:-\d+)*/i) ||
      slug.match(/md-?\d+(?:-\d+)*/i) ||
      slug.match(/mh-?\d+(?:-\d+)*/i) ||
      slug.match(/mbf-?\d+(?:-\d+)*/i) ||
      slug.match(/mjl-?\d+(?:-\d+)*/i) ||
      slug.match(/mj-?\d+(?:-\d+)*/i) ||
      slug.match(/mk-?\d+(?:-\d+)*/i) ||
      slug.match(/mo-?\d+(?:-\d+)*/i) ||
      slug.match(/mps-?\d+(?:-\d+)*/i) ||
      slug.match(/mp-?\d+(?:-\d+)*/i) ||
      slug.match(/myt-?\d+(?:-\d+)*/i);
    let id = idMatch ? idMatch[0].toLowerCase() : null;
    if (id && /^(mrm|mr|ms|md|mbf|mo)(\d)/.test(id)) id = id.replace(/^(mrm|mr|ms|md|mbf|mo)(\d)/, "$1-$2");
    if (id && /^me-?\d/.test(id)) id = id.replace(/^me-?/, "me-");
    if (id && /^mh-?\d/.test(id)) id = id.replace(/^mh-?/, "md-");
    if (id && /^(mjl|mj|mk|mo|mps|mp|myt)(\d)/.test(id)) id = id.replace(/^(mjl|mj|mk|mo|mps|mp|myt)(\d)/, "$1-$2");
    if (!id) return null;
    let cat = "ray-spot";
    if (/^(mjl|mj|mk|mo|mps|mp|myt)-/.test(id)) cat = "industrial-lighting";
    else if (slug.startsWith("ray-spot")) cat = "ray-spot";
    else if (slug.includes("siva-ustu") || slug.includes("sıva-üstü")) cat = "surface-mounted";
    else if (slug.includes("siva-alti") || slug.includes("sıva-altı") || slug.includes("baffle") || slug.includes("tavan")) cat = "recessed";
    else if (slug.includes("lineer")) cat = "linear";
    else if (slug.includes("magnet")) cat = "magnet";
    else if (slug.includes("endustriyel") || slug.includes("endüstriyel")) cat = "industrial-lighting";
    else if (slug.includes("dis-mekan") || slug.includes("dış-mekan")) cat = "outdoor";
    else if (slug.includes("sarkit") || slug.includes("ozel-koleksiyon-sarkit") || slug.includes("özel-koleksiyon-sarkit")) cat = "pendant";
    else if (slug.includes("abajur") || slug.includes("lambader") || slug.includes("masa-lambasi") || slug.includes("masa-lambası")) cat = "lamp-shade";
    return { categorySlug: cat, id };
  } catch {
    return null;
  }
}

/** "Label : Value" satırlarını parse et */
function parseLabelValueLines(text) {
  const items = [];
  const lines = (text || "").split(/\n/).map((s) => s.trim()).filter(Boolean);
  for (const line of lines) {
    const idx = line.indexOf(" : ");
    if (idx > 0) {
      items.push({ label: line.slice(0, idx).trim(), value: line.slice(idx + 3).trim() });
    }
  }
  return items;
}

/** Label'a göre tekrarları kaldır (ilk geçen kalır) */
function dedupeByLabel(items) {
  if (!items?.length) return items;
  const seen = new Set();
  return items.filter((item) => {
    const k = (item.label || "").trim().toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Ürün özet alanındaki (sidebar) "Label : Value" satırlarını topla – magnet vb. sayfalarda tab dışında olur */
function getSummaryLabelValues($) {
  const items = [];
  const seen = new Set();
  function add(label, value) {
    const k = (label || "").trim().toLowerCase();
    if (!label || !value || label.length > 60 || value.length > 120 || seen.has(k)) return;
    seen.add(k);
    items.push({ label: label.trim(), value: value.trim() });
  }
  const selectors = [".summary", ".woocommerce-product-details__short-description", ".product .summary", "[class*='product-details']"];
  for (const sel of selectors) {
    $(sel).find("p, td, li, div, tr").each((_, el) => {
      const t = $(el).text().trim();
      if (!t || !t.includes(" : ")) return;
      const idx = t.indexOf(" : ");
      const label = t.slice(0, idx).trim();
      const value = t.slice(idx + 3).trim();
      if (/\n/.test(label)) return;
      if (value.includes("\n") && value.includes(" : ")) return;
      add(label, value);
    });
    const fullText = $(sel).text();
    fullText.split(/\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.includes(" : ")) return;
      const idx = trimmed.indexOf(" : ");
      const label = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 3).trim();
      if (label.length < 3 || value.length < 1) return;
      add(label, value);
    });
  }
  return items;
}

/** Teknik özellik etiketleri (Özellikler → features, bunlar → technicalSpecs) */
const TECHNICAL_LABEL_REGEX = /^(IP\s*Koruma|Gerilim|Frekans|Aktif Güç|Lümen|Işık Akısı|CRI|Sürücü|Sürücü Akımı)/i;

function splitFeaturesAndSpecs(items) {
  const features = [];
  const technicalSpecs = [];
  for (const item of items) {
    if (TECHNICAL_LABEL_REGEX.test((item.label || "").trim())) {
      technicalSpecs.push(item);
    } else {
      features.push(item);
    }
  }
  return { features, technicalSpecs };
}

/** Madde işaretli liste satırlarını topla (başında - veya • olan veya <li> içeriği) */
function parseListItems(text) {
  return (text || "")
    .split(/\n/)
    .map((s) => s.replace(/^[\s•\-*]+\s*/, "").trim())
    .filter((s) => s.length > 2);
}

/** HTML'den bölümleri çıkar: başlık metnine göre sonraki içeriği al */
function getSectionText($, headingTexts) {
  const text = [];
  let capture = false;
  $("h1, h2, h3, h4, h5, h6, p, li, div").each((_, el) => {
    const $el = $(el);
    const tag = el.tagName?.toLowerCase();
    const t = $el.text().trim();
    if (tag?.startsWith("h") && headingTexts.some((h) => t.includes(h))) {
      capture = true;
      return;
    }
    if (capture && tag?.startsWith("h") && !headingTexts.some((h) => t.includes(h))) {
      capture = false;
      return false;
    }
    if (capture && t) text.push(t);
  });
  return text.join("\n");
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AsialuxSync/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.text();
}

function scrapeProduct(html, productKey) {
  const $ = cheerio.load(html);
  const result = {
    subtitle: null,
    description: null,
    features: [],
    technicalSpecs: [],
    usageAreas: [],
    downloads: [],
    mountingSafetyWarnings: [],
    importantWarnings: [],
    warrantyTerms: { title: "GARANTİ BELGESİ | Garanti Şartları", items: [] },
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
  };

  const title = $(".product_title, h1.entry-title, h1").first().text().trim();
  if (title) result.name = title;

  const subtitle = $(".summary h5, .woocommerce-product-details__short-description h5, h5").first().text().trim();
  if (subtitle && !/^İNDİRİLEBİLİR|^[A-ZĞÜŞİÖÇ\s]+\|/.test(subtitle)) result.subtitle = subtitle;

  const panel = $("#tab-description, .woocommerce-Tabs-panel--description, [id*='tab-description']").first();
  const sectionMap = {};
  if (panel.length) {
    panel.find("h2, h3, h4, h5, h6").each((_, el) => {
      const $head = $(el);
      const headText = $head.text().trim();
      const $content = $head.nextUntil("h2, h3, h4, h5, h6");
      const content = $content
        .map((_, c) => $(c).text().trim())
        .get()
        .filter(Boolean)
        .join("\n");
      if (headText) sectionMap[headText] = content;
    });
  }
  // Masialux bazen açıklama/teknik özellikleri tab panel dışında veriyor; tüm sayfada h2–h6 bölümlerini tara
  const hasTeknik = Object.keys(sectionMap).some((k) => /TEKNİK|teknik/i.test(k));
  if (!hasTeknik) {
    const fallbackContainers = $(".entry-content, .woocommerce-Tabs-panel, main, #content, .product, [class*='description'], [class*='tab']");
    for (let i = 0; i < fallbackContainers.length; i++) {
      const container = fallbackContainers.eq(i);
      container.find("h2, h3, h4, h5, h6").each((_, el) => {
        const $head = $(el);
        const headText = $head.text().trim();
        const $content = $head.nextUntil("h2, h3, h4, h5, h6");
        const content = $content.map((_, c) => $(c).text().trim()).get().filter(Boolean).join("\n");
        if (headText) sectionMap[headText] = content;
      });
      if (Object.keys(sectionMap).some((k) => /TEKNİK|teknik/i.test(k))) break;
    }
  }

  const getSection = (...keys) => {
    for (const [head, content] of Object.entries(sectionMap)) {
      if (keys.some((k) => head.includes(k) || head.toLowerCase().includes(k.toLowerCase()))) return content;
    }
    return "";
  };

  let aciklama = getSection("Açıklama");
  if (aciklama) {
    const stop = aciklama.indexOf("ÖZELLİKLER");
    if (stop > 0) aciklama = aciklama.slice(0, stop).trim();
    if (aciklama.length < 800) result.description = aciklama.replace(/\s+/g, " ").trim();
  }

  const ozellikler = getSection("ÖZELLİKLER");
  if (ozellikler) {
    result.features = parseLabelValueLines(ozellikler);
    if (result.features.length === 0) {
      const bullets = parseListItems(ozellikler);
      result.features = bullets.map((item) => ({ label: item, value: "" }));
    }
  }

  const teknik = getSection("TEKNİK ÖZELLİKLER");
  if (teknik) result.technicalSpecs = parseLabelValueLines(teknik);
  if (!result.technicalSpecs.length) {
    const teknikText = getSectionText($, ["TEKNİK ÖZELLİKLER", "TEKNIK OZELLIKLER"]);
    if (teknikText) result.technicalSpecs = parseLabelValueLines(teknikText);
  }
  // Magnet vb. sayfalarda özellik/teknik bilgiler ürün özetinde (tab dışında) olabilir
  const summaryItems = getSummaryLabelValues($);
  if (summaryItems.length) {
    const { features: sumFeatures, technicalSpecs: sumSpecs } = splitFeaturesAndSpecs(summaryItems);
    if (sumFeatures.length && !result.features.length) result.features = sumFeatures;
    else if (sumFeatures.length) result.features = dedupeByLabel([...result.features, ...sumFeatures]);
    if (sumSpecs.length && !result.technicalSpecs.length) result.technicalSpecs = sumSpecs;
    else if (sumSpecs.length) result.technicalSpecs = dedupeByLabel([...result.technicalSpecs, ...sumSpecs]);
  }
  result.technicalSpecs = dedupeByLabel(result.technicalSpecs);
  result.features = dedupeByLabel(result.features);

  const kullanim = getSection("KULLANIM ALANLARI");
  if (kullanim) result.usageAreas = parseListItems(kullanim);

  let montaj = getSection("MONTAJ VE GÜVENLİK");
  const raySpotunuzu = getSection("Ray spotunuzu");
  if (raySpotunuzu) montaj = montaj ? `${raySpotunuzu}\n${montaj}` : raySpotunuzu;
  if (montaj) {
    const items = parseListItems(montaj);
    const hasIntro = items.some((s) => /ray spotunuzu/i.test(s));
    result.mountingSafetyWarnings = hasIntro ? items : ["Ray spotunuzu;", ...items];
  }

  const onemli = getSection("ÖNEMLİ UYARILAR");
  if (onemli) result.importantWarnings = parseListItems(onemli);

  let garanti = getSection("GARANTİ BELGESİ", "Garanti Şartları");
  const arizali = getSection("Arızalı ürünü garanti");
  if (arizali) garanti = garanti ? `${garanti}\n${arizali}` : arizali;
  if (garanti) {
    result.warrantyTerms.items = parseListItems(garanti).filter(
      (s) => !/Ray Spot Archives|Masialux Aydınlatma|^https?:/i.test(s)
    );
  }

  const downloadLabels = /^(Datasheet|Kullanım\s*Klavuzu|Kullanım\s*Kılavuzu|2D\s*Çizim|2D\s*ÇİZİM|3D\s*Çizim|3D\s*ÇİZİM|LDT\s*Dosyaları|LDT\s*DOSYALARI)$/i;
  $('a[href*="downloads"], a[href*=".pdf"], a[href*=".zip"]').each((_, a) => {
    const href = $(a).attr("href");
    const label = $(a).text().trim().replace(/\s+/g, " ");
    if (href && label && downloadLabels.test(label)) {
      const url = href.startsWith("http") ? href : `https://masialux.com${href.startsWith("/") ? "" : "/"}${href}`;
      if (!result.downloads.some((d) => d.label === label)) {
        result.downloads.push({ label, url });
      }
    }
  });

  return result;
}

function readUrls(filePath) {
  const content = readFileSync(filePath, "utf-8");
  return content
    .split(/\n/)
    .map((s) => s.replace(/#.*$/, "").trim())
    .filter((s) => s.startsWith("http"));
}

async function main() {
  const urls = readUrls(URLS_FILE);
  if (urls.length === 0) {
    console.log(URLS_FILE, "içinde en az bir URL olmalı.");
    process.exit(1);
  }

  let out = {};
  if (MERGE_WITH_EXISTING) {
    try {
      out = JSON.parse(readFileSync(OUT_FILE, "utf-8"));
      console.log("Mevcut scraped veri yüklendi:", Object.keys(out).length, "ürün; merge modu.");
    } catch {
      console.log("Mevcut scraped dosya yok, sıfırdan yazılacak.");
    }
  }
  for (const url of urls) {
    const key = parseProductKey(url);
    if (!key) {
      console.warn("URL'den id çıkarılamadı:", url);
      continue;
    }
    let mapKey = `${key.categorySlug}/${key.id}`;
    try {
      console.log("Fetching:", mapKey, url);
      const html = await fetchPage(url);
      const scraped = scrapeProduct(html, key);
      // Sayfa başlığındaki model (MR 602-100, MJ 100, MJ 104-300 vb.) yerel id ile eşleşsin
      const titleModelMatch =
        scraped.name &&
        scraped.name.match(/(MRM|MR|MS|MD|MBF|MO|MJL|MJ|MK|MP|MPS|MYT)\s*(\d+(?:-\d+)*)/i);
      const resolvedId = titleModelMatch
        ? titleModelMatch[1].toLowerCase() + "-" + titleModelMatch[2].replace(/\s+/g, "-")
        : key.id;
      if (resolvedId !== key.id) {
        mapKey = `${key.categorySlug}/${resolvedId}`;
      }
      out[mapKey] = { id: resolvedId, categorySlug: key.categorySlug, name: scraped.name, ...scraped };
      await new Promise((r) => setTimeout(r, 800));
    } catch (err) {
      console.warn("Hata:", mapKey, err.message);
    }
  }

  writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), "utf-8");
  console.log("Yazıldı:", OUT_FILE, Object.keys(out).length, "ürün" + (MERGE_WITH_EXISTING ? " (merge)" : ""));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
