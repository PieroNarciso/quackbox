import { initTRPC } from "@trpc/server";
import { createIsLoggedInMiddleware } from "./user/middleware";

const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

export const loggedInProcedure = t.procedure.use(
  createIsLoggedInMiddleware(middleware),
);
