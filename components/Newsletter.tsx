"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Loader2 } from "lucide-react";

export default function Newsletter() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setEmail("");
    setStatus("success");
  };

  return (
    <div>
      <h4 className="font-semibold mb-4">{t("newsletter")}</h4>
      <p className="text-gray-400 text-sm mb-4 max-w-xs">{t("newsletterDesc")}</p>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletterPlaceholder")}
            required
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            t("subscribe")
          )}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-primary-400">{t("newsletterSuccess")}</p>
      )}
    </div>
  );
}
