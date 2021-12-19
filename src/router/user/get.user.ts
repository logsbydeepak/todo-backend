import { Request, Response } from "express";
import { UserModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const dbUser = await UserModel.findById(userId);

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
