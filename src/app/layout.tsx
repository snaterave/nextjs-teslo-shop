import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home",
  },
  description: "Tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
