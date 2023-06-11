import { z } from "zod";

export const TrackSchema = z.object({
  album: z.object({
    album_type: z.string(),
    total_tracks: z.number(),
    available_markets: z.array(z.string()),
    external_urls: z.object({ spotify: z.string().optional() }).optional(),
    href: z.string(),
    id: z.string(),
    images: z.array(
      z.object({ url: z.string(), height: z.number(), width: z.number() })
    ),
    name: z.string(),
    release_date: z.string().optional(),
    release_date_precision: z.string(),
    restrictions: z.object({ reason: z.string() }).optional(),
    type: z.string(),
    uri: z.string(),
    copyrights: z
      .array(
        z.object({ text: z.string().optional(), type: z.string().optional() })
      )
      .optional(),
    external_ids: z.object({
      isrc: z.string().optional(),
      ean: z.string().optional(),
      upc: z.string().optional(),
    }).optional(),
    genres: z.array(z.string()).optional(),
    label: z.string().optional(),
    popularity: z.number().optional(),
    album_group: z.string().optional(),
    artists: z.array(
      z.object({
        external_urls: z.object({ spotify: z.string().optional() }).optional(),
        href: z.string().optional(),
        id: z.string().optional(),
        name: z.string().optional(),
        type: z.string().optional(),
        uri: z.string().optional(),
      })
    ),
  }),
  artists: z.array(
    z.object({
      external_urls: z.object({ spotify: z.string() }).optional(),
      followers: z.object({ href: z.string(), total: z.number() }).optional(),
      genres: z.array(z.string()).optional(),
      href: z.string().optional(),
      id: z.string(),
      images: z
        .array(
          z
            .object({
              url: z.string().optional(),
              height: z.number().optional(),
              width: z.number().optional(),
            })
            .optional()
        )
        .optional(),
      name: z.string().optional(),
      popularity: z.number().optional(),
      type: z.string().optional(),
      uri: z.string().optional(),
    })
  ),
  available_markets: z.array(z.string()).optional(),
  disc_number: z.number().optional(),
  duration_ms: z.number().optional(),
  explicit: z.boolean().optional(),
  external_ids: z
    .object({
      isrc: z.string().optional(),
      ean: z.string().optional(),
      upc: z.string().optional(),
    })
    .optional(),
  external_urls: z.object({ spotify: z.string() }),
  href: z.string(),
  id: z.string(),
  is_playable: z.boolean().optional(),
  restrictions: z.object({ reason: z.string().optional() }).optional(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string(),
  track_number: z.number(),
  type: z.string().optional(),
  uri: z.string().optional(),
  is_local: z.boolean().optional(),
});

export type Track = z.infer<typeof TrackSchema>;
