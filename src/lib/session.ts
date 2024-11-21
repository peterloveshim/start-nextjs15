import "server-only";

import { cookies } from "next/headers";

import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(payload.exp * 1000))
    .sign(encodedKey);
}

export async function decrypt(session: string | null | undefined) {
  try {
    if (!session) {
      return null;
    }
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return JSON.parse(JSON.stringify(payload));
  } catch (error) {
    console.log("사용자 정보 디코딩 에러");
    return null;
  }
}

export async function setSession(key: string, data: string, exp: number) {
  const expiresAt = new Date(exp);
  (await cookies()).set(key, data, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function removeSession(key: string) {
  const expiresAt = -1;
  (await cookies()).set(key, "", {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
