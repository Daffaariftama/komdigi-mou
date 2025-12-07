"use client";

import { api } from "~/trpc/react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";


export default function AdminDashboard() {

  const utils = api.useUtils();
  const { data: agreements, isLoading } = api.cooperation.getAll.useQuery();

  const deleteMutation = api.cooperation.delete.useMutation({
    onSuccess: async () => {
      await utils.cooperation.getAll.invalidate();
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await deleteMutation.mutateAsync({ id });
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daftar Kerja Sama</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola dokumen dan perjanjian kerja sama.</p>
        </div>
        <Link
          href="/admin/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Tambah Baru
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Judul & Topik</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Mitra & Negara</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Tanggal</th>
              <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">Loading...</td>
              </tr>
            ) : agreements?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                  Belum ada data kerja sama. Silakan tambah baru.
                </td>
              </tr>
            ) : (
              agreements?.map((item) => (
                <tr key={item.id_kerjasama} className="group hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900 line-clamp-1 max-w-xs truncate" title={item.judul_kerjasama}>{item.judul_kerjasama}</span>
                      <span className="text-xs text-slate-500">{item.topik ?? "-"}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-900">{item.Mitra.nama_counterpart}</span>
                      <span className="text-xs text-slate-500">{item.Negara.nama_negara}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-slate-800">
                      {item.Status.nama_status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                    {item.tanggal_pengesahan ? format(new Date(item.tanggal_pengesahan), "d MMM yyyy", { locale: id }) : "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link href={`/agreement/${item.id_kerjasama}`} target="_blank" className="text-slate-400 hover:text-blue-600">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      {/* Edit link - can be implemented later */}
                      <Link href={`/admin/edit/${item.id_kerjasama}`} className="text-slate-400 hover:text-amber-600">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDelete(item.id_kerjasama)} className="text-slate-400 hover:text-red-600" disabled={deleteMutation.isPending}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
