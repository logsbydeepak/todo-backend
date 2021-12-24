import { NextFunction, Request, Response } from "express";
import { dbGetUserById } from "../helper/db.helper";

import { validateHashAndSalt } from "../helper/security.helper";
import { validatePassword } from "../helper/validator.helper";
import { ErrorResponse } from "../response";
import { UserModelType } from "../types/model.types";

export const checkPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const currentPassword: string = validatePassword(req.body.currentPassword);

    const dbUser: UserModelType | void = await dbGetUserById(userId);

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
