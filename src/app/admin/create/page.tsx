"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { ArrowLeft, Save, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CreateAgreement() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState<string | null>(null);
  const { data: countries } = api.reference.getCountries.useQuery();
  const { data: mitras } = api.reference.getMitras.useQuery();
  const { data: statuses } = api.reference.getStatuses.useQuery();

  const createMutation = api.cooperation.create.useMutation({
    onSuccess: () => {
      router.push("/admin");
      router.refresh();
    },
    onError: (e) => {
      setLoading(false);
      alert("Gagal menyimpan data: " + e.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("documentValue") as File;

    let dokumen = undefined;

    if (file && file.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = (await res.json()) as { success: boolean; url: string };
        if (data.success) {
          dokumen = {
            nama_file: file.name,
            file_path: data.url,
          };
        }
      } catch {
        alert("Upload failed");
        setLoading(false);
        return;
      }
    }

    const inputData = {
      judul_kerjasama: formData.get("judul_kerjasama") as string,
      id_negara: formData.get("id_negara") as string,
      id_mitra: Number(formData.get("id_mitra")),
      id_status: Number(formData.get("id_status")),
      satuan_kerja: formData.get("satuan_kerja") as string,
      topik: formData.get("topik") as string,
      keterangan: formData.get("keterangan") as string,
      tanggal_pengesahan: formData.get("tanggal_pengesahan") ? new Date(formData.get("tanggal_pengesahan") as string) : undefined,
      dokumen,
    };

    createMutation.mutate(inputData);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Tambah Kerja Sama Baru</h1>
          <p className="text-slate-500 mt-1">Lengkapi formulir di bawah ini untuk menambahkan data kerja sama.</p>
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
                  <input name="judul_kerjasama" type="text" required placeholder="Contoh: MoU Indonesia - Singapura digital economy..." className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Negara Mitra <span className="text-red-500">*</span></label>
                    <select name="id_negara" required className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer">
                      <option value="">Pilih Negara...</option>
                      {countries?.map(c => <option key={c.id_negara} value={c.id_negara}>{c.nama_negara}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Instansi Mitra <span className="text-red-500">*</span></label>
                    <select name="id_mitra" required className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer">
                      <option value="">Pilih Mitra...</option>
                      {mitras?.map(m => <option key={m.id_counterpart} value={m.id_counterpart}>{m.nama_counterpart}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Topik Kerja Sama</label>
                    <input name="topik" type="text" placeholder="Contoh: Cybersecurity, AI..." className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Satuan Kerja</label>
                    <input name="satuan_kerja" type="text" placeholder="Unit kerja terkait..." className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Keterangan Tambahan</h2>
              <div>
                <textarea name="keterangan" rows={5} placeholder="Tambahkan ringkasan atau detail penting mengenai kerja sama ini..." className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400 leading-relaxed"></textarea>
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
                  <select name="id_status" required className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer">
                    {statuses?.map(s => <option key={s.id_status_naskah} value={s.id_status_naskah}>{s.nama_status}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Pengesahan</label>
                  <input name="tanggal_pengesahan" type="date" className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-all" />
                  <p className="text-xs text-slate-400 mt-1">Biarkan kosong jika belum disahkan.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Unggah Dokumen</h2>
              <div
                className={`relative group flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-all cursor-pointer hover:bg-slate-50 ${filename ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300'}`}
              >
                <input
                  id="file-upload"
                  name="documentValue"
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFilename(e.target.files[0].name);
                    }
                  }}
                />

                {filename ? (
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600 animate-bounce">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1 max-w-[200px]">{filename}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">File siap diunggah</p>
                    <span className="mt-4 text-xs font-semibold text-blue-600 group-hover:underline">Klik untuk mengganti</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-slate-700"><span>Upload PDF</span> atau drag & drop</p>
                    <p className="text-xs text-slate-400 mt-1">Maksimal ukuran 10MB</p>
                  </div>
                )}
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
            disabled={loading || createMutation.isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:shadow-none transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading || createMutation.isPending ? "Menyimpan Data..." : (
              <>
                <Save className="h-4 w-4" /> Simpan Kerja Sama
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
