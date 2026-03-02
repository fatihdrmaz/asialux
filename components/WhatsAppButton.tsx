"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useWhatsAppMessage, DEFAULT_MESSAGE } from "@/contexts/WhatsAppMessageContext";

const WHATSAPP_NUMBER = "905337816505";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const ctx = useWhatsAppMessage();
  const message = ctx?.message ?? DEFAULT_MESSAGE;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:scale-105 transition-all duration-300 p-4"
      aria-label="WhatsApp ile iletişime geç"
    >
      {hovered && (
        <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-200">
          Bize yazın
        </span>
      )}
      <MessageCircle className="w-7 h-7 shrink-0" />
    </a>
  );
}
