"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n";

const localeNames: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
  ar: "AR",
  ru: "RU",
};

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = (newLocale: Locale) => {
    const pathname = window.location.pathname;
    // Remove current locale from path (if exists)
    let pathWithoutLocale = pathname;
    if (locale !== 'tr') {
      pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    }
    // Add new locale (only if not default 'tr')
    const newPath = newLocale === 'tr' 
      ? pathWithoutLocale || '/'
      : pathWithoutLocale === '/' 
        ? `/${newLocale}` 
        : `/${newLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] overflow-visible transition-all duration-300 min-h-[72px] flex items-center ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-dark-950/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between min-h-[72px] py-3">
          <Link href={locale === 'tr' ? '/' : `/${locale}`} className="flex items-center shrink-0">
            <span className={`text-2xl font-display font-bold ${isScrolled ? "text-primary-600" : "text-primary-400"}`}>
              ASIALUX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={locale === 'tr' ? '/' : `/${locale}`}
              className={`font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`}
            >
              {t("home")}
            </Link>
            <Link
              href={locale === 'tr' ? '/products' : `/${locale}/products`}
              className={`font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`}
            >
              {t("products")}
            </Link>
            <Link
              href={locale === 'tr' ? '/#applications' : `/${locale}#applications`}
              className={`font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`}
            >
              {t("applications")}
            </Link>
            <Link
              href={locale === 'tr' ? '/contact' : `/${locale}/contact`}
              className={`font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`}
            >
              {t("contact")}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center space-x-1 font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`}
              >
                <Globe className="w-5 h-5" />
                <span>{localeNames[locale as Locale]}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => toggleLocale(loc)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                        locale === loc ? "text-primary-600 font-semibold" : "text-gray-700"
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${isScrolled ? "text-gray-700" : "text-gray-200"}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <Link
              href={locale === 'tr' ? '/' : `/${locale}`}
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href={locale === 'tr' ? '/products' : `/${locale}/products`}
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("products")}
            </Link>
            <Link
              href={locale === 'tr' ? '/#applications' : `/${locale}#applications`}
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("applications")}
            </Link>
            <Link
              href={locale === 'tr' ? '/contact' : `/${locale}/contact`}
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => toggleLocale(loc)}
                    className={`px-3 py-1 rounded text-sm ${
                      locale === loc
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
