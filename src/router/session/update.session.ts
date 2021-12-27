import ms from "ms";
import { NextFunction, Request, Response } from "express";

import {
  accessTokenGenerator,
  accessTokenValidator,
  refreshTokenValidator,
} from "@helper/token";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@helper/cookie";

import {
  AccessTokenValidatorType,
  RefreshTokenValidatorType,
  TokenModelType,
} from "@types";

import {
  dbCreateToken,
  dbReadAccessToken,
  dbReadToken,
  dbTokenExist,
  dbUserExist,
} from "@helper/db";

import { TokenModel } from "@model";
import { validateEmpty } from "@helper/validator";
import { ErrorResponse, SuccessResponse } from "@response";
import { generateDecryption, generateEncryption } from "@helper/security";

export const updateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken: string = validateEmpty(req.cookies.accessToken);
    const refreshToken: string = validateEmpty(req.cookies.refreshToken);

    await dbTokenExist({ accessToken });
    await dbTokenExist({ refreshToken });

    const accessTokenDecryption: string = generateDecryption(accessToken);
    const refreshTokenDecryption: string = generateDecryption(refreshToken);

    const accessTokenData: AccessTokenValidatorType = accessTokenValidator(
      accessTokenDecryption
    );
    const refreshTokenData: RefreshTokenValidatorType = refreshTokenValidator(
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
      await newDbToken.save();

      setAccessTokenCookie(res, newDbToken.accessToken);
      setRefreshTokenCookie(res, newDbToken.refreshToken);
      return SuccessResponse(req, res, "AU", 16);
    }

    if (accessTokenData === "TokenExpiredError") {
      const accessTokenRaw: string = accessTokenGenerator(refreshTokenData.id);
      const accessTokenEncrypt: string = generateEncryption(accessTokenRaw);

      const dbToken: TokenModelType = await dbReadAccessToken(accessToken);
      dbToken.accessToken = accessTokenEncrypt;
      await dbToken.save();

      setAccessTokenCookie(res, accessTokenEncrypt);
      return SuccessResponse(req, res, "AU", 16);
    }

    const dbToken: TokenModelType = await dbReadToken({ accessToken });
    await TokenModel.deleteMany({ owner: dbToken.owner });

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);
    return ErrorResponse(req, res, "TP", 11);
  } catch (error: any) {
    return next(error);
  }
};
