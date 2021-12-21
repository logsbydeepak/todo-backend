import { Response } from "express";

export const setAccessTokenCookie = (res: Response, accessToken: string) =>
  res.cookie("accessToken", accessToken, { path: "/v1" });

export const setRefreshTokenCookie = (res: Response, refreshToken: string) =>
  res.cookie("refreshToken", refreshToken, { path: "/v1/session/refresh" });

export const removeAccessTokenCookie = (res: Response) =>
  res.clearCookie("accessToken", { path: "/v1" });

export const removeRefreshTokenCookie = (res: Response) =>
  res.clearCookie("refreshToken", { path: "/v1/session/refresh" });
