import { loggedInProcedure, router } from "@server/app";
import { TRPCError } from "@trpc/server";
import { AxiosInstance, HttpStatusCode } from "axios";
import { z } from "zod";
import { UserDevicesSchema } from "./schemas/device";
import { PlayerStateSchema } from "./schemas/state";

export function createPlayerStateRoutes(r: typeof router, api: AxiosInstance) {
  return r({
    getPlayerState: loggedInProcedure.query(async ({ ctx }) => {
      const response = await api.get<unknown>("/me/player", {
        headers: {
          Authorization: `Bearer ${ctx.user.accessToken}`,
        },
      });
      const playerState = PlayerStateSchema.parse(response.data);
      return playerState;
    }),
    transferPlaypack: loggedInProcedure
      .input(z.object({ deviceIds: z.array(z.string()).length(1) }))
      .mutation(async ({ ctx, input }) => {
        try {
          const response = await api.put<unknown>(
            "/me/player",
            { device_ids: input.deviceIds, play: false },
            {
              headers: {
                Authorization: `Bearer ${ctx.user.accessToken}`,
              },
            },
          );
          if (response.status === HttpStatusCode.NoContent) return { ok: true };
          return { ok: false };
        } catch (error) {
          return { ok: false };
        }
      }),

    getAvailableDevices: loggedInProcedure.query(async ({ ctx }) => {
      const response = await api.get<unknown>("/me/player/devices", {
        headers: {
          Authorization: `Bearer ${ctx.user.accessToken}`,
        },
      });
      if (response.status !== HttpStatusCode.Ok)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to get available devices",
        });

      return UserDevicesSchema.parse(response.data);
    }),
  });
}
