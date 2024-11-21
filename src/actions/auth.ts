"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt, removeSession, setSession } from "@/lib/session";
import { getMysqlPassword } from "@/lib/utils";
import { ACCESS_TOKEN, USER_INFO } from "@/static";
import { IErrorResponse } from "@/types";
import {
  ErrorResponse,
  OtpCodeData,
  OtpCodeParams,
  SignInOtpParams,
  SignInOtpResponse,
  SuccessResponse,
} from "@/types/auth";

export type SignInParams = {
  email: string;
  password: string;
};

export const sendOtpCode = async ({
  email,
  password,
}: SignInParams): Promise<SuccessResponse<OtpCodeData> | ErrorResponse> => {
  try {
    const hashPw = getMysqlPassword(password);
    const queryString = new URLSearchParams({
      login_id: email,
      login_pw: hashPw,
    });
    const url = `${process.env.API_URL}/api/v1/admin/auth/token?` + queryString;
    const response = await fetch(url);

    if (!response.ok) {
      // API 서버에서 핸들링하지 못하는 서버 요청의 에러인 경우
      // 아래 코드(.json())에서 에러 발생
      const errResponse: IErrorResponse = await response.json();
      // 핸들링 가능한 에러
      return {
        result: "error",
        status: response.status,
        error: {
          message: errResponse.description || errResponse.message,
        },
      };
    }

    const resObj: OtpCodeParams = await response.json();
    const { phone, valid_until } = resObj;

    return {
      result: "success",
      status: response.status,
      data: {
        phone,
        validUntil: new Date(valid_until).getTime(),
      },
    };
  } catch (error) {
    return {
      result: "error",
      status: 500,
      error: { message: "인증 번호 요청 에러" },
    };
  }
};

export const signInWithOtp = async ({
  email,
  password,
  otp,
}: SignInOtpParams): Promise<SuccessResponse<null> | ErrorResponse> => {
  try {
    const hashPw = getMysqlPassword(password);
    const params = { login_id: email, login_pw: hashPw, otp };
    const url = `${process.env.API_URL}/api/v1/admin/auth/token`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      // API 서버에서 핸들링하지 못하는 서버 요청의 에러인 경우
      // 아래 코드(.json())에서 에러 발생
      const errResponse: IErrorResponse = await response.json();
      // 핸들링 가능한 에러
      return {
        result: "error",
        status: response.status,
        error: {
          message: errResponse.description || errResponse.message,
        },
      };
    }

    const resObj: SignInOtpResponse = await response.json();
    const { authkey: accessToken } = resObj;

    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const encryptedData = await encrypt({
      email,
      exp: payload.exp,
      idx: payload.idx,
      name: payload.admin.name,
    });

    await removeAllSessions();

    await setSession(USER_INFO, encryptedData, payload.exp * 1000);
    await setSession(ACCESS_TOKEN, accessToken, payload.exp * 1000);

    return { result: "success", status: response.status, data: null };
  } catch (error) {
    return {
      result: "error",
      status: 500,
      error: { message: "로그인 에러" },
    };
  }
};

type UserSessionData = {
  idx: number;
  email: string;
  name: string;
};

export const getSessionDatas = async (): Promise<{
  accessToken: string | null;
  userInfo: UserSessionData | null;
}> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN);
    const userInfo = cookieStore.get(USER_INFO);

    if (accessToken && userInfo) {
      const decryptedUserInfo: UserSessionData = await decrypt(userInfo.value);
      return {
        accessToken: accessToken.value,
        userInfo: decryptedUserInfo,
      };
    }

    return { accessToken: null, userInfo: null };
  } catch (err) {
    return { accessToken: null, userInfo: null };
  }
};

export const removeAllSessions = async () => {
  await removeSession(USER_INFO);
  await removeSession(ACCESS_TOKEN);
};
