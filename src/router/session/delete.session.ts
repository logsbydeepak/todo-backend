import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeAuthCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { QueryType } from "@types";
import { TokenModel } from "@model";

export const deleteSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken: string = req.cookies.accessToken;

    await TokenModel.deleteOne({ accessToken });

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
