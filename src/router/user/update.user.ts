import { Response, Request, NextFunction } from "express";

import {
  validateBody,
  validateEmail,
  validateEmpty,
  validatePassword,
} from "@helper/validator";

import { dbReadUserById, dbEmailExist } from "@helper/db";
import { ErrorResponse, SuccessResponse } from "@response";
import { UserModelType, UpdateUserBodyType } from "@types";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = res.locals.userId;
    const bodyData: UpdateUserBodyType = validateBody(req.body, 3);
    const toUpdate: string = validateEmpty(bodyData.toUpdate, "BP", 11);

    const dbUser: UserModelType = await dbReadUserById(userId);

    switch (toUpdate) {
      case "name":
        dbUser.name = validateEmpty(bodyData.name, "BP", 11);
        break;

      case "email":
        const email: string = validateEmail(bodyData.email);
        await dbEmailExist(email);
        dbUser.email = email;
        break;

      case "password":
        dbUser.password = validatePassword(bodyData.password);
        break;

      default:
        return ErrorResponse(req, res, "BP", 11);
    }

    await dbUser.save();

    return SuccessResponse(req, res, "AU", 12);
  } catch (error: any) {
    return next(error);
  }
};
