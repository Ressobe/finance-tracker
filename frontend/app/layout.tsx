import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Finance tracker",
  description: "Finance tracker app created with Next.js and .NET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#00FF00" showSpinner={false} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
