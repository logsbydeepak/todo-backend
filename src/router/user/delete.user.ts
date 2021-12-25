import { Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { TokenModel, UserModel } from "@model";
import { ErrorResponse, SuccessResponse } from "@response";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = res.locals.userId;

    await UserModel.findByIdAndRemove(id);
    await TokenModel.findByIdAndRemove(id);

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    SuccessResponse(req, res, "AU", 13);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
