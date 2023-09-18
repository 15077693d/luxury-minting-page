import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const outputRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        collectionId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.output.findMany({ where: input });
    }),
  getActivities: publicProcedure
    .input(
      z.object({
        outputId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.activity.findMany({ where: input });
    }),
  transfer: publicProcedure
    .input(
      z.object({
        outputId: z.string(),
        sellToAddress: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.activity.create({
        data: { ActivityId: "SELL", ...input },
      });
      // @todo transfer nft in blockchain
      await ctx.db.output.update({
        where: { id: input.outputId },
        data: {
          status: "SELL",
          owner: input.sellToAddress,
        },
      });
    }),
  maintain: publicProcedure
    .input(
      z.object({
        outputId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      void ctx.db.activity.create({
        data: { ActivityId: "MAINTENANCE", ...input },
      });
      void ctx.db.output.update({
        where: { id: input.outputId },
        data: {
          status: "MAINTENANCE",
        },
      });
    }),
  complete: publicProcedure
    .input(
      z.object({
        owner: z.string().nullable(),
        outputId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      void ctx.db.activity.create({
        data: { ActivityId: "COMPLETE", ...input },
      });
      if (input.owner === null) {
        void ctx.db.output.update({
          where: { id: input.outputId },
          data: {
            status: "STOCK",
          },
        });
      } else {
        void ctx.db.output.update({
          where: { id: input.outputId },
          data: {
            status: "SELL",
          },
        });
      }
    }),
});
