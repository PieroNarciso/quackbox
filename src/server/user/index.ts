import { Scope } from "../spotify/scopes";

export interface UserSessionData {
  accessToken: string;
  tokenType: string;
  scopes: Scope[];
  expiresIn: number;
  refreshToken: string;
}
