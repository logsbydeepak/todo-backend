import { NextFunction, Request, Response } from "express";

import { validateHashAndSalt } from "../helper/security.helper";
import { validatePassword } from "../helper/validator.helper";
import { UserModel } from "../model";
import { ErrorResponse } from "../response";
import { UserModelType } from "../types/model.types";

export const checkPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const currentPassword: string | void = validatePassword(
      req,
      res,
      req.body.currentPassword
    );
    if (!currentPassword) return;

    const dbUser: UserModelType | null = await UserModel.findById(userId);

    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    const checkDbPassword: boolean = await validateHashAndSalt(
      currentPassword,
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
