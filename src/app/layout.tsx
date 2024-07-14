import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { APP_LONG_DESCRIPTION, APP_NAME } from "@/config";
import NextTopLoader from "nextjs-toploader";
import { Navbar } from "@/components/navbar";
import { LOGO } from "@/config";
import { Open_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_LONG_DESCRIPTION,
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={openSans.className}>
      <link rel="icon" href={LOGO} sizes="any" />
      <body className="flex flex-col min-h-screen">
        <NextTopLoader color="#34d399" showSpinner={false} />
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-10 gap-y-32">
          <SessionProvider session={session}>{children}</SessionProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
