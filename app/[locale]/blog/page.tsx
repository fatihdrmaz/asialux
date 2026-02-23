import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, getPostContent } from "@/data/blog";
import { ArrowRight } from "lucide-react";

type Props = { params: { locale: string } };

export default async function BlogPage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const dateLocale =
    locale === "ar" ? "ar-EG" : locale === "en" ? "en-GB" : "tr-TR";

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-dark-950">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => {
            const content = getPostContent(post, locale);
            if (!content) return null;
            return (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300"
              >
                <Link
                  href={
                    locale === "tr"
                      ? `/blog/${post.slug}`
                      : `/${locale}/blog/${post.slug}`
                  }
                  className="block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={content.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString(dateLocale)}
                    </time>
                    <h2 className="text-xl font-bold text-dark-950 mt-2 mb-2 group-hover:text-primary-600 transition-colors">
                      {content.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {content.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-4 text-primary-600 font-medium text-sm">
                      {t("readMore")} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
