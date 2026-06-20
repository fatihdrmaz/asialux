#!/usr/bin/env node
/**
 * public/images altındaki raster görselleri YERİNDE optimize eder.
 *
 * Tasarım ilkeleri:
 *  - Aynı yol & uzantı korunur (.jpg → .jpg) → products.ts / productDetails.ts /
 *    scraped JSON içindeki hiçbir yol kırılmaz, custom loader gerekmez.
 *  - Sadece ağır dosyalara dokunur (JPEG > JPEG_FLOOR, PNG > PNG_FLOOR) → hızlı + idempotent:
 *    optimize edilmiş dosyalar bir sonraki çalıştırmada eşiğin altına düşüp atlanır.
 *  - MAX_WIDTH üstündeki görseller küçültülür (büyütme asla yapılmaz).
 *  - Çıktı yalnızca anlamlı ölçüde küçükse (SAVE_RATIO) yazılır → tekrar tekrar
 *    çalıştırmak kaliteyi bozmaz.
 *
 * Kullanım:
 *   node scripts/optimize-images.mjs            # optimize et
 *   node scripts/optimize-images.mjs --dry-run  # sadece raporla, yazma
 *
 * Gerekli: npm i -D sharp
 */
import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../../public/images");

const MAX_WIDTH = 1920;          // üst sınır (katalog 800px, hero banner'lar FHD'ye kadar)
const JPEG_QUALITY = 78;         // mozjpeg kalitesi — katalog fotoğrafları için dengeli
const JPEG_FLOOR = 150 * 1024;   // yalnızca bundan büyük JPEG'lere dokun
const PNG_FLOOR = 300 * 1024;    // yalnızca bundan büyük PNG'lere dokun
const SAVE_RATIO = 0.9;          // yeni boyut ≤ eskinin %90'ı ise yaz
const DRY = process.argv.includes("--dry-run");

const EXTS = new Set([".jpg", ".jpeg", ".png"]);

let touched = 0;
let skipped = 0;
let resized = 0;
let before = 0;
let after = 0;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
const mb = (n) => `${(n / 1048576).toFixed(1)}MB`;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;

  const size = (await stat(file)).size;
  const floor = ext === ".png" ? PNG_FLOOR : JPEG_FLOOR;
  if (size < floor) continue; // zaten yeterince hafif → dokunma (idempotent)

  try {
    const input = await readFile(file);
    let pipeline = sharp(input, { failOn: "none" });
    const meta = await pipeline.metadata();

    let didResize = false;
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      didResize = true;
    }

    const output =
      ext === ".png"
        ? await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 8 }).toBuffer()
        : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

    before += size;

    if (output.length <= size * SAVE_RATIO) {
      after += output.length;
      touched++;
      if (didResize) resized++;
      const tag = didResize ? ` [${meta.width}px→${MAX_WIDTH}px]` : "";
      console.log(`  ${kb(size)} → ${kb(output.length)}${tag}  ${path.relative(ROOT, file)}`);
      if (!DRY) await writeFile(file, output);
    } else {
      after += size; // değişmedi
      skipped++;
    }
  } catch (err) {
    console.warn(`  ! atlandı ${path.relative(ROOT, file)}: ${err.message}`);
  }
}

console.log(
  `\n${DRY ? "[dry-run] " : ""}Optimize edilen: ${touched} dosya (${resized} küçültüldü), ${skipped} zaten verimli.`
);
console.log(`Ağır küme: ${mb(before)} → ${mb(after)}  (kazanç ${mb(before - after)})`);
