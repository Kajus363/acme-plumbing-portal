import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = "ph92pJNOxWSTpH2Ds05blKn2FTcIve2D";
const COOKIE_NAME = "acme_session";

export type PortalSession = {
  customerId: string;
  email: string;
  role: "customer" | "staff";
};

export function signSession(session: PortalSession) {
  return jwt.sign(session, JWT_SECRET, { expiresIn: "7d" });
}

export async function readSession(): Promise<PortalSession | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as PortalSession;
  } catch {
    return null;
  }
}

export async function setSessionCookie(session: PortalSession) {
  (await cookies()).set(COOKIE_NAME, signSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
