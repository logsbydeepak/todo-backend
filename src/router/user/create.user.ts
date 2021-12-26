import { NextFunction, Request, Response } from "express";

import {
  validateBody,
  validateEmail,
  validateEmpty,
  validatePassword,
} from "@helper/validator";

import { UserModel } from "@model";
import { SuccessResponse } from "@response";
import { dbCreateToken, dbEmailExist } from "@helper/db";
import { CreateUserBodyType, UserModelType, TokenModelType } from "@types";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@helper/cookie";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bodyData: CreateUserBodyType = validateBody(req.body, 3);
    const name: string = validateEmpty(bodyData.name);
    const email: string = validateEmail(bodyData.email);
    const password: string = validatePassword(bodyData.password);

    await dbEmailExist(email);

    const newUser: UserModelType = new UserModel({ name, email, password });
    const newUserId: number = newUser._id;

    const newToken: TokenModelType = dbCreateToken(newUserId);

    await newUser.save();
    await newToken.save();

    setAccessTokenCookie(res, newToken.accessToken);
    setRefreshTokenCookie(res, newToken.refreshToken);

    return SuccessResponse(req, res, "AU", 10);
  } catch (error: any) {
    return next(error);
  }
};
