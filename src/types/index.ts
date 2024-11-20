export type IErrorResponse = {
  code: number;
  message: string;
  description: string;
};

export type SessionPayload = {
  idx: number;
  name: string;
  email: string;
  exp: number;
};
