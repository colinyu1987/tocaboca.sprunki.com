import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BackToHomeButton from "@/components/page/not-found/BackToHomeButton";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: "noindex, nofollow",
};

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-background m-0 p-0">
      {/* 404 数字 */}
      <h1 className="text-7xl font-extrabold text-foreground leading-none z-10 m-0">
        404
      </h1>

      {/* 标题和描述 */}
      <div className="flex flex-col gap-6 items-center mt-6 z-10">
        <h2 className="text-2xl font-bold text-foreground m-0">
          {t("metadata.site_name")}
        </h2>

        <div className="max-w-3xl text-muted-foreground text-base leading-6 text-center">
          {t("not-found.404_description")}
        </div>

        {/* 返回首页按钮 */}
        <BackToHomeButton />
      </div>
    </div>
  );
}