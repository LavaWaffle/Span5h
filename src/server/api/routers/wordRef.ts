import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { wordWebScrape } from "../../../utils/wordScrape";

export const wordRefRouter = createTRPCRouter({
  conjugate: publicProcedure
    .input(z.object({ verb: z.string() }))
    .query(async ({ input }) => {
      return wordWebScrape(input.verb);
    })
});
