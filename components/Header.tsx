"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n";

const localeNames: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  ar: "العربية",
};

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language menu on click-outside or Escape
  useEffect(() => {
    if (!isLangMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(e.target as Node) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(e.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangMenuOpen(false);
        langButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLangMenuOpen]);

  // Mobile menu: scroll lock + Escape
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);

  const toggleLocale = (newLocale: Locale) => {
    const pathname = window.location.pathname;
    let pathWithoutLocale = pathname;
    if (locale !== "tr") {
      pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    }
    const newPath =
      newLocale === "tr"
        ? pathWithoutLocale || "/"
        : pathWithoutLocale === "/"
          ? `/${newLocale}`
          : `/${newLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
  };

  const linkClass = (scrolled: boolean) =>
    `font-medium transition-colors ${scrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`;

  const localePath = (path: string) =>
    locale === "tr" ? path : `/${locale}${path}`;

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
          <Link
            href={localePath("/")}
            className="flex items-center shrink-0 group"
          >
            <Image
              src="/images/logo-w.webp"
              alt="Asialux"
              width={140}
              height={40}
              className={`h-10 w-auto object-contain transition-all duration-300 group-hover:opacity-90 ${!isScrolled ? "invert" : ""}`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={localePath("/")} className={linkClass(isScrolled)}>
              {t("home")}
            </Link>
            <Link href={localePath("/about")} className={linkClass(isScrolled)}>
              {t("about")}
            </Link>
            <Link href={localePath("/products")} className={linkClass(isScrolled)}>
              {t("products")}
            </Link>
            <Link
              href={locale === "tr" ? "/applications" : `/${locale}/applications`}
              className={linkClass(isScrolled)}
            >
              {t("applications")}
            </Link>
            <Link href={localePath("/blog")} className={linkClass(isScrolled)}>
              {t("blog")}
            </Link>
            <Link href={localePath("/contact")} className={linkClass(isScrolled)}>
              {t("contact")}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                ref={langButtonRef}
                onClick={() => setIsLangMenuOpen((v) => !v)}
                aria-expanded={isLangMenuOpen}
                aria-haspopup="true"
                aria-controls="lang-menu"
                className={`flex items-center space-x-1 font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-200 hover:text-white"}`}
              >
                <Globe className="w-5 h-5" />
                <span>{localeNames[locale as Locale]}</span>
              </button>
              {isLangMenuOpen && (
                <div
                  ref={langMenuRef}
                  id="lang-menu"
                  role="menu"
                  className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      role="menuitem"
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
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`md:hidden ${isScrolled ? "text-gray-700" : "text-gray-200"}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[99] md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed top-[72px] left-0 right-0 bottom-0 z-[100] bg-white overflow-y-auto transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 py-6 space-y-1">
          <Link href={localePath("/")} className="block py-3 text-gray-700 hover:text-primary-600 font-medium" onClick={closeMobileMenu}>
            {t("home")}
          </Link>
          <Link href={localePath("/about")} className="block py-3 text-gray-700 hover:text-primary-600 font-medium" onClick={closeMobileMenu}>
            {t("about")}
          </Link>
          <Link href={localePath("/products")} className="block py-3 text-gray-700 hover:text-primary-600 font-medium" onClick={closeMobileMenu}>
            {t("products")}
          </Link>
            <Link
              href={locale === "tr" ? "/applications" : `/${locale}/applications`}
              className="block py-3 text-gray-700 hover:text-primary-600 font-medium"
              onClick={closeMobileMenu}
            >
            {t("applications")}
          </Link>
          <Link href={localePath("/blog")} className="block py-3 text-gray-700 hover:text-primary-600 font-medium" onClick={closeMobileMenu}>
            {t("blog")}
          </Link>
          <Link href={localePath("/contact")} className="block py-3 text-gray-700 hover:text-primary-600 font-medium" onClick={closeMobileMenu}>
            {t("contact")}
          </Link>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => toggleLocale(loc)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    locale === loc
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
