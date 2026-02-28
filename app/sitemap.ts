import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { locales } from "@/i18n";
import { PRODUCT_CATEGORY_IDS, allProducts } from "@/data/products";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  const staticPaths = ["", "products", "about", "contact", "blog", "applications"];

  for (const locale of locales) {
    const localePath = locale === "tr" ? "" : `/${locale}`;
    for (const path of staticPaths) {
      const url = path ? `${base}${localePath}/${path}` : `${base}${localePath || "/"}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.9,
      });
    }
  }

  for (const locale of locales) {
    const localePath = locale === "tr" ? "" : `/${locale}`;
    for (const categorySlug of PRODUCT_CATEGORY_IDS) {
      entries.push({
        url: `${base}${localePath}/products/${categorySlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  for (const locale of locales) {
    const localePath = locale === "tr" ? "" : `/${locale}`;
    for (const p of allProducts) {
      entries.push({
        url: `${base}${localePath}/products/${p.categorySlug}/${p.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  for (const locale of locales) {
    const localePath = locale === "tr" ? "" : `/${locale}`;
    for (const post of blogPosts) {
      entries.push({
        url: `${base}${localePath}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
