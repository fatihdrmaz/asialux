import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPost, blogPosts } from "@/data/blog";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link
          href={locale === "tr" ? "/blog" : `/${locale}/blog`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Blog
        </Link>
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        <time className="text-gray-500 text-sm">
          {new Date(post.date).toLocaleDateString("tr-TR")}
        </time>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-950 mt-2 mb-6">
          {post.title}
        </h1>
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p className="lead">{post.excerpt}</p>
          <p>
            Asialux olarak premium aydınlatma çözümleri sunarken, sektördeki gelişmeleri
            ve en iyi uygulamaları takip ediyoruz. Bu yazıda ilgili konu hakkında
            detaylı bilgi ve öneriler paylaşıyoruz.
          </p>
          <p>
            Ürün kataloğumuz ve proje çözümlerimiz için iletişime geçebilirsiniz.
            Uzman ekibimiz size özel teklif ve teknik destek sunmaktan mutluluk duyar.
          </p>
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
