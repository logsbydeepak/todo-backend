import { NextFunction, Request, Response } from "express";

import {
  validateBody,
  validateEmail,
  validatePassword,
} from "@helper/validator";

import { SuccessResponse } from "@response";
import { validateHashAndSalt } from "@helper/security";
import { dbCreateToken, dbReadUserByEmail } from "@helper/db";
import { CreateUserBodyType, TokenModelType, UserModelType } from "@types";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@helper/cookie";

export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const bodyData: CreateUserBodyType = validateBody(req.body, 2);
    const email: string = validateEmail(bodyData.email);
    const password: string = validatePassword(bodyData.password);

    const dbUser: UserModelType = await dbReadUserByEmail(email);
    await validateHashAndSalt(password, dbUser.password as string);

    const dbUserId: string = dbUser._id;
    const newToken: TokenModelType = dbCreateToken(dbUserId, 1);
    await newToken.save();

    setAccessTokenCookie(res, newToken.accessToken);
    setRefreshTokenCookie(res, newToken.refreshToken);

    return SuccessResponse(req, res, "AU", 14);
  } catch (error: any) {
    return next(error);
  }
};
