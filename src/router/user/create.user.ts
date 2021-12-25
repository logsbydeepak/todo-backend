import { NextFunction, Request, Response } from "express";

import {
  validateBody,
  validateEmail,
  validateGeneral,
  validatePassword,
} from "@helper/validator";

import { UserModel } from "@model";
import { SuccessResponse } from "@response";
import { CreateUserBodyType, UserModelType, TokenModelType } from "@types";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@helper/cookie";
import { dbCreateAccessTokenAndRefreshToken, dbEmailExist } from "@helper/db";

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

    await dbEmailExist(email);

    const newUser: UserModelType = new UserModel({ name, email, password });
    const newUserId: number = newUser._id;

    const newToken: TokenModelType =
      dbCreateAccessTokenAndRefreshToken(newUserId);

    await newUser.save();
    await newToken.save();

    setAccessTokenCookie(res, newToken.accessToken);
    setRefreshTokenCookie(res, newToken.refreshToken);

    return SuccessResponse(req, res, "AU", 10);
  } catch (error: any) {
    return next(error);
  }
};
