"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText } from "lucide-react";
import clsx from "clsx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/create", label: "Tambah Naskah", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Sidebar - Sticky Position */}
      <aside className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex h-16 items-center border-b border-slate-200 px-6 shrink-0">
          <span className="text-lg font-bold text-slate-900">Admin Panel</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        {/* SignOut Removed as requested */}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
