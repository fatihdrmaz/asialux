import { getTranslations } from "next-intl/server";
import { blogPosts, getPostContent } from "@/data/blog";
import HomeBlogSectionClient from "./HomeBlogSectionClient";

const LATEST_COUNT = 3;

export default async function HomeBlogSection({
  locale,
}: {
  locale: string;
}) {
  const t = await getTranslations("blog");
  const latest = blogPosts.slice(0, LATEST_COUNT);
  const dateLocale =
    locale === "ar" ? "ar-EG" : locale === "en" ? "en-GB" : "tr-TR";
  const blogHref = locale === "tr" ? "/blog" : `/${locale}/blog`;

  const items = latest
    .map((post) => {
      const content = getPostContent(post, locale);
      if (!content) return null;
      return {
        slug: post.slug,
        date: post.date,
        image: post.image,
        title: content.title,
        excerpt: content.excerpt,
      };
    })
    .filter(Boolean) as { slug: string; date: string; image: string; title: string; excerpt: string }[];

  return (
    <HomeBlogSectionClient
      locale={locale}
      blogHref={blogHref}
      items={items}
      sectionTitle={t("homeSectionTitle")}
      sectionSubtitle={t("subtitle")}
      viewAllLabel={t("viewAll")}
      readMoreLabel={t("readMore")}
      dateLocale={dateLocale}
    />
  );
}
