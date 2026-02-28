"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Prism = dynamic(() => import("./Prism"), { ssr: false });

const HERO_IMAGE_LOCAL = "/images/hero/hero.png";
const HERO_IMAGE_FALLBACK = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE_LOCAL);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image – slow zoom for depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src={heroSrc}
            alt={t("imageAlt")}
            fill
            className="object-cover min-w-full min-h-full"
            priority
            quality={90}
            sizes="100vw"
            onError={() => setHeroSrc(HERO_IMAGE_FALLBACK)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-900/50 to-dark-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/40 to-transparent" />
      </div>

      {/* Prism WebGL Effect */}
      <div className="absolute inset-0 z-[1] opacity-90" style={{ width: "100%", height: "100%" }}>
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          transparent={true}
        />
      </div>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 md:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <Sparkles className="w-5 h-5 text-primary-300" />
            <span className="text-primary-200 text-sm font-medium">
              {t("title")}
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-white leading-[1.1] tracking-tight drop-shadow-lg"
          >
            <span className="text-gradient">{t("title")}</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium"
          >
            {t("subtitle")}
          </motion.p>

          {/* Accent line */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: { opacity: 1, scaleX: 1 },
            }}
            transition={{ duration: 0.5 }}
            className="w-24 h-0.5 bg-primary-400 mx-auto mb-10 rounded-full origin-center"
          />

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={locale === 'tr' ? '/products' : `/${locale}/products`}
              className="group btn-primary"
            >
              {t("cta")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={locale === 'tr' ? '/applications' : `/${locale}/applications`}
              className="btn-ghost"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
