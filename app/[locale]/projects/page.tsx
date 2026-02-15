import { setRequestLocale } from "next-intl/server";
import ProjectPortfolio from "@/components/ProjectPortfolio";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24 pb-16">
      <ProjectPortfolio />
    </div>
  );
}
