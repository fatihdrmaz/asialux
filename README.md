# ASIALUX - Premium Lighting Solutions Website

Modern, premium ve ihracat odaklı aydınlatma çözümleri web sitesi.

## Özellikler

- ✨ Modern ve premium tasarım
- 🌍 Çok dilli destek (TR, EN, DE, AR, RU)
- 📱 Tam responsive tasarım
- ⚡ Next.js 14 App Router
- 🎨 Tailwind CSS ile stil
- 🎭 Framer Motion animasyonları
- 🔍 SEO optimizasyonu

## Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Çok dilli destek
- **Framer Motion** - Animasyonlar
- **Lucide React** - İkonlar

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
npm start
```

## Proje Yapısı

```
asialux/
├── app/
│   ├── [locale]/          # Lokalize sayfalar
│   │   ├── page.tsx       # Ana sayfa
│   │   ├── products/      # Ürünler sayfası
│   │   └── contact/       # İletişim sayfası
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global stiller
├── components/            # React bileşenleri
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCategories.tsx
│   ├── Features.tsx
│   ├── Applications.tsx
│   └── ...
├── messages/              # Çeviri dosyaları
│   ├── tr.json
│   ├── en.json
│   ├── de.json
│   ├── ar.json
│   └── ru.json
└── i18n.ts               # i18n yapılandırması
```

## Sayfalar

- **Ana Sayfa** (`/`) - Hero, ürün kategorileri, özellikler, uygulamalar
- **Ürünler** (`/products`) - Ürün kataloğu
- **İletişim** (`/contact`) - İletişim formu ve bilgileri

## Dil Desteği

Site şu dilleri destekler:
- 🇹🇷 Türkçe (varsayılan)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇸🇦 العربية
- 🇷🇺 Русский

## Özelleştirme

### Renkler

Renkler `tailwind.config.ts` dosyasında tanımlanmıştır:
- Primary: Altın/turuncu tonları (ihracat odaklı premium görünüm)
- Dark: Koyu gri tonları

### İçerik

Çeviriler `messages/` klasöründeki JSON dosyalarında düzenlenebilir.

## Lisans

© 2025 ASIALUX. Tüm hakları saklıdır.
