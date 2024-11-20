export type IOtpInfo = {
  value: null | string;
  validUntil: number;
  errMessage: string;
};

export type OtpCodeParams = {
  phone: string;
  valid_until: Date;
};

export type OtpCodeData = {
  phone: string;
  validUntil: number;
};

export type SuccessResponse<T> = {
  result: "success";
  status: number;
  data: T;
};

export type ErrorResponse = {
  result: "error";
  status: number;
  error: {
    message: string;
  };
};

export type SignInOtpParams = {
  email: string;
  password: string;
  otp: string;
};

export type ITokenData = {
  idx: number;
  admin: {
    name: string;
  };
};

export type SignInOtpResponse = {
  authkey: string;
  data: ITokenData;
};
