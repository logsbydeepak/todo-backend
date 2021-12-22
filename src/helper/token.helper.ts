import { sign, verify } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/env.config";

export const accessTokenGenerator = (id: number) =>
  sign({ id }, ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });

export const refreshTokenGenerator = (id: number) =>
  sign({ id }, REFRESH_TOKEN_SECRET as string, { expiresIn: "30d" });

export const accessTokenValidator = (token: string) => {
  try {
    return verify(token, ACCESS_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return "TokenExpiredError";
    }
    return null;
  }
};

export const refreshTokenValidator = (token: string) => {
  try {
    return verify(token, REFRESH_TOKEN_SECRET as string);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return "TokenExpiredError";
    }
    return null;
  }
};
