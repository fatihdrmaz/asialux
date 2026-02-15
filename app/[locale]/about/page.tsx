import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-dark-950">
          Hakkımızda
        </h1>
        <div className="prose prose-lg text-gray-600 space-y-6">
          <p>
            <strong className="text-dark-950">Asialux</strong>, premium aydınlatma çözümleri
            sunan, modern tasarım ve üstün kalite odaklı bir markadır. Yaşam alanlarından
            ticari mekânlara, dış mekân projelerinden özel tasarım uygulamalarına kadar
            geniş bir yelpazede hizmet veriyoruz.
          </p>
          <p>
            Kaliteli malzemelerden üretilmiş LED ürünlerimiz, düşük enerji tüketimi ve
            uzun ömürleriyle hem çevre dostu hem de ekonomik çözümler sunar. İhracat
            odaklı yapımız sayesinde dünya çapındaki proje ortaklarımıza güvenilir
            tedarik ve teknik destek sağlıyoruz.
          </p>
          <p>
            Misyonumuz, mekânları doğru ve estetik aydınlatma ile dönüştürmek; müşterilerimize
            zamansız tasarımlar ve profesyonel çözüm ortağı olmak için çalışıyoruz.
          </p>
        </div>
      </div>
    </div>
  );
}
