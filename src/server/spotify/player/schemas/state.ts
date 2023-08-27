import { z } from "zod";

export const PlayerStateSchema = z.object({
  device: z
    .object({
      id: z.string().nullable(),
      is_active: z.boolean().optional(),
      is_private_session: z.boolean().optional(),
      is_restricted: z.boolean().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
      volume_percent: z.number().nullable(),
    })
    .optional(),
  repeat_state: z.string(),
  shuffle_state: z.boolean(),
  context: z
    .object({
      type: z.string(),
      href: z.string(),
      external_urls: z.object({ spotify: z.string() }),
      uri: z.string(),
    })
    .optional(),
  timestamp: z.number(),
  progress_ms: z.number(),
  is_playing: z.boolean(),
  item: z
    .object({
      album: z
        .object({
          album_type: z.string(),
          total_tracks: z.number(),
          available_markets: z.array(z.string()),
          external_urls: z.object({ spotify: z.string() }).optional(),
          href: z.string(),
          id: z.string(),
          images: z.array(
            z.object({
              url: z.string(),
              height: z.number(),
              width: z.number(),
            }),
          ),
          name: z.string(),
          release_date: z.string(),
          release_date_precision: z.string(),
          restrictions: z.object({ reason: z.string() }).optional(),
          type: z.string(),
          uri: z.string(),
          copyrights: z
            .array(
              z.object({
                text: z.string().optional(),
                type: z.string().optional(),
              }),
            )
            .optional(),
          external_ids: z
            .object({
              isrc: z.string().optional(),
              ean: z.string().optional(),
              upc: z.string().optional(),
            })
            .optional(),
          genres: z.array(z.string()).optional(),
          label: z.string().optional(),
          popularity: z.number().optional(),
          album_group: z.string().optional(),
          artists: z
            .array(
              z.object({
                external_urls: z.object({ spotify: z.string() }).optional(),
                href: z.string().optional(),
                id: z.string().optional(),
                name: z.string().optional(),
                type: z.string().optional(),
                uri: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      artists: z
        .array(
          z.object({
            external_urls: z.object({ spotify: z.string() }).optional(),
            followers: z
              .object({ href: z.string(), total: z.number() })
              .optional(),
            genres: z.array(z.string()).optional(),
            href: z.string().optional(),
            id: z.string().optional(),
            images: z
              .array(
                z.object({
                  url: z.string().optional(),
                  height: z.number().optional(),
                  width: z.number().optional(),
                }),
              )
              .optional(),
            name: z.string().optional(),
            popularity: z.number().optional(),
            type: z.string().optional(),
            uri: z.string().optional(),
          }),
        )
        .optional(),
      available_markets: z.array(z.string()).optional(),
      disc_number: z.number().optional(),
      duration_ms: z.number().optional(),
      explicit: z.boolean().optional(),
      external_ids: z.object({
        isrc: z.string().optional(),
        ean: z.string().optional(),
        upc: z.string().optional(),
      }),
      external_urls: z.object({ spotify: z.string() }).optional(),
      href: z.string().optional(),
      id: z.string().optional(),
      is_playable: z.boolean().optional(),
      linked_from: z.object({}).optional(),
      restrictions: z.object({ reason: z.string().optional() }).optional(),
      name: z.string().optional(),
      popularity: z.number().optional(),
      preview_url: z.string().optional(),
      track_number: z.number().optional(),
      type: z.string().optional(),
      uri: z.string().optional(),
      is_local: z.boolean().optional(),
    })
    .optional(),
  currently_playing_type: z.string(),
  actions: z.object({
    interrupting_playback: z.boolean().optional(),
    pausing: z.boolean().optional(),
    resuming: z.boolean().optional(),
    seeking: z.boolean().optional(),
    skipping_next: z.boolean().optional(),
    skipping_prev: z.boolean().optional(),
    toggling_repeat_context: z.boolean().optional(),
    toggling_shuffle: z.boolean().optional(),
    toggling_repeat_track: z.boolean().optional(),
    transferring_playback: z.boolean().optional(),
  }),
});

export type PlayerState = z.infer<typeof PlayerStateSchema>;
