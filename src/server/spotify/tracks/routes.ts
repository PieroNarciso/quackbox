import { z } from "zod";
import { publicProcedure, router } from "@server/app";
import { AxiosInstance } from "axios";
import { TrackSchema } from "./schemas/track";

export function createTrackRoutes(r: typeof router, api: AxiosInstance) {
  return r({
    getTrack: publicProcedure
      .input(z.string())
      .query(async ({ ctx, input }) => {
        const response = await api.get<unknown>(`tracks/${input}`, {
          headers: {
            Authorization: `Bearer ${ctx.session?.user?.accessToken}`,
          },
        });
        const track = TrackSchema.parse(response.data);
        return track
      }),
  });
}
