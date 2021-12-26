import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { TokenModel } from "@model";
import { TokenModelType } from "@types";
import { ErrorResponse, SuccessResponse } from "@response";

export const deleteSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const logoutAll = req.query.all;
    const accessToken: string = req.cookies.accessToken;
    const userId: string = res.locals.userId;

    if (logoutAll === "true") {
      await TokenModel.deleteMany({ owner: userId });
    } else {
      await TokenModel.deleteOne({ accessToken });
    }

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    SuccessResponse(req, res, "AU", 15);
  } catch (error: any) {
    return next(error);
  }
};
