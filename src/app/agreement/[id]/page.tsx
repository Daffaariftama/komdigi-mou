"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { ArrowLeft, Calendar, Building2, Globe, FileText, Download } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function AgreementDetail() {
  const params = useParams();
  const router = useRouter();

  const idParam = params.id ? Number(params.id) : 0;

  const { data: agreement, isLoading } = api.cooperation.getById.useQuery(
    { id: idParam },
    { enabled: !!idParam }
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-lg font-medium text-slate-600">Perjanjian tidak ditemukan</p>
        <button
          onClick={() => router.back()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section - Light Theme */}
      <div className="bg-white pb-32 pt-20 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Link
            href="/#agreements-list"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar
          </Link>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                <Globe className="mr-1.5 h-3.5 w-3.5" />
                {agreement.Negara.nama_negara}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                {agreement.Status.nama_status}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl leading-tight">
              {agreement.judul_kerjasama}
            </h1>
            <div className="flex items-center gap-6 text-slate-600">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400" />
                {agreement.Mitra.nama_counterpart}
              </span>
              {agreement.tanggal_pengesahan && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {format(new Date(agreement.tanggal_pengesahan), "d MMMM yyyy", { locale: id })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto -mt-24 px-4 relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Keterangan</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>{agreement.keterangan ?? "Tidak ada keterangan detil."}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" />
                Dokumen Naskah
              </h2>

              {agreement.Dokumens.length > 0 ? (
                <div className="space-y-6">
                  {agreement.Dokumens.map((doc) => (
                    <div key={doc.id_dokumen} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{doc.nama_file}</p>
                            <p className="text-sm text-slate-500">PDF Document</p>
                          </div>
                        </div>
                        <a
                          href={doc.file_path}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Unduh
                        </a>
                      </div>
                      {/* PDF Preview */}
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <iframe
                          src={`${doc.file_path}#toolbar=0`}
                          className="h-full w-full"
                          title={doc.nama_file}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <FileText className="h-12 w-12 text-slate-300 mb-3" />
                  <p className="text-slate-500">Belum ada dokumen yang diunggah.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Informasi Tambahan</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-slate-500 mb-1">Satuan Kerja</dt>
                  <dd className="font-medium text-slate-900">{agreement.satuan_kerja ?? "-"}</dd>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <dt className="text-sm text-slate-500 mb-1">Topik Kerja Sama</dt>
                  <dd className="font-medium text-slate-900">{agreement.topik ?? "-"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
