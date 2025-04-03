import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/context/GSAPContext";
import AdminStyles from "@/components/AdminStyles";
import { OverlayProvider } from "@/context/OverlayContext";
import { Theme } from "@radix-ui/themes";
import QueryProvider from "@/lib/queryclient";
import { CartProvider } from "@/context/CartContext";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { GoogleTagManager } from "@next/third-parties/google";

import { LenisProvider } from "@/context/LenisContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Arvan",
  description:
    "Our Top Selling Products · LOOK WHITE · LIFE IS GOOD · A4 WHITE · A4 BLACK · FANCY · LOOK (SKY BLUE ) · JUNGLE WALKER · RED DRAGON.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "The Arvan",
    description:
      "Our Top Selling Products · LOOK WHITE · LIFE IS GOOD · A4 WHITE · A4 BLACK · FANCY · LOOK (SKY BLUE ) · JUNGLE WALKER · RED DRAGON",
    url: "thearvan.com",
    siteName: "The Arvan",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" className="dark">
        <head>
          <meta name="color-scheme" content="dark" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProvider>
            <Theme>
              <AdminStyles />

              <LenisProvider>
                <GSAPProvider>
                  <OverlayProvider>
                    <CartProvider>{children}</CartProvider>
                    <Toaster />
                  </OverlayProvider>
                </GSAPProvider>
              </LenisProvider>
            </Theme>
          </QueryProvider>
          <GoogleTagManager
            gtmId={
              process.env.NEXT_PUBLIC_GTM_ID
                ? process.env.NEXT_PUBLIC_GTM_ID
                : ""
            }
          />
        </body>
      </html>
    </SessionProvider>
  );
}
