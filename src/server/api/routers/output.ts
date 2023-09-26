import { z } from "zod";
import { transferNFT } from "~/utils/nft";
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
        outputAddress: z.string(),
        sellToAddress: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await transferNFT({
        nftAddress: input.outputAddress,
        toOwner: input.sellToAddress,
      });
      if (result.response.signature) {
        await ctx.db.activity.create({
          data: {
            ActivityId: "SELL",
            outputId: input.outputId,
            sellToAddress: input.sellToAddress,
          },
        });
        // @todo transfer nft in blockchain
        await ctx.db.output.update({
          where: { id: input.outputId },
          data: {
            status: "SELL",
            owner: input.sellToAddress,
          },
        });
        return result.response.signature;
      }
      return null;
    }),
  maintain: publicProcedure
    .input(
      z.object({
        outputId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.activity.create({
        data: { ActivityId: "MAINTENANCE", ...input },
      });
      await ctx.db.output.update({
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
    .mutation(async ({ ctx, input }) => {
      await ctx.db.activity.create({
        data: { ActivityId: "COMPLETE", outputId: input.outputId },
      });
      if (input.owner === null) {
        await ctx.db.output.update({
          where: { id: input.outputId },
          data: {
            status: "STOCK",
          },
        });
      } else {
        await ctx.db.output.update({
          where: { id: input.outputId },
          data: {
            status: "SELL",
          },
        });
      }
    }),
});
