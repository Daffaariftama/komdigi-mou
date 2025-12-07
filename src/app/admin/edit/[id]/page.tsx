"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function EditAgreement() {
  const router = useRouter();
  const params = useParams();
  const idStr = params.id as string;
  const id = Number(idStr);

  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState<string | null>(null);

  const { data: countries } = api.reference.getCountries.useQuery();
  const { data: mitras } = api.reference.getMitras.useQuery();
  const { data: statuses } = api.reference.getStatuses.useQuery();

  const { data: agreement, isLoading: isLoadingData } = api.cooperation.getById.useQuery(
    { id },
    { enabled: !!id }
  );

  useEffect(() => {
    // Pre-fill filename if exists
    if (agreement && agreement.Dokumens.length > 0) {
      setFilename(agreement.Dokumens[0]!.nama_file);
    }
  }, [agreement]);

  const updateMutation = api.cooperation.update.useMutation({
    onSuccess: () => {
      router.push("/admin");
      router.refresh();
    },
    onError: (e) => {
      setLoading(false);
      alert("Gagal memperbarui data: " + e.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Note: File upload for edit is handled visually but backend integration might differ.
    // For this UI update, we focus on the structure.

    const inputData = {
      id,
      judul_kerjasama: formData.get("judul_kerjasama") as string,
      id_negara: formData.get("id_negara") as string,
      id_mitra: Number(formData.get("id_mitra")),
      id_status: Number(formData.get("id_status")),
      satuan_kerja: formData.get("satuan_kerja") as string,
      topik: formData.get("topik") as string,
      keterangan: formData.get("keterangan") as string,
      tanggal_pengesahan: formData.get("tanggal_pengesahan") ? new Date(formData.get("tanggal_pengesahan") as string) : undefined,
    };

    updateMutation.mutate(inputData);
  };

  if (isLoadingData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-slate-500 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-slate-800">Data Tidak Ditemukan</h2>
        <p className="text-slate-500 mt-2 mb-6">Maaf, data kerja sama yang Anda cari tidak tersedia.</p>
        <Link href="/admin" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Edit Kerja Sama</h1>
          <p className="text-slate-500 mt-1">Perbarui informasi data kerja sama yang sudah ada.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center pb-4 border-b border-slate-100">
                Informasi Utama
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Kerja Sama <span className="text-red-500">*</span></label>
                  <input name="judul_kerjasama" type="text" required defaultValue={agreement.judul_kerjasama} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Negara Mitra <span className="text-red-500">*</span></label>
                    <select name="id_negara" required defaultValue={agreement.id_negara} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer">
                      <option value="">Pilih Negara...</option>
                      {countries?.map(c => <option key={c.id_negara} value={c.id_negara}>{c.nama_negara}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Instansi Mitra <span className="text-red-500">*</span></label>
                    <select name="id_mitra" required defaultValue={agreement.id_mitra} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer">
                      <option value="">Pilih Mitra...</option>
                      {mitras?.map(m => <option key={m.id_counterpart} value={m.id_counterpart}>{m.nama_counterpart}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Topik Kerja Sama</label>
                    <input name="topik" type="text" defaultValue={agreement.topik ?? ""} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Satuan Kerja</label>
                    <input name="satuan_kerja" type="text" defaultValue={agreement.satuan_kerja ?? ""} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Keterangan Tambahan</h2>
              <div>
                <textarea name="keterangan" rows={5} defaultValue={agreement.keterangan ?? ""} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400 leading-relaxed"></textarea>
              </div>
            </div>
          </div>

          {/* Right Column: Status & Document */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Status & Tanggal</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Status Naskah <span className="text-red-500">*</span></label>
                  <select name="id_status" required defaultValue={agreement.id_status} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer">
                    {statuses?.map(s => <option key={s.id_status_naskah} value={s.id_status_naskah}>{s.nama_status}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Pengesahan</label>
                  <input name="tanggal_pengesahan" type="date" defaultValue={agreement.tanggal_pengesahan ? format(new Date(agreement.tanggal_pengesahan), "yyyy-MM-dd") : ""} className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all" />
                  <p className="text-xs text-slate-400 mt-1">Biarkan kosong jika belum disahkan.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Dokumen</h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">File Saat Ini</h4>
                    <p className="text-sm text-slate-600 mt-1 break-all">
                      {filename ?? "Belum ada dokumen yang diunggah."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs text-amber-700 flex items-center gap-2">
                  <span className="font-bold">Info:</span> Untuk saat ini, penggantian dokumen harap dilakukan dengan membuat data baru.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-end items-center gap-4 z-40 md:pl-72 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Link href="/admin" className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading || updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading || updateMutation.isPending ? "Menyimpan Perubahan..." : (
              <>
                <Save className="h-4 w-4" /> Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
