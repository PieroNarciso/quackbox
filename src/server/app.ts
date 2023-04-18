import express from "express";
import ViteExpress from "vite-express";
import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return `Hello ${input}`;
  }),

  example: t.procedure.input(z.string().optional()).query(async (opts) => {
    const { input } = opts;
    return `Hello ${input || 'equisde'}`;
  }),
});

export type AppRouter = typeof appRouter;

const app = express();

app.get("/hello", (_, res) => {
  res.send("asdfj Hello World!");
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

ViteExpress.listen(app, 3000, () => {
  console.log("Listening on http://localhost:3000");
});
