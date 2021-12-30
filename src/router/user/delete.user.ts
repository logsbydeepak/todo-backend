import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { SuccessResponse } from "@response";
import { TodoModel, TokenModel, UserModel } from "@model";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = res.locals.userId;

    await UserModel.findByIdAndRemove(id);
    await TodoModel.findByIdAndRemove(id);
    await TokenModel.findByIdAndRemove(id);

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    return SuccessResponse(res, { message: "user do not exist" });
  } catch (error: any) {
    return next(error);
  }
};
