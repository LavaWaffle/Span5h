import { createTRPCRouter } from "./trpc";
import { spanDictRouter } from "./routers/spanishDict";
import { wordRefRouter } from "./routers/wordRef";
import { span5Router } from "./routers/span5";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  spanDict: spanDictRouter,
  wordRef: wordRefRouter,
  span5: span5Router
});

// export type definition of API
export type AppRouter = typeof appRouter;
