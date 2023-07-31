import { publicProcedure, router } from "@server/app";
import { AxiosInstance } from "axios";
import { z } from "zod";
import { PlayerStateSchema } from "./schemas/state";

export function createPlayerStateRoutes(r: typeof router, api: AxiosInstance) {
  return r({
    getPlayerState: publicProcedure.query(async ({ ctx }) => {
      const response = await api.get<unknown>("/me/player", {
        headers: {
          Authorization: `Bearer ${ctx.session?.user?.accessToken}`,
        },
      });
      const playerState = PlayerStateSchema.parse(response.data);
      return playerState;
    }),
    transferPlaypack: publicProcedure
      .input(z.object({ deviceIds: z.array(z.string()).length(1) }))
      .mutation(async ({ ctx, input }) => {
        const response = await api.put<unknown>(
          "/me/player",
          { device_ids: input.deviceIds },
          {
            headers: {
              Authorization: `Bearer ${ctx.session?.user?.accessToken}`,
            },
          },
        );
        if (response.status === 204) return { ok: true };
        return { ok: false };
      }),
  });
}
