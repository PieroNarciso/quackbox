import express from "express";
import crypto from "crypto";
import path from "path";
import session from "express-session";
import ViteExpress from "vite-express";
import queryString from "query-string";
import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import dotenv from "dotenv";
import axios from "axios";
import { AuthResponseSchema } from "./spotify/types/token";
import { Scope } from "./spotify/scopes";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const createContext = ({
  req,
  res: _res,
}: trpcExpress.CreateExpressContextOptions) => ({
  session: req.session,
});
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

// Routes
import { spotifyApi } from "./axios";
import { createUserRoutes } from "./spotify/user/routes";

const appRouter = t.mergeRouters(createUserRoutes(router, spotifyApi));

export type AppRouter = typeof appRouter;

const app = express();

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/login", (_, res) => {
  const state = crypto.randomUUID();
  const scopes: Scope[] = ["user-library-read", "user-top-read"];

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
    queryString.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scopes.join(" "),
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      state,
    })
  );
});

app.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (state === null) {
    res.redirect("/");
  } else {
    const authToken = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post<unknown>(
      "https://accounts.spotify.com/api/token",
      {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const authData = AuthResponseSchema.parse(response.data);
    req.session.user = {
      accessToken: authData.access_token,
      tokenType: authData.token_type,
      scopes: authData.scope,
      expiresIn: authData.expires_in,
      refreshToken: authData.refresh_token,
    };
    return res.redirect("/app");
  }

  return res.redirect("/");
});

app.get("/refresh_token", async (req, res) => {
  const { refresh_token } = req.query;

  const authToken = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await axios.post<unknown>(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    {
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const authData = AuthResponseSchema.parse(response.data);
  req.session.user = {
    accessToken: authData.access_token,
    tokenType: authData.token_type,
    scopes: authData.scope,
    expiresIn: authData.expires_in,
    refreshToken: authData.refresh_token,
  };
  res.redirect("/app");
});

ViteExpress.listen(app, 3000, () => {
  console.log("Listening on http://localhost:3000");
});
