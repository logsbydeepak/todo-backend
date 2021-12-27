import { NextFunction, Request, Response } from "express";
import ms from "ms";

import {
  accessTokenGenerator,
  accessTokenValidator,
  refreshTokenValidator,
} from "@helper/token";

import { validateEmpty } from "@helper/validator";
import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@helper/cookie";
import { ErrorResponse, SuccessResponse } from "@response";
import { TokenModelType, TokenValidatorType } from "@types";
import { generateDecryption, generateEncryption } from "@helper/security";
import {
  dbCreateToken,
  dbReadAccessToken,
  dbReadTodo,
  dbReadToken,
  dbTokenExist,
  dbUserExist,
} from "@helper/db";
import { TokenModel } from "@model";

export const updateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = validateEmpty(req.cookies.accessToken);
    const refreshToken = validateEmpty(req.cookies.refreshToken);

    await dbTokenExist({ accessToken });
    await dbTokenExist({ refreshToken });

    const accessTokenDecryption = generateDecryption(accessToken);
    const refreshTokenDecryption = generateDecryption(refreshToken);

    const accessTokenData: TokenValidatorType = accessTokenValidator(
      accessTokenDecryption
    );
    const refreshTokenData: TokenValidatorType = refreshTokenValidator(
      refreshTokenDecryption
    );

    if (accessTokenData !== "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 11);
    }
    if (refreshTokenData === "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 12);
    }

    await dbUserExist(refreshTokenData.id);

    if (
      refreshTokenData.exp <= ms("29d") &&
      refreshTokenData.refreshTokenCount > 4
    ) {
      const newDbToken: TokenModelType = dbCreateToken(refreshTokenData.id);
      newDbToken.save();

      setAccessTokenCookie(res, newDbToken.accessToken);
      setRefreshTokenCookie(res, newDbToken.refreshToken);
      return SuccessResponse(req, res, "AU", 16);
    }

    if (accessTokenData === "TokenExpiredError") {
      const accessTokenRaw = accessTokenGenerator(refreshTokenData.id);
      const accessTokenEncrypt = generateEncryption(accessTokenRaw);

      const dbToken: TokenModelType = await dbReadAccessToken(accessToken);
      dbToken.accessToken = accessTokenEncrypt;
      await dbToken.save();

      setAccessTokenCookie(res, accessTokenEncrypt);
      return SuccessResponse(req, res, "AU", 16);
    }

    const dbToken = await dbReadToken({ accessToken });
    await TokenModel.deleteMany({ owner: dbToken.owner });

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);
    return ErrorResponse(req, res, "TP", 11);
  } catch (error: any) {
    return next(error);
  }
};
