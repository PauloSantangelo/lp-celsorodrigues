import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Landing Page | VD Negócios",
  description:
    "Transforme sua empresa em uma franquia de sucesso com a consultoria e método da VD Negócios.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <head>
        {/* RD Station Tracking Code */}
        <Script
          id="rdstation-tracking"
          strategy="afterInteractive"
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/cca803e1-a2e7-48e5-87b7-afdb00eec8ef-loader.js"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
