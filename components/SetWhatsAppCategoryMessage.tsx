"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useWhatsAppMessage } from "@/contexts/WhatsAppMessageContext";

type Props = { categoryName: string };

/** Kategori sayfasında mount edildiğinde floating WhatsApp butonunun mesajını sadece kategori adıyla günceller; unmount'ta sıfırlar. */
export default function SetWhatsAppCategoryMessage({ categoryName }: Props) {
  const ctx = useWhatsAppMessage();
  const t = useTranslations("productDetail");

  useEffect(() => {
    if (!ctx) return;
    const message = t("whatsappCategoryOnly", { categoryName });
    ctx.setProductMessage(message);
    return () => ctx.setProductMessage(null);
  }, [categoryName, ctx, t]);

  return null;
}
