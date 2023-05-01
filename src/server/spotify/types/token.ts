import { z } from "zod";
import { spotifyScopes } from "../scopes";

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split(" ");
    }
    return val;
  }, z.array(z.enum(spotifyScopes))),
  expires_in: z.number(),
  refresh_token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
