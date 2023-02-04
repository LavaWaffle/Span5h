import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { spanWebScrape } from "../../../utils/spanScrape";

export const spanDictRouter = createTRPCRouter({
  conjugate: publicProcedure
    .input(z.object({ verb: z.string() }))
    .query(async ({ input }) => {
      return spanWebScrape(input.verb);
    })
});
