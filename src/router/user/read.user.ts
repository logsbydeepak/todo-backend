import { NextFunction, Request, Response } from "express";

import { UserModelType } from "@types";
import { dbReadUserById } from "@helper/db";
import { SuccessResponse } from "@response";

export const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const dbUser: UserModelType = await dbReadUserById(userId);

    SuccessResponse(req, res, "AU", 11, {
      name: dbUser.name,
      email: dbUser.email,
    });
  } catch (error: any) {
    next(error);
  }
};
