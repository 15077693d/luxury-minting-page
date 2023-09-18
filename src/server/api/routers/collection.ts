import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { mintNFT } from "~/utils/nft";
export const collectionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        symbol: z.string(),
        description: z.string(),
        numberOfOutput: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // create collection nft
      const { collection: collectionData, output: outputData } = await mintNFT({
        ...input,
      });
      const collection = await ctx.db.collection.create({
        data: { ...input, address: collectionData.address },
      });
      await ctx.db.output.createMany({
        data: outputData.map((thisOutputData) => {
          return { ...thisOutputData, collectionId: collection.id };
        }),
      });
      const outputs = await ctx.db.output.findMany({
        where: {
          collectionId: collection.id,
        },
      });
      await ctx.db.activity.createMany({
        data: outputs.map((output) => {
          return { outputId: output.id };
        }),
      });
      return { collection, outputs };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.collection.findMany();
  }),
});
