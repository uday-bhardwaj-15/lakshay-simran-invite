import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isha & Yash — Wedding Invitation",
  description: "Cordially invite you to celebrate the wedding of Isha and Yash.",
  openGraph: {
    type: "website",
    title: "Isha & Yash — Wedding Invitation",
    description: "Cordially invite you to celebrate the wedding of Isha and Yash.",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
