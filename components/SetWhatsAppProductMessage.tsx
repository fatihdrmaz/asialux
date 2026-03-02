"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useWhatsAppMessage } from "@/contexts/WhatsAppMessageContext";

type Props = { productName: string; categoryName: string };

/** Ürün sayfasında mount edildiğinde floating WhatsApp butonunun mesajını ürün ve kategori adıyla günceller; unmount'ta sıfırlar. */
export default function SetWhatsAppProductMessage({ productName, categoryName }: Props) {
  const ctx = useWhatsAppMessage();
  const t = useTranslations("productDetail");

  useEffect(() => {
    if (!ctx) return;
    const message = t("whatsappProductWithName", { categoryName, productName });
    ctx.setProductMessage(message);
    return () => ctx.setProductMessage(null);
  }, [categoryName, productName, ctx, t]);

  return null;
}
