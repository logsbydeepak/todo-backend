import { Request, Response } from "express";

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
  res: Response
): Promise<void> => {
  try {
    const bodyData: CreateUserBodyType | void = validateBody(
      req,
      res,
      req.body,
      3
    );
    if (!bodyData) return;

    const name: string | void = validateGeneral(req, res, bodyData.name);
    if (!name) return;

    const email: string | void = validateEmail(req, res, bodyData.email);
    if (!email) return;

    const password: string | void = validatePassword(
      req,
      res,
      bodyData.password
    );
    if (!password) return;

    const dbEmailCheck: string | void = await isEmailExist(req, res, email);
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

    SuccessResponse(req, res, "AU", 10);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
