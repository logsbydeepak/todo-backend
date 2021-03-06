import { NextFunction, Request, Response } from "express";

import { dbReadUserById } from "@helper/db";
import { SuccessResponse } from "@response";
import { UserModelType } from "@types";

const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = res.locals;
    const dbUser: UserModelType = await dbReadUserById(userId);

    return SuccessResponse(res, 200, {
      name: dbUser.name,
      email: dbUser.email,
    });
  } catch (error: any) {
    return next(error);
  }
};

export default readUser;
