import { NODE_ENV } from "@config/env";
import { CookieOptions, Response } from "express";

const defaultConfig: CookieOptions = {
  httpOnly: true,
  maxAge: 3600000 * 90,
  secure: NODE_ENV === "prod",
  sameSite: NODE_ENV === "prod" ? "none" : false,
};

export const setAuthCookie = (res: Response): Response =>
  res.cookie("auth", "true", {
    ...defaultConfig,
    path: "/",
    httpOnly: false,
  });

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

export const removeAuthCookie = (res: Response): Response =>
  res.clearCookie("auth", {
    ...defaultConfig,
    path: "/",
    httpOnly: false,
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
