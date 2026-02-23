import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import Faq from "@/components/Faq";

type Props = { params: { locale: string } };

export default async function ContactPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <ContactForm />
        <ContactMap />
        <div className="max-w-3xl mx-auto mt-20">
          <Faq />
        </div>
      </div>
    </div>
  );
}
