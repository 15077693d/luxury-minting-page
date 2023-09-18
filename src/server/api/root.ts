import { collectionRouter } from "~/server/api/routers/collection";
import { createTRPCRouter } from "~/server/api/trpc";
import { outputRouter } from "./routers/output";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  collection: collectionRouter,
  output: outputRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
