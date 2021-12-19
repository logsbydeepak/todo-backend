import { Response } from "express";

export const setAccessTokenCookie = (res: Response, accessToken: string) =>
  res.cookie("accessToken", accessToken, { path: "/v1" });

export const setRefreshTokenCookie = (res: Response, refreshToken: string) =>
  res.cookie("refreshToken", refreshToken, { path: "/v1/session" });
