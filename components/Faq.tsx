"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Minimum sipariş miktarı nedir?",
    a: "Proje büyüklüğüne göre değişmekle birlikte, detaylı bilgi için bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Teslimat süresi ne kadardır?",
    a: "Stok durumuna ve sipariş hacmine bağlı olarak 2-6 hafta arasında değişebilir. Acil projeler için özel çözümler sunuyoruz.",
  },
  {
    q: "İhracat yapıyor musunuz?",
    a: "Evet. Dünya çapında birçok ülkeye ihracat yapıyoruz. Ödeme ve lojistik konularında destek sağlıyoruz.",
  },
  {
    q: "Garanti koşullarınız nelerdir?",
    a: "Ürünlerimiz standart garanti kapsamındadır. Süre ve kapsam ürün grubuna göre değişir.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 border-t border-gray-200">
      <h3 className="text-2xl font-display font-bold text-dark-950 mb-8">
        Sıkça Sorulan Sorular
      </h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-dark-950">{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-gray-500 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-200">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
