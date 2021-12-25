import { NextFunction, Request, Response } from "express";

import { UserModelType } from "@types";
import { ErrorResponse } from "@response";
import { dbReadUserById } from "@helper/db";
import { validatePassword } from "@helper/validator";
import { validateHashAndSalt } from "@helper/security";

export const checkPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const currentPassword: string = validatePassword(req.body.currentPassword);

    const dbUser: UserModelType = await dbReadUserById(userId);

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
