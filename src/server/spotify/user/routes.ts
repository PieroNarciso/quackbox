import { TRPCError } from "@trpc/server";
import { AxiosInstance } from "axios";
import { z } from "zod";
import { router, loggedInProcedure } from "../../app";
import { UserProfileSchema } from "./schemas/profile";
import { TopItemsResponseSchema } from "./schemas/top-items";

export function createUserRoutes(r: typeof router, api: AxiosInstance) {
  return r({
    userSessionStatus: loggedInProcedure.query(async ({ ctx }) => {
      return {
        oauth: ctx.user.accessToken,
      };
    }),

    userProfile: loggedInProcedure.query(async ({ ctx }) => {
      const res = await api.get<unknown>("/me", {
        headers: {
          Authorization: `Bearer ${ctx.user.accessToken}`,
        },
      });
      const result = UserProfileSchema.safeParse(res.data);
      if (!result.success) {
        console.log(result.error.format());
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to respond with user profile",
        });
      }
      return result.data;
    }),

    userTopItems: loggedInProcedure
      .input(
        z.object({
          type: z.enum(["artists", "tracks"]),
          timeRange: z
            .enum(["short_term", "medium_term", "long_term"])
            .optional(),
          limit: z.number().gte(0).lte(50).optional(),
          offset: z.number().gte(0).optional(),
        })
      )
      .query(async ({ input, ctx }) => {
        const res = await api.get<unknown>(`/me/top/${input.type}`, {
          headers: {
            Authorization: `Bearer ${ctx.user.accessToken}`,
          },
          params: {
            ...input,
            type: undefined,
            time_range: input.timeRange,
          },
        });
        const result = TopItemsResponseSchema.safeParse(res.data);
        if (!result.success) {
          console.log(result.error.format());
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to respond with top items",
          });
        }
        return result.data;
      }),
  });
}
