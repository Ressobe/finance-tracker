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
      <body className="antialiased">
        <main className="h-screen w-full flex flex-col items-center justify-start my-12">
          {children}
        </main>
      </body>
    </html>
  );
}
