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

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = res.locals;
    const bodyData: UpdateUserBodyType = validateBody(req.body, 3);
    const toUpdate: string = validateEmpty(bodyData.toUpdate, "BP", 18);

    const dbUser: UserModelType = await dbReadUserById(userId);
    let toUpdateValue: string;

    switch (toUpdate) {
      case "name":
        toUpdateValue = validateEmpty(bodyData.name, "BP", 13);
        break;

      case "email":
        toUpdateValue = validateEmail(bodyData.email);
        await dbEmailExist(validateEmail(toUpdateValue));
        break;

      case "password":
        toUpdateValue = validatePassword(bodyData.password);
        break;

      default:
        return ErrorResponse(res, "BP", 19);
    }

    dbUser[toUpdate] = toUpdateValue;
    await dbUser.save();

    return SuccessResponse(res, 200, {
      name: dbUser.name,
      email: dbUser.email,
    });
  } catch (error: any) {
    return next(error);
  }
};

export default updateUser;
