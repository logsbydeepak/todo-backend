import { NextFunction, Request, Response } from "express";

import { dbReadUserById } from "@helper/db";
import { validatePassword } from "@helper/validator";
import { UserModelType } from "@types";
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
    await validateHashAndSalt(currentPassword, dbUser.password as string);

    next();
  } catch (error: any) {
    return next(error);
  }
};
