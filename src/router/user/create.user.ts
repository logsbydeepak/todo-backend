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
    const name: string = validateEmpty(bodyData.name, "BP", 13);
    const email: string = validateEmail(bodyData.email);
    const password: string = validatePassword(bodyData.password);

    await dbEmailExist(email);

    const newUser: UserModelType = new UserModel({ name, email, password });
    const newUserId: string = newUser._id;

    const newToken: TokenModelType = dbCreateToken(newUserId, 1);

    await newUser.save();
    await newToken.save();

    setAccessTokenCookie(res, newToken.accessToken);
    setRefreshTokenCookie(res, newToken.refreshToken);

    return SuccessResponse(res, 201, {
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error: any) {
    return next(error);
  }
};
