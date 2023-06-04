import { z } from "zod";

export const UserProfileSchema = z.object({
  country: z.string().optional(),
  display_name: z.string(),
  email: z.string().email().optional(),
  followers: z.object({
    href: z.string().url().nullable(),
    total: z.number(),
  }),
  href: z.string().url(),
  id: z.string(),
  images: z.array(
    z.object({
      height: z.number().nullable(),
      url: z.string().url().optional(),
      width: z.number().nullable(),
    })
  ),
  uri: z.string().url(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
