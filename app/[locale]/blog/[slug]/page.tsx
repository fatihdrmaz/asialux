import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPost, blogPosts, getPostContent } from "@/data/blog";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: { locale: string; slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = getPost(slug);
  if (!post) notFound();

  const content = getPostContent(post, locale);
  if (!content) notFound();

  const dateLocale =
    locale === "ar" ? "ar-EG" : locale === "en" ? "en-GB" : "tr-TR";

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link
          href={locale === "tr" ? "/blog" : `/${locale}/blog`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {t("backToBlog")}
        </Link>
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={content.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        <div className="rounded-2xl p-8 md:p-12">
          <time className="text-gray-500 text-sm">
            {new Date(post.date).toLocaleDateString(dateLocale)}
          </time>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-950 mt-2 mb-6">
            {content.title}
          </h1>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="lead font-medium text-dark-800">{content.excerpt}</p>
            {content.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
