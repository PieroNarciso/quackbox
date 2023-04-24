import { z } from "zod";

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
