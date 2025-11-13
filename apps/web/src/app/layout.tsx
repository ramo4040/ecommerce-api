import "../index.css";
import "@/public/styles/tokens.css";
import "./style.css";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
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
  const queryClient = await prefetchUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
            <BorderContainer />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
