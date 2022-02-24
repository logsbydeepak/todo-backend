import { NextFunction, Request, Response } from "express";

import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "@helper/cookie";

import { TodoModel, TokenModel, UserModel } from "@model";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = res.locals.userId;

    await UserModel.findByIdAndRemove(id);
    await TodoModel.findByIdAndRemove(id);
    await TokenModel.findByIdAndRemove(id);

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    res.statusCode = 204;
    res.send();
  } catch (error: any) {
    next(error);
  }
};

export default deleteUser;
