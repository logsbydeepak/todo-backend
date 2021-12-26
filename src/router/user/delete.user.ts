import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { ObjectIdType } from "@types";
import { SuccessResponse } from "@response";
import { TodoModel, TokenModel, UserModel } from "@model";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: ObjectIdType = res.locals.userId;

    await UserModel.findByIdAndRemove(id);
    await TodoModel.findByIdAndRemove(id);
    await TokenModel.findByIdAndRemove(id);

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    return SuccessResponse(req, res, "AU", 13);
  } catch (error: any) {
    return next(error);
  }
};
