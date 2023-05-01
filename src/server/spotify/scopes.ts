export const spotifyScopes = [
  // Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  // Playlists
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",

  // Follow
  "user-follow-modify",
  "user-follow-read",

  // Listening History
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",

  // Library
  "user-library-modify",
  "user-library-read",
] as const

export type Scope = typeof spotifyScopes[number]
