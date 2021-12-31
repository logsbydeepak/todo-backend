import moment from "moment";
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
    const accessToken: string = validateEmpty(
      req.cookies.accessToken,
      "TP",
      14
    );
    const refreshToken: string = validateEmpty(
      req.cookies.refreshToken,
      "TP",
      14
    );

    await dbTokenExist({ accessToken }, "TP", 15);
    await dbTokenExist({ refreshToken }, "TP", 11);

    const accessTokenDecryption: string = generateDecryption(
      accessToken,
      "TP",
      15
    );
    const refreshTokenDecryption: string = generateDecryption(
      refreshToken,
      "TP",
      11
    );
    1;
    const accessTokenData: AccessTokenValidatorType = accessTokenValidator(
      accessTokenDecryption
    );
    const refreshTokenData: RefreshTokenValidatorType = refreshTokenValidator(
      refreshTokenDecryption
    );

    if (accessTokenData !== "TokenExpiredError") {
      return ErrorResponse(res, "TP", 12);
    }
    if (refreshTokenData === "TokenExpiredError") {
      removeAccessTokenCookie(res);
      removeRefreshTokenCookie(res);
      return ErrorResponse(res, "TP", 13);
    }

    await dbUserExist(refreshTokenData.id);

    const timeBeforeExpire = moment
      .unix(refreshTokenData.exp)
      .subtract(1, "day")
      .unix();

    if (
      refreshTokenData.exp >= timeBeforeExpire &&
      refreshTokenData.refreshTokenRefreshCount < 4
    ) {
      await TokenModel.deleteOne({ accessToken });

      const newDbToken: TokenModelType = dbCreateToken(
        refreshTokenData.id,
        refreshTokenData.refreshTokenRefreshCount + 1
      );
      await newDbToken.save();

      setAccessTokenCookie(res, newDbToken.accessToken);
      setRefreshTokenCookie(res, newDbToken.refreshToken);
      return SuccessResponse(res, {
        message: "access and refresh token updated successfully",
      });
    }

    if (refreshTokenData.refreshTokenRefreshCount >= 4) {
      await TokenModel.deleteOne({ refreshToken });
      removeAccessTokenCookie(res);
      removeRefreshTokenCookie(res);
      return ErrorResponse(res, "TP", 17);
    }

    if (accessTokenData === "TokenExpiredError") {
      const accessTokenRaw: string = accessTokenGenerator(refreshTokenData.id);
      const accessTokenEncrypt: string = generateEncryption(accessTokenRaw);

      const dbToken: TokenModelType = await dbReadToken({ accessToken });
      dbToken.accessToken = accessTokenEncrypt;
      await dbToken.save();

      setAccessTokenCookie(res, accessTokenEncrypt);
      return SuccessResponse(res, {
        message: "access token updated successfully",
      });
    }

    const dbToken: TokenModelType = await dbReadToken({ accessToken });
    await TokenModel.deleteMany({ owner: dbToken.owner });

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);
    return ErrorResponse(res, "TP", 18);
  } catch (error: any) {
    return next(error);
  }
};
