"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Newsletter from "./Newsletter";
import { PRODUCT_CATEGORY_IDS } from "@/data/products";

/** Kategori id (slug) → products.* çeviri anahtarı (camelCase) */
function categoryIdToTranslationKey(id: string): string {
  return id
    .split("-")
    .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");
}

export default function Footer() {
  const t = useTranslations("footer");
  const tProducts = useTranslations("products");
  const locale = useLocale();

  return (
    <footer className="bg-dark-950 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + Newsletter */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div>
            <h3 className="text-2xl font-display font-bold mb-4">ASIALUX</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              {t("description")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/asialux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/asialux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/asialux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Newsletter />
          </div>

          {/* Company / Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("about")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href={locale === 'tr' ? '/about' : `/${locale}/about`} className="hover:text-white transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href={locale === 'tr' ? '/blog' : `/${locale}/blog`} className="hover:text-white transition-colors">
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t("products")}</h4>
            <ul className="space-y-2 text-gray-400">
              {PRODUCT_CATEGORY_IDS.map((categoryId) => {
                const productHref = locale === "tr" ? `/products/${categoryId}` : `/${locale}/products/${categoryId}`;
                const labelKey = categoryIdToTranslationKey(categoryId);
                return (
                  <li key={categoryId}>
                    <Link href={productHref} className="hover:text-white transition-colors">
                      {tProducts(labelKey as any)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line">{t("addressValue")}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+902122440605" className="hover:text-white transition-colors">
                    {t("phoneValue1")}
                  </a>
                  <a href="tel:+905337816505" className="hover:text-white transition-colors">
                    {t("phoneValue2")}
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:bilgi@asialux.com.tr" className="hover:text-white transition-colors">
                  {t("emailValue")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ASIALUX. {t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
