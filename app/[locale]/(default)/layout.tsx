import { DefaultLayout } from "@/components/layout";
import { ReactNode } from "react";

export default async function DefaultLayoutWrapper({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <DefaultLayout locale={locale}>
      {children}
    </DefaultLayout>
  );
}
