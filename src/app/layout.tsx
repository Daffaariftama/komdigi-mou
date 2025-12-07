import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/Navbar";

export const metadata: Metadata = {
  title: "Bridge Komdigi | Referensi Isu Digital Global",
  description: "Sumber terpadu untuk menavigasi status kerja sama dan isu-isu digital internasional.",
  icons: [{ rel: "icon", url: "/komdigi-logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable}`}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <SessionProvider>
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500">
                <div className="container mx-auto px-4">
                  <p>&copy; {new Date().getFullYear()} Komdigi Bridge System. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

