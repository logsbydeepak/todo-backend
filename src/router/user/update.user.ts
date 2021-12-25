import { Response, Request, NextFunction } from "express";

import {
  validateBody,
  validateEmail,
  validateGeneral,
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
    const toUpdate: string = validateGeneral(bodyData.toUpdate);

    const dbUser: UserModelType = await dbReadUserById(userId);

    switch (toUpdate) {
      case "name":
        dbUser.name = validateGeneral(bodyData.name);
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

    SuccessResponse(req, res, "AU", 12);
  } catch (error: any) {
    next(error);
  }
};
