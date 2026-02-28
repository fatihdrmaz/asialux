"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

interface AccordionSection {
  title?: string;
  intro?: string;
  items: string[];
}

interface ProductWarningsAccordionProps {
  mountingTitle?: string;
  importantTitle?: string;
  warrantyTitle?: string;
  mounting?: { intro?: string; items: string[] };
  important?: { items: string[] };
  warranty?: { title?: string; items: string[] };
}

export default function ProductWarningsAccordion({
  mountingTitle,
  importantTitle,
  warrantyTitle,
  mounting,
  important,
  warranty,
}: ProductWarningsAccordionProps) {
  const t = useTranslations("productDetail");
  const [openId, setOpenId] = useState<string | null>("montaj");

  const sections: { id: string; title: string; section: AccordionSection }[] = [];
  if (mounting && mounting.items.length > 0) {
    sections.push({
      id: "montaj",
      title: mountingTitle ?? t("mountingWarnings"),
      section: { intro: mounting.items[0], items: mounting.items.slice(1) },
    });
  }
  if (important && important.items.length > 0) {
    sections.push({
      id: "onemli",
      title: importantTitle ?? t("importantWarnings"),
      section: { items: important.items },
    });
  }
  if (warranty && warranty.items.length > 0) {
    sections.push({
      id: "garanti",
      title: warranty.title ?? warrantyTitle ?? t("warrantyTerms"),
      section: { items: warranty.items },
    });
  }

  if (sections.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="divide-y divide-gray-100">
        {sections.map(({ id, title, section }) => {
          const isOpen = openId === id;
          return (
            <div key={id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : id)}
                className="w-full flex items-center justify-between gap-4 py-5 px-6 md:px-8 text-left hover:bg-gray-50/80 transition-colors"
                aria-expanded={isOpen}
              >
                <h2 className="text-lg font-display font-bold text-dark-950">
                  {title}
                </h2>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? "max-h-[2000px]" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-700 text-sm leading-relaxed">
                  {section.intro && (
                    <p className="mb-3 font-medium text-dark-800">{section.intro}</p>
                  )}
                  <ul className="space-y-2 list-disc list-inside">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
