import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
