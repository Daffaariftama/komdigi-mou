"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="bg-white p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
            <Image
              src="/komdigi-logo.png"
              alt="Logo Komdigi"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-500">
            Masuk untuk mengelola data kerja sama
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-slate-200 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 border shadow-sm outline-none transition-all placeholder:text-slate-400"
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-slate-200 px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 border shadow-sm outline-none transition-all placeholder:text-slate-400"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
