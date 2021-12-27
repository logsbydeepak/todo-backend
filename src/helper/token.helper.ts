import { sign, verify } from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@config/env";
import { AccessTokenValidatorType, RefreshTokenValidatorType } from "@types";

export const accessTokenGenerator = (id: string): string =>
  sign({ id }, ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });

export const refreshTokenGenerator = (
  id: string,
  refreshTokenRefreshCount: number
): string =>
  sign({ id, refreshTokenRefreshCount }, REFRESH_TOKEN_SECRET as string, {
    expiresIn: "10000",
  });

export const accessTokenValidator = (
  token: string
): AccessTokenValidatorType => {
  try {
    return verify(token, ACCESS_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return "TokenExpiredError";
    }
    return null;
  }
};

export const refreshTokenValidator = (
  token: string
): RefreshTokenValidatorType => {
  try {
    return verify(token, REFRESH_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return "TokenExpiredError";
    }
    return null;
  }
};
