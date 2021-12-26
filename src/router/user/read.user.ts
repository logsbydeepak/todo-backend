import { NextFunction, Request, Response } from "express";

import { dbReadUserById } from "@helper/db";
import { SuccessResponse } from "@response";
import { ObjectIdType, UserModelType } from "@types";

export const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: ObjectIdType = res.locals.userId;
    const dbUser: UserModelType = await dbReadUserById(userId);

    return SuccessResponse(req, res, "AU", 11, {
      name: dbUser.name,
      email: dbUser.email,
    });
  } catch (error: any) {
    return next(error);
  }
};
