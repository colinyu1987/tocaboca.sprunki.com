import { Fredoka } from "next/font/google";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fredoka",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 从中间件设置的 header 中获取当前语言
  const headersList = await headers();
  const currentLocale = headersList.get('x-locale') || 'en';

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="gpTPDkEx47SORS9xKDrGyfgpNMLT5G_k3CUZjpgfizM" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fredoka.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
