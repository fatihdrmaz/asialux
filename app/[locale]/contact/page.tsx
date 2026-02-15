import { setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            İletişim
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Projeleriniz için profesyonel destek alın
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
