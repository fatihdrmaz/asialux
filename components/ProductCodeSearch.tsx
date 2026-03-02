"use client";

import { useState, FormEvent, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface ProductCodeSearchProps {
  /** Arama sayfasında mevcut sorguyu göster */
  initialQuery?: string;
  /** Form gönderildikten sonra (popup kapatma vb.) */
  onSubmitSuccess?: () => void;
  /** Input'a otomatik odaklan (popup açıldığında) */
  autoFocus?: boolean;
}

export default function ProductCodeSearch({ initialQuery = "", onSubmitSuccess, autoFocus }: ProductCodeSearchProps) {
  const t = useTranslations("products");
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const basePath = locale === "tr" ? "" : `/${locale}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSubmitSuccess?.();
    router.push(`${basePath}/products/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchByCodePlaceholder")}
            autoFocus={autoFocus}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            aria-label={t("searchByCode")}
          />
        </div>
        <button
          type="submit"
          className="btn-primary shrink-0 flex items-center justify-center gap-2 px-6 py-3"
        >
          <Search className="w-5 h-5" aria-hidden />
          {t("searchByCodeButton")}
        </button>
      </div>
    </form>
  );
}
