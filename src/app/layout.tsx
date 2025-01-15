import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prysm - Docs",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon/favicon-prysm.ico" sizes="any" />
      </head>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system">
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
