import { sign, verify } from "jsonwebtoken";

import { TokenValidatorType } from "@types";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@config/env";

export const accessTokenGenerator = (id: string): string =>
  sign({ id }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });

export const refreshTokenGenerator = (
  id: string,
  refreshTokenRefreshCount: number
): string =>
  sign({ id, refreshTokenRefreshCount }, REFRESH_TOKEN_SECRET as string, {
    expiresIn: "30d",
  });

export const accessTokenValidator = (token: string): TokenValidatorType => {
  try {
    return verify(token, ACCESS_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return "TokenExpiredError";
    }
    return null;
  }
};

export const refreshTokenValidator = (token: string): TokenValidatorType => {
  try {
    return verify(token, REFRESH_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return "TokenExpiredError";
    }
    return null;
  }
};
