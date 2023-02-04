import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { fullScrape } from "../../../utils/fullScrape";

export const span5Router = createTRPCRouter({
  conjugate: publicProcedure
    .input(z.object({ verb: z.string() }))
    .query(async ({ input }) => {
      return fullScrape(input.verb);
    })
});
