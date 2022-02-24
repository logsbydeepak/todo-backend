import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { TokenModel } from "@model";

const deleteAllSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = res.locals;

    await TokenModel.deleteMany({ owner: userId });

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    res.statusCode = 204;
    res.send();
    return;
  } catch (error: any) {
    return next(error);
  }
};

export default deleteAllSession;
