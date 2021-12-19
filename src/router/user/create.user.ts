import { Request, Response } from "express";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../../helper/cookie.helper";
import { isEmailExist } from "../../helper/db.helper";
import { generateEncrypt } from "../../helper/security.helper";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../../helper/token.helper";

import {
  validateBody,
  validateEmail,
  validateName,
  validatePassword,
} from "../../helper/validator.helper";
import { TokenModel, UserModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const createUser = async (req: Request, res: Response) => {
  try {
    const bodyData = validateBody(req, res, req.body, 3);
    if (!bodyData) return;

    const name = validateName(req, res, bodyData.name);
    if (!name) return;

    const email = validateEmail(req, res, bodyData.email);
    if (!email) return;

    const password = validatePassword(req, res, bodyData.password);
    if (!password) return;

    const dbEmailCheck = await isEmailExist(req, res, email);
    if (!dbEmailCheck) return;

    const newUser = new UserModel({ name, email, password });

    const newUserId = newUser._id;

    const accessToken = accessTokenGenerator(newUserId);
    const refreshToken = refreshTokenGenerator(newUserId);
    const accessTokenEncrypt = generateEncrypt(accessToken);
    const refreshTokenEncrypt = generateEncrypt(refreshToken);

    const newToken = new TokenModel({
      _id: newUserId,
      tokens: [
        {
          refreshToken: refreshTokenEncrypt,
          accessToken: [{ token: accessTokenEncrypt }],
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
