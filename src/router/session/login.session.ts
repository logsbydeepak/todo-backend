import { Request, Response } from "express";

import {
  validateBody,
  validateEmail,
  validatePassword,
} from "../../helper/validator.helper";

import { TokenModel, UserModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";
import {
  generateEncryption,
  validateHashAndSalt,
} from "../../helper/security.helper";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../../helper/token.helper";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../helper/cookie.helper";

export const loginSession = async (req: Request, res: Response) => {
  try {
    const bodyData = validateBody(req, res, req.body, 2);
    if (!bodyData) return;

    const email = validateEmail(req, res, bodyData.email);
    if (!email) return;

    const password = validatePassword(req, res, bodyData.password);
    if (!password) return;

    const dbUser = await UserModel.findOne({ email });
    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    const checkDbPassword = await validateHashAndSalt(
      password,
      dbUser.password as string
    );
    if (!checkDbPassword) {
      return ErrorResponse(req, res, "BP", 10);
    }

    const dbUserId = dbUser._id;

    const accessToken = accessTokenGenerator(dbUserId);
    const refreshToken = refreshTokenGenerator(dbUserId);
    const accessTokenEncrypt = generateEncryption(accessToken);
    const refreshTokenEncrypt = generateEncryption(refreshToken);

    const dbToken: any = await TokenModel.findById(dbUser._id);

    if (!dbToken) {
      throw new Error();
    }

    dbToken.tokens.unshift({
      refreshToken: refreshTokenEncrypt,
      accessToken: accessTokenEncrypt,
    });

    dbToken.save();

    setAccessTokenCookie(res, accessTokenEncrypt);
    setRefreshTokenCookie(res, refreshTokenEncrypt);

    SuccessResponse(req, res, "AU", 14);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
