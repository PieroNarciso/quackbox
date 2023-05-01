import "express-session";
import { UserSessionData } from "../src/server/user";

declare module "express-session" {
  interface SessionData {
    user: UserSessionData;
  }
}
