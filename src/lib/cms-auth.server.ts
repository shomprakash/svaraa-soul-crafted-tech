import { createHash, timingSafeEqual } from "node:crypto";

function digest(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

/** Timing-safe check of the editor's user ID and password. Missing configuration never matches. */
export function credentialsMatch(user: string, password: string, expectedUser: string | undefined, expectedPassword: string | undefined) {
  if (!expectedUser || !expectedPassword) return false;
  const userOk = timingSafeEqual(digest(user.trim().toLowerCase()), digest(expectedUser.trim().toLowerCase()));
  const passOk = timingSafeEqual(digest(password), digest(expectedPassword));
  return userOk && passOk;
}
