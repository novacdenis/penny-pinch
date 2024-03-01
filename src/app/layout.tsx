import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/utils";

import "@/styles/index.css";

export const metadata: Metadata = {
  title: "PennyPinch",
  description: "PennyPinch: Track your spending and take control of your finances.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="manifest/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="manifest/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="manifest/favicon-16x16.png" />
        <link rel="manifest" href="manifest/site.webmanifest" />
        <link rel="mask-icon" href="manifest/safari-pinned-tab.svg" color="#2563eb" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="dark">{children}</body>
    </html>
  );
}
