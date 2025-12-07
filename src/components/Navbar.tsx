"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";

// ... (imports)

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl transition-all supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/komdigi-logo.png" alt="Komdigi Logo" width={40} height={40} className="h-10 w-auto" />
            <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Bridge Komdigi
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-slate-600"
                )}
              >
                {link.label}
              </Link>
            ))}

            {session ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <Link
                  href="/admin"
                  className="text-sm font-medium text-slate-900 hover:text-blue-600 flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => void signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition-all hover:bg-slate-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "text-base font-medium transition-colors hover:text-blue-600",
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-slate-600"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-slate-100 my-2"></div>

            {session ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-base font-medium text-slate-900 hover:text-blue-600"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard Admin
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    void signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 text-base font-medium text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 py-3 text-sm font-medium text-white shadow-md"
              >
                <LogIn className="h-4 w-4" />
                Login Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
