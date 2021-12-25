import { NextFunction, Request, Response } from "express";

import {
  validateBody,
  validateEmail,
  validatePassword,
} from "@helper/validator";

import { TokenModelType, UserModelType } from "@types";
import { TokenModel, UserModel } from "@model";
import { ErrorResponse, SuccessResponse } from "@response";
import { generateEncryption, validateHashAndSalt } from "@helper/security";
import { accessTokenGenerator, refreshTokenGenerator } from "@helper/token";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@helper/cookie";
import {
  dbCreateAccessTokenAndRefreshToken,
  dbReadUserByEmail,
} from "@helper/db";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyData = validateBody(req.body, 2);
    const email = validateEmail(bodyData.email);
    const password = validatePassword(bodyData.password);

    const dbUser: UserModelType = await dbReadUserByEmail(email);

    const checkDbPassword = await validateHashAndSalt(
      password,
      dbUser.password as string
    );

    if (!checkDbPassword) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const dbUserId = dbUser._id;

    const newToken: TokenModelType =
      dbCreateAccessTokenAndRefreshToken(dbUserId);

    await newToken.save();

    setAccessTokenCookie(res, newToken.accessToken);
    setRefreshTokenCookie(res, newToken.refreshToken);

    SuccessResponse(req, res, "AU", 14);
  } catch (error: any) {
    next(error);
  }
};
