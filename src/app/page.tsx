"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Search, Calendar, FileText, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Home() {
  const [search, setSearch] = useState("");
  const [countryId, setCountryId] = useState("");
  const [statusId, setStatusId] = useState<number | undefined>(undefined);

  const { data: agreements, isLoading } = api.cooperation.getAll.useQuery({
    search: search || undefined,
    countryId: countryId || undefined,
    statusId: statusId,
  });

  const { data: countries } = api.reference.getCountries.useQuery();
  const { data: statuses } = api.reference.getStatuses.useQuery();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-28 bg-gradient-to-br from-white via-slate-50 to-blue-50/40">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-sm font-semibold text-blue-600 mb-6 backdrop-blur-sm ring-1 ring-blue-100">
                <Globe className="h-4 w-4 mr-2" />
                Global Digital Cooperation
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                Membangun <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Diplomasi Digital</span> untuk Masa Depan.
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Platform terintegrasi untuk pengelolaan kerja sama internasional, dokumen perjanjian, dan inisiatif digital Komdigi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    const element = document.getElementById('agreements-list');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex justify-center items-center px-6 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                  Lihat List MoU
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Cari perjanjian, topik..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white/80 backdrop-blur-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 mt-12 lg:mt-0 relative hidden lg:block">
              {/* Illustration / Card Composition */}
              <div className="relative mx-auto w-full max-w-[500px]">
                {/* Background Blurs for Illustration */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse animation-delay-1000"></div>

                {/* Card 1 */}
                <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-100 z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                      ID
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Indonesia x Singapore</h4>
                      <p className="text-sm text-slate-500">Digital Economy Agreement</p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full mb-2 overflow-hidden">
                    <div className="h-2 bg-blue-500 rounded-full w-3/4 animate-[width_2s_ease-in-out]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-4">
                    <span>Status: <span className="text-green-600 font-medium">Aktif</span></span>
                    <span>2024</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100 z-0 transform -rotate-2 translate-y-[-20px] translate-x-4 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                      US
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">United States</h4>
                      <p className="text-sm text-slate-500">Cybersecurity MoU</p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full mb-2 overflow-hidden">
                    <div className="h-2 bg-purple-500 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Steps Section - "Just three easy steps" style */}
      <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
        {/* Aesthetic Blobs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Dashboard Informasi</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Monitor Kerja Sama Digital</h2>
            <p className="mt-4 text-slate-600">Mudah mencari, memantau, dan mengelola dokumen kerja sama internasional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-200 group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Cari Data</h3>
              <p className="text-slate-600 leading-relaxed">Temukan naskah perjanjian berdasarkan negara, topik, atau kata kunci dengan cepat.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-200 group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileText className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Lihat Detail</h3>
              <p className="text-slate-600 leading-relaxed">Akses informasi lengkap, status pengesahan, dan unduh dokumen naskah resmi.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-slate-200 group">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Calendar className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Pantau Progres</h3>
              <p className="text-slate-600 leading-relaxed">Monitoring status implementasi dari inisiatif hingga pengesahan dan pelaksanaan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="agreements-list" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Aesthetic Blobs */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Daftar Perjanjian Terbaru</h2>
              <p className="text-slate-500 mt-2 text-lg">Menampilkan data kerja sama dari berbagai negara.</p>
            </div>

            {/* Filters UI */}
            <div className="flex flex-wrap gap-3">
              <select
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow h-11 cursor-pointer hover:border-blue-400"
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
              >
                <option value="">Semua Negara</option>
                {countries?.map((c) => (
                  <option key={c.id_negara} value={c.id_negara}>
                    {c.nama_negara}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow h-11 cursor-pointer hover:border-blue-400"
                value={statusId ?? ""}
                onChange={(e) => setStatusId(e.target.value ? Number(e.target.value) : undefined)}
              >
                <option value="">Semua Status</option>
                {statuses?.map((s) => (
                  <option key={s.id_status_naskah} value={s.id_status_naskah}>
                    {s.nama_status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid Layout */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-slate-50 h-72 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agreements?.map((item) => (
                <div
                  key={item.id_kerjasama}
                  className="bg-white rounded-3xl p-7 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 hover:border-blue-100 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700 font-bold text-sm uppercase tracking-wider group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        {item.Negara.nama_negara.substring(0, 2)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.Status.nama_status === 'Sudah Disahkan' ? 'bg-green-100 text-green-700' :
                        item.Status.nama_status === 'Inisiasi' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {item.Status.nama_status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.judul_kerjasama}
                    </h3>

                    <div className="flex items-center text-xs font-medium text-slate-500 mb-5">
                      <Globe className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      <span className="text-slate-600 mr-2">{item.Mitra.nama_counterpart}</span>
                      <span className="mx-2 text-slate-300">|</span>
                      <span>{item.topik ?? "Umum"}</span>
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                      {item.keterangan ?? "Tidak ada keterangan ringkas untuk kerja sama ini."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <span className="text-xs font-medium text-slate-400 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {item.tanggal_pengesahan ? format(new Date(item.tanggal_pengesahan), "d MMM yyyy", { locale: id }) : "Belum disahkan"}
                    </span>
                    <Link href={`/agreement/${item.id_kerjasama}`} className="text-sm font-bold text-blue-600 flex items-center hover:text-blue-700 group/link">
                      Detail <ArrowRight className="h-4 w-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
