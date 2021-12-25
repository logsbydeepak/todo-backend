import { Request, Response } from "express";

import { UserModel } from "@model";
import { UserModelType } from "@types";
import { ErrorResponse, SuccessResponse } from "@response";

export const readUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = res.locals.userId;

    const dbUser: UserModelType | null = await UserModel.findById(userId);

    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    SuccessResponse(req, res, "AU", 11, {
      name: dbUser.name,
      email: dbUser.email,
    });
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
