import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdStyledComponentsRegistry from "./components/antd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // avoids FOIT -> smoother load
  weight: ["400", "500", "600", "700"], // load the weights you actually use
  variable: "--font-inter", // expose a CSS var for Tailwind & AntD
});

export const metadata: Metadata = {
  title: "Lifthouse",
  description: "A workout tracker for the modern lifter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdStyledComponentsRegistry>
          {children}
          <Analytics />
          <SpeedInsights />
        </AntdStyledComponentsRegistry>
      </body>
    </html>
  );
}
