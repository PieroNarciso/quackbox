import { middleware } from "../../app";
import { TRPCError } from "@trpc/server";

export const createIsLoggedInMiddleware = (m: typeof middleware) => {
  return m(async (opts) => {
    const { ctx } = opts;

    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    }

    return opts.next({
      ctx: {
        user: ctx.session.user,
      },
    });
  });
};
