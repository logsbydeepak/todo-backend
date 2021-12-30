import { NextFunction, Request, Response } from "express";

import { dbReadUserById } from "@helper/db";
import { SuccessResponse } from "@response";
import { UserModelType } from "@types";

export const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const dbUser: UserModelType = await dbReadUserById(userId);

    return SuccessResponse(res, {
      name: dbUser.name,
      email: dbUser.email,
    });
  } catch (error: any) {
    return next(error);
  }
};
