import { NODE_ENV } from "@config/env";
import { Response } from "express";

const hour = 3600000;

export const setAuthCookie = (res: Response): Response =>
  res.cookie("auth", "true", {
    path: "/",
    httpOnly: true,
    secure: NODE_ENV === "prod",
    sameSite: "strict",
    maxAge: 90 * hour,
  });

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string
): Response =>
  res.cookie("accessToken", accessToken, {
    path: "/v1",
    httpOnly: true,
    secure: NODE_ENV === "prod",
    sameSite: "strict",
    maxAge: 90 * hour,
  });

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
): Response =>
  res.cookie("refreshToken", refreshToken, {
    path: "/v1/session/refresh",
    httpOnly: true,
    secure: NODE_ENV === "prod",
    sameSite: "strict",
    maxAge: 90 * hour,
  });

export const removeAccessTokenCookie = (res: Response): Response =>
  res.clearCookie("accessToken", {
    path: "/v1",
    httpOnly: true,
    secure: NODE_ENV === "prod",
    sameSite: "strict",
  });

export const removeRefreshTokenCookie = (res: Response): Response =>
  res.clearCookie("refreshToken", {
    path: "/v1/session/refresh",
    httpOnly: true,
    secure: NODE_ENV === "prod",
    sameSite: "strict",
  });
