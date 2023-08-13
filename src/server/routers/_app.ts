import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      // sleep 2 seconds
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            greeting: `hello ${opts.input.text}`,
          });
        }, 2000);
      });
    }),
});

export type AppRouter = typeof appRouter;
