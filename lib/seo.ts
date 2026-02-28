import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n";

const DEFAULT_SITE_URL = "https://asialux.com.tr";

/** Production site base URL (no trailing slash) */
export function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof process.env.VERCEL_URL === "string" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return DEFAULT_SITE_URL;
}

/**
 * Path without leading slash and without locale prefix.
 * Examples: "", "products", "about", "products/ray-spot/mr-1001", "blog/led-aydinlatma-trendleri-2025"
 */
export function getAlternates(path: string, currentLocale: string): Metadata["alternates"] {
  const base = getBaseUrl();
  const canonicalPath = path ? `/${path}` : "";
  const localesWithPaths: { locale: string; path: string }[] = locales.map((loc) => ({
    locale: loc,
    path: loc === "tr" ? canonicalPath : `/${loc}${canonicalPath}`,
  }));

  return {
    canonical: `${base}${localesWithPaths.find((l) => l.locale === currentLocale)?.path || canonicalPath}`,
    languages: Object.fromEntries(
      localesWithPaths.map(({ locale, path }) => [locale, `${base}${path}`])
    ) as Record<string, string>,
  };
}

/** Build full URL for a path and locale (path without leading slash, optional trailing slash) */
export function getLocaleUrl(path: string, locale: Locale): string {
  const base = getBaseUrl();
  const segment = path ? `/${path}` : "";
  const localeSegment = locale === "tr" ? "" : `/${locale}`;
  return `${base}${localeSegment}${segment}`;
}
