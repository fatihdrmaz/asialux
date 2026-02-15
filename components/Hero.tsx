"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LightRays = dynamic(() => import("./LightRays"), { ssr: false });

const HERO_IMAGE_LOCAL = "/images/hero/hero.png";
const HERO_IMAGE_FALLBACK = "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE_LOCAL);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image – Kendi görseliniz: public/images/hero/hero.png veya hero.jpg */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroSrc}
          alt="Premium lighting interior"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
          onError={() => setHeroSrc(HERO_IMAGE_FALLBACK)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-900/50 to-dark-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/30 to-transparent" />
      </div>

      {/* Light Rays WebGL Effect */}
      <div className="absolute inset-0 z-[1]" style={{ width: "100%", height: "100%" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={1.9}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.3}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-primary-500/20 rounded-full border border-primary-500/30"
          >
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-primary-300 text-sm font-medium">
              Premium Lighting Solutions
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white leading-tight">
            {t("title")}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={locale === 'tr' ? '/products' : `/${locale}/products`}
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-600/50"
            >
              {t("cta")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={locale === 'tr' ? '/#applications' : `/${locale}#applications`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
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
