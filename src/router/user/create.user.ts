import { NextFunction, Request, Response } from "express";

import {
  validateBody,
  validateEmail,
  validateGeneral,
  validatePassword,
} from "@helper/validator";

import { isEmailExist } from "@helper/db";
import { SuccessResponse } from "@response";
import { TokenModel, UserModel } from "@model";
import { generateEncryption } from "@helper/security";
import { CreateUserBodyType, UserModelType, TokenModelType } from "@types";
import { accessTokenGenerator, refreshTokenGenerator } from "@helper/token";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@helper/cookie";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyData: CreateUserBodyType = validateBody(req.body, 3);
    const name: string = validateGeneral(bodyData.name);
    const email: string = validateEmail(bodyData.email);
    const password: string = validatePassword(bodyData.password);

    await isEmailExist(email);

    const newUser: UserModelType = new UserModel({ name, email, password });
    const newUserId: number = newUser._id;

    const accessToken = accessTokenGenerator(newUserId);
    const refreshToken = refreshTokenGenerator(newUserId);
    const accessTokenEncrypt = generateEncryption(accessToken);
    const refreshTokenEncrypt = generateEncryption(refreshToken);

    const newToken: TokenModelType = new TokenModel({
      owner: newUserId,
      refreshToken: refreshTokenEncrypt,
      accessToken: accessTokenEncrypt,
    });

    await newUser.save();
    await newToken.save();

    setAccessTokenCookie(res, accessTokenEncrypt);
    setRefreshTokenCookie(res, refreshTokenEncrypt);

    SuccessResponse(req, res, "AU", 10);
  } catch (error: any) {
    return next(error);
  }
};
