import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeAuthCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { TokenModel } from "@model";

export const deleteAllSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;

    await TokenModel.deleteMany({ owner: userId });

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);
    removeAuthCookie(res);

    res.statusCode = 204;
    res.send();
    return;
  } catch (error: any) {
    return next(error);
  }
};
