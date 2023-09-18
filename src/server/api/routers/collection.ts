import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Collection } from "@prisma/client";
import { mintNFT } from "~/utils/nft";
export const collectionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
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
      const outputs = await ctx.db.output.createMany({
        data: outputData.map((thisOutputData) => {
          return { ...thisOutputData, collectionId: collection.id };
        }),
      });
      return { collection, outputs };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.example.findMany();
  // }),
});
