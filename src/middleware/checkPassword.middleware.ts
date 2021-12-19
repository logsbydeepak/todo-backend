import { NextFunction, Request, Response } from "express";

import { validateHashAndSalt } from "../helper/security.helper";
import { validatePassword } from "../helper/validator.helper";
import { UserModel } from "../model";
import { ErrorResponse } from "../response";

export const checkPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const password = validatePassword(req, res, req.body.password);
    if (!password) return;

    const dbUser = await UserModel.findById(userId);

    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    const checkDbPassword = await validateHashAndSalt(
      password,
      dbUser.password as string
    );

    if (!checkDbPassword) {
      return ErrorResponse(req, res, "BP", 10);
    }

    next();
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
