import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactiveDbProvider } from "@/lib/db";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sophia Le | VinUni ENGL1030 Interactive React Portfolio",
  description: "VinUniversity ENGL1030 Course Portfolio utilizing Next.js, Convex schema patterns, Tailwind CSS v4, and Framer Motion transitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
    >
      <body className="min-h-full flex flex-col bg-navy-950 text-slate-800 selection:bg-pink-500 selection:text-white">
        <ReactiveDbProvider>
          <Suspense fallback={<div className="h-16" />}>
            <Navigation />
          </Suspense>
          <div className="flex-grow flex flex-col pt-16">
            {children}
          </div>
          <footer className="border-t border-navy-800 bg-navy-950/80 py-6 text-center text-xs text-slate-500">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p>© 2026 Sophia Le. All Rights Reserved.</p>
              <p>VinUni ENGL1030 Academic English Project</p>
            </div>
          </footer>
        </ReactiveDbProvider>
      </body>
    </html>
  );
}
