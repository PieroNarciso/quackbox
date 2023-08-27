import { z } from "zod"

export const UserDevicesSchema = z.object({
  devices: z.array(
    z.object({
      id: z.string().nullable(),
      is_active: z.boolean(),
      is_private_session: z.boolean(),
      is_restricted: z.boolean(),
      name: z.string(),
      type: z.string(),
      volume_percent: z.number().nullable(),
    })
  )
});

export type UserDevices = z.infer<typeof UserDevicesSchema>;
