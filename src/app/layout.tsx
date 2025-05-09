import NextAuthProvider from "@/providers/NextAuthProvider";
import NuqsProvider from "@/providers/NuqsProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import TokenProvider from "@/providers/TokenProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NuqsProvider>
            <NextAuthProvider>
              <TokenProvider>{children}</TokenProvider>
            </NextAuthProvider>
          </NuqsProvider>
        </ReactQueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
