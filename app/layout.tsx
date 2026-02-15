import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asialux - Premium Lighting Solutions",
  description: "Modern tasarım ve üstün kalite ile mekanlarınızı aydınlatın. Profesyonel aydınlatma çözümleri.",
  keywords: "aydınlatma, LED, ray spot, sıva altı, sıva üstü, aplik, sarkıt, dış mekan aydınlatma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
