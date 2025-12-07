import { z } from "zod";
import { type Prisma } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const cooperationRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          countryId: z.string().optional(),
          statusId: z.number().optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      const where: Prisma.KerjasamaWhereInput = {
        AND: [
          input?.search
            ? {
              OR: [
                { judul_kerjasama: { contains: input.search } },
                { topik: { contains: input.search } },
              ],
            }
            : {},
          input?.countryId ? { id_negara: input.countryId } : {},
          input?.statusId ? { id_status: input.statusId } : {},
        ],
      };

      return ctx.db.kerjasama.findMany({
        where,
        include: {
          Negara: true,
          Mitra: true,
          Status: true,
          Dokumens: true,
        },
        orderBy: { tanggal_pengesahan: "desc" },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const cooperation = await ctx.db.kerjasama.findUnique({
        where: { id_kerjasama: input.id },
        include: {
          Negara: true,
          Mitra: true,
          Status: true,
          Dokumens: true,
        },
      });
      return cooperation;
    }),

  create: protectedProcedure
    .input(
      z.object({
        id_negara: z.string(),
        id_mitra: z.number(),
        id_status: z.number(),
        judul_kerjasama: z.string(),
        satuan_kerja: z.string().optional(),
        topik: z.string().optional(),
        tanggal_pengesahan: z.date().optional(),
        keterangan: z.string().optional(),
        dokumen: z
          .object({
            nama_file: z.string(),
            file_path: z.string(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { dokumen, ...data } = input;
      return ctx.db.kerjasama.create({
        data: {
          ...data,
          Dokumens: dokumen
            ? {
              create: {
                nama_file: dokumen.nama_file,
                file_path: dokumen.file_path,
              },
            }
            : undefined,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        id_negara: z.string().optional(),
        id_mitra: z.number().optional(),
        id_status: z.number().optional(),
        judul_kerjasama: z.string().optional(),
        satuan_kerja: z.string().optional(),
        topik: z.string().optional(),
        tanggal_pengesahan: z.date().optional(),
        keterangan: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.kerjasama.update({
        where: { id_kerjasama: id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.kerjasama.delete({
        where: { id_kerjasama: input.id },
      });
    }),
});
