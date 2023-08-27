import redisClient from "@/server/redis";
import { Session } from "./session";

redisClient.connect()

export const ServerSession = new Session(redisClient);
