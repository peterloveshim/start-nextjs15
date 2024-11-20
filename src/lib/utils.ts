import crypto from "crypto";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMysqlPassword = (password: string): string => {
  const sha1Hash1 = crypto.createHash("sha1");
  const sha1Hash2 = crypto.createHash("sha1");

  const hash1Pw = sha1Hash1.update(password, "utf-8").digest();
  const hash2Pw = sha1Hash2.update(hash1Pw).digest("hex").toUpperCase();
  return `*${hash2Pw}`;
};

export const fetchErrorHandler = (response: Response): void => {
  // 401로 에러 메시지 시작하는 것 중요 fix
  if (response.status === 401) throw new Error("401, 인증 에러");
  if (response.status === 404) throw new Error("404, Not found");
  if (response.status === 500) throw new Error("500, internal server error");
  throw new Error(`${response.status} Error`);
};
