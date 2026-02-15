"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Newsletter from "./Newsletter";

export default function Footer() {
  const t = useTranslations("footer");
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
              Premium aydınlatma çözümleri ile mekanlarınızı dönüştürün. 
              Modern tasarım ve üstün kalite ile ihracat odaklı hizmet.
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
              <li>
                <Link href={locale === 'tr' ? '/projects' : `/${locale}/projects`} className="hover:text-white transition-colors">
                  {t("projects")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t("products")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href={locale === 'tr' ? '/products' : `/${locale}/products`} className="hover:text-white transition-colors">
                  Ray Spot
                </Link>
              </li>
              <li>
                <Link href={locale === 'tr' ? '/products' : `/${locale}/products`} className="hover:text-white transition-colors">
                  Sıva Altı
                </Link>
              </li>
              <li>
                <Link href={locale === 'tr' ? '/products' : `/${locale}/products`} className="hover:text-white transition-colors">
                  Sıva Üstü
                </Link>
              </li>
              <li>
                <Link href={locale === 'tr' ? '/products' : `/${locale}/products`} className="hover:text-white transition-colors">
                  Dış Mekan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+902124340000" className="hover:text-white transition-colors">
                  +90 212 434 00 00
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@asialux.com.tr" className="hover:text-white transition-colors">
                  info@asialux.com.tr
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
