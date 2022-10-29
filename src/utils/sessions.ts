export type GenericUser<T extends object, K extends keyof T> = Required<
  Pick<T, K>
> &
  Partial<Omit<T, K>>;

export type SessionStore = Map<
  string,
  { sessionId: string; userId: string; valid: boolean }
>;

export const sessions: SessionStore = new Map();

export function getSession(sessionId: string) {
  if (!sessionId) return null;
  const session = sessions.get(sessionId);
  return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string): void {
  const session = sessions.get(sessionId);
  if (session) session.valid = false;
}

export function createSession<T>(user: T extends { id: string } ? T : never) {
  const sessionId = (sessions.entries.length + 1).toString();
  sessions.set(sessionId, { sessionId, userId: user.id, valid: true });
  return sessions.get(sessionId);
}
