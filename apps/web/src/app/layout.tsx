import "../index.css";
import "@/public/styles/tokens.css";
import "./style.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BorderContainer } from "@/components/border-container";
import Providers from "@/components/providers";
import { prefetchUser } from "@/entities/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Korsiya",
  description: "Korsiya",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await prefetchUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <BorderContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
