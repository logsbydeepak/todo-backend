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
import { dbCreateToken, dbReadUserByEmail } from "@helper/db";

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

    await validateHashAndSalt(password, dbUser.password as string);

    const dbUserId = dbUser._id;

    const newToken: TokenModelType = dbCreateToken(dbUserId);

    await newToken.save();

    setAccessTokenCookie(res, newToken.accessToken);
    setRefreshTokenCookie(res, newToken.refreshToken);

    SuccessResponse(req, res, "AU", 14);
  } catch (error: any) {
    next(error);
  }
};
