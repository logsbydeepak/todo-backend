import { Response } from "express";

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string
): Response => res.cookie("accessToken", accessToken, { path: "/v1" });

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
): Response =>
  res.cookie("refreshToken", refreshToken, { path: "/v1/session/refresh" });

export const removeAccessTokenCookie = (res: Response): Response =>
  res.clearCookie("accessToken", { path: "/v1" });

export const removeRefreshTokenCookie = (res: Response): Response =>
  res.clearCookie("refreshToken", { path: "/v1/session/refresh" });
