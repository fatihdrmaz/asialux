# Görseller – Nereye Hangi Dosyayı Koyacaksınız?

Next.js’te statik dosyalar **proje kökündeki `public`** klasöründen sunulur.  
`public` içindeki bir dosyaya, adres çubuğunda **`/` ile başlayan yol** ile erişilir.

## Klasör yapısı ve kullanım

| Alan | Klasör | Dosya adları | Açıklama |
|------|--------|---------------|----------|
| **Hero** | `public/images/hero/` | `hero.jpg` | Ana sayfa arka plan |
| **Kategori görselleri** | `public/images/categories/` | Aşağıdaki tablo | Ana sayfadaki "Ürün Gruplarımız" kartları |
| **Ürün görselleri** | `public/images/products/` | `1.jpg`, `2.jpg`, … `8.jpg` | Ürünler sayfasındaki her ürün kartı |
| **Uygulama alanları** | `public/images/applications/` | `residential.jpg`, `office.jpg` vb. | Uygulama alanları kartları |
| **Showcase** | `public/images/showcase/` | `01.jpg`, `02.jpg`, `03.jpg` | Premium tasarımlar galerisi |

### Kategori görselleri (ana sayfa – Ürün Gruplarımız)

Şu dosyaları **`public/images/categories/`** içine koyun:

| Dosya adı | Görünen kategori |
|-----------|------------------|
| `ray-spot.jpg` | Ray Spot |
| `surface-mounted.jpg` | Sıva Üstü |
| `recessed.jpg` | Sıva Altı |
| `wall-light.jpg` | Aplik |
| `pendant.jpg` | Sarkıt |
| `outdoor.jpg` | Dış Mekan |
| `linear.jpg` | Linear |
| `magnet.jpg` | Magnet |

### Ürün görselleri (Ürünler sayfası)

Şu dosyaları **`public/images/products/`** içine koyun:

| Dosya adı | Ürün |
|-----------|------|
| `1.jpg` | Ray Spot AR-101 |
| `2.jpg` | Sıva Altı SA-205 |
| `3.jpg` | Sıva Üstü SU-310 |
| `4.jpg` | Aplik AP-450 |
| `5.jpg` | Sarkıt SK-520 |
| `6.jpg` | Dış Mekan DM-680 |
| `7.jpg` | Linear LN-720 |
| `8.jpg` | Magnet MG-850 |

Önerilen boyut: **800×600** veya **1200×900** (kareye yakın oran iyi görünür).

## Hero görselini değiştirmek

1. Yeni arka plan görselinizi şu klasöre koyun:  
   **`public/images/hero/`**
2. Dosyayı şu isimle kaydedin: **`hero.jpg`** (veya `hero.png` / `hero.webp`)
3. Kodda path’i buna göre kullanın: **`/images/hero/hero.jpg`**  
   (Dosya adı farklıysa, path’teki dosya adını da değiştirin.)

Önerilen boyut: en az **1920×1080** (full HD), tercihen **2400×1350** veya daha büyük (hero tam ekran kapladığı için).

## Örnek

- Dosya: `public/images/hero/hero.jpg`
- Tarayıcıda: `http://localhost:3000/images/hero/hero.jpg`
- Kodda: `<Image src="/images/hero/hero.jpg" ... />`

Bu yapıyı kullanarak hero alanını ve diğer görselleri rahatça değiştirebilirsiniz.
