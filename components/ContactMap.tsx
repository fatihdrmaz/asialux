"use client";

import { useTranslations } from "next-intl";

export default function ContactMap() {
  const t = useTranslations("contact");

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-display font-bold text-dark-950 mb-6">{t("location")}</h3>
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg aspect-video bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24079.553131321598!2d28.971789000000005!3d41.026478!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9297112b487%3A0x93840e0d68faef17!2sAsialux%20Ayd%C4%B1nlatma!5e0!3m2!1str!2str!4v1772242286512!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("mapTitle")}
          className="w-full h-full min-h-[300px]"
        />
      </div>
    </section>
  );
}
