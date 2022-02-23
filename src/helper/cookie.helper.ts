import { NODE_ENV } from "@config/env";
import { CookieOptions, Response } from "express";

import { AUTH_COOKIE_DOMAIN } from "@config/env";

const defaultConfig: CookieOptions = {
  httpOnly: true,
  maxAge: 86400000 * 90,
  secure: NODE_ENV === "prod",
  sameSite: NODE_ENV === "prod" ? "none" : false,
};

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string
): Response =>
  res.cookie("accessToken", accessToken, { ...defaultConfig, path: "/v1" });

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
): Response =>
  res.cookie("refreshToken", refreshToken, {
    ...defaultConfig,
    path: "/v1/session/refresh",
  });

export const removeAccessTokenCookie = (res: Response): Response =>
  res.clearCookie("accessToken", {
    ...defaultConfig,
    path: "/v1",
  });

export const removeRefreshTokenCookie = (res: Response): Response =>
  res.clearCookie("refreshToken", {
    ...defaultConfig,
    path: "/v1/session/refresh",
  });
