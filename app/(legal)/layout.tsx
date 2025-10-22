import "@/app/globals.css";
import React from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/widget/back-to-top";
import { getLandingPage } from "@/services/page";

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const page = await getLandingPage('en');

  return (
    <NextIntlClientProvider messages={messages} locale="en">
      <div className="min-h-screen bg-background flex flex-col">
        <Header header={page.landing.header} />
        <main className="flex-1">
          <div className="mdContainer text-md max-w-3xl mx-auto leading-loose pt-12 pb-16 px-8 prose prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground dark:prose-headings:text-foreground prose-p:text-muted-foreground dark:prose-p:text-muted-foreground prose-strong:text-foreground dark:prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-li:text-muted-foreground dark:prose-li:text-muted-foreground">
            {children}
          </div>
        </main>
        <Footer footer={page.landing.footer} />
        <BackToTop />
      </div>
    </NextIntlClientProvider>
  );
}
