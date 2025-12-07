import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const referenceRouter = createTRPCRouter({
  getCountries: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.negara.findMany({
      orderBy: { nama_negara: "asc" },
    });
  }),

  getMitras: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.mitra.findMany({
      orderBy: { nama_counterpart: "asc" },
    });
  }),

  getStatuses: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.status.findMany({
      orderBy: { id_status_naskah: "asc" },
    });
  }),
});
