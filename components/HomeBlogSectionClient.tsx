"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type HomeBlogItem = {
  slug: string;
  date: string;
  image: string;
  title: string;
  excerpt: string;
};

type Props = {
  locale: string;
  blogHref: string;
  items: HomeBlogItem[];
  sectionTitle: string;
  sectionSubtitle: string;
  viewAllLabel: string;
  readMoreLabel: string;
  dateLocale: string;
};

export default function HomeBlogSectionClient({
  locale,
  blogHref,
  items,
  sectionTitle,
  sectionSubtitle,
  viewAllLabel,
  readMoreLabel,
  dateLocale,
}: Props) {
  return (
    <section className="py-section md:py-section-lg bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-950">
            {sectionTitle}
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post, index) => {
            const href =
              locale === "tr"
                ? `/blog/${post.slug}`
                : `/${locale}/blog/${post.slug}`;
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary-200 transition-all duration-300 card-hover"
              >
                <Link href={href} className="block flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString(dateLocale)}
                    </time>
                    <h3 className="text-lg font-bold text-dark-950 mt-2 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 mt-auto text-primary-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                      {readMoreLabel}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={blogHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary-500/30"
          >
            {viewAllLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
