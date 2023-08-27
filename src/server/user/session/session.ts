import "server-only";
import { cookies } from "next/headers";

type SessionId = string;

interface Storage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<string | null>;
  del(key: string): void;
}

export class Session {
  constructor(private storage: Storage) {}

  public async get(key: string): Promise<string | null> {
    const sessionId = getSessionId();
    if (!sessionId) {
      return null;
    }
    return this.storage.get(`${sessionId}:${key}`);
  }

  public async set(key: string, value: string) {
    const sessionId = getSessionIdAndCreateIfMissing();
    this.storage.set(`${sessionId}:${key}`, value);
  }

  public async delete(key: string) {
    const sessionId = getSessionId();
    this.storage.del(`${sessionId}:${key}`);
  }
}

function getSessionId(): SessionId | undefined {
  const cookieStore = cookies();
  return cookieStore.get("sessionId")?.value;
}

function setSessionId(sessionId: SessionId): void {
  const cookieStore = cookies();
  cookieStore.set("sessionId", sessionId);
}

function getSessionIdAndCreateIfMissing(): SessionId {
  let sessionId = getSessionId();
  if (!sessionId) {
    const newSessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
    return newSessionId;
  }
  return sessionId;
}
