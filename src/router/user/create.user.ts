import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../helper/cookie.helper";

import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../../helper/token.helper";

import {
  validateBody,
  validateEmail,
  validateGeneral,
  validatePassword,
} from "../../helper/validator.helper";

import { TokenModel, UserModel } from "../../model";
import { isEmailExist } from "../../helper/db.helper";
import { ErrorResponse, SuccessResponse } from "../../response";
import { CreateUserBodyType } from "../../types/validator.types";
import { generateEncryption } from "../../helper/security.helper";
import { UserModelType, TokenModelType } from "../../types/model.types";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bodyData: CreateUserBodyType = validateBody(req.body, 3);
    if (!bodyData) return;

    const name: string = validateGeneral(bodyData.name);
    if (!name) return;

    const email: string = validateEmail(bodyData.email);
    if (!email) return;

    const password: string = validatePassword(bodyData.password);
    if (!password) return;

    const dbEmailCheck: string = await isEmailExist(email);
    if (!dbEmailCheck) return;

    const newUser: UserModelType = new UserModel({ name, email, password });

    const newUserId: number = newUser._id;

    const accessToken = accessTokenGenerator(newUserId);
    const refreshToken = refreshTokenGenerator(newUserId);
    const accessTokenEncrypt = generateEncryption(accessToken);
    const refreshTokenEncrypt = generateEncryption(refreshToken);

    const newToken: TokenModelType = new TokenModel({
      _id: newUserId,
      tokens: [
        {
          refreshToken: refreshTokenEncrypt,
          accessToken: accessTokenEncrypt,
        },
      ],
    });

    await newUser.save();
    await newToken.save();

    setAccessTokenCookie(res, accessTokenEncrypt);
    setRefreshTokenCookie(res, refreshTokenEncrypt);

    return SuccessResponse(req, res, "AU", 10);
  } catch (error: any) {
    return next(error);
  }
};
