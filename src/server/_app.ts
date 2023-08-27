import { procedure, router } from "./trpc";

export const appRouter = router({
  hello: procedure.query(() => {
    return { greeting: "Hello" };
  }),
});

export type AppRouter = typeof appRouter;
