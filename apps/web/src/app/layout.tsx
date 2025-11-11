import "../index.css";
import "@/public/styles/tokens.css";
import "./style.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BorderContainer } from "@/components/border-container";
import Providers from "@/components/providers";
import { AuthStoreProvider } from "@/entities/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "my-better-t-app",
  description: "my-better-t-app",
};

async function getUser() {
  return {
    id: "string",
    email: "string",
    name: "yassir",
    email_verified_at: "2025-11-07T17:03:01.000000Z",
    created_at: "2025-11-07T17:03:01.000000Z",
    updated_at: "2025-11-07T17:03:01.000000Z",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <AuthStoreProvider user={user}>
            <BorderContainer />
            {children}
          </AuthStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
