import { NextResponse } from "next/server";
import queryString from "query-string";
import { Scope } from "@/server/spotify/scopes";

export async function GET() {
  const state = crypto.randomUUID();
  const scopes: Scope[] = [
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "streaming",
  ];

  NextResponse.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scopes.join(" "),
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state,
      }),
  );
}
