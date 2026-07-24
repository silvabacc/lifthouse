import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdStyledComponentsRegistry from "./components/antd";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Lifthouse",
    template: "%s | Lifthouse",
  },
  description:
    "A workout tracker for the modern lifter — plan workouts, log sets, run 5/3/1, and track meals and bodyweight.",
  applicationName: "Lifthouse",
  appleWebApp: {
    capable: true,
    title: "Lifthouse",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Lifthouse",
    description: "A workout tracker for the modern lifter",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The app is used mid-workout; accidental pinch-zoom on inputs is a
  // common annoyance, but we keep user zoom enabled for accessibility.
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
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
