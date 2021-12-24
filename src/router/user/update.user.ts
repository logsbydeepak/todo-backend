import { Response, Request } from "express";

import {
  validateBody,
  validateEmail,
  validateGeneral,
  validatePassword,
} from "../../helper/validator.helper";
import { UserModel } from "../../model";

import { isEmailExist } from "../../helper/db.helper";
import { UserModelType } from "../../types/model.types";
import { ErrorResponse, SuccessResponse } from "../../response";
import { UpdateUserBodyType } from "../../types/validator.types";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.userId;

    const bodyData: UpdateUserBodyType = validateBody(req.body, 3);

    const toUpdate: string = validateGeneral(bodyData.toUpdate);

    const dbUser: UserModelType | null = await UserModel.findById(userId);
    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    switch (toUpdate) {
      case "name":
        const name: string = validateGeneral(bodyData.name);
        dbUser.name = name;
        break;

      case "email":
        const email: string = validateEmail(bodyData.email);
        const dbEmailCheck: string = await isEmailExist(email);
        dbUser.email = email;
        break;

      case "password":
        const password: string = validatePassword(bodyData.password);
        dbUser.password = password;
        break;

      default:
        return ErrorResponse(req, res, "BP", 10);
    }

    await dbUser.save();

    SuccessResponse(req, res, "AU", 12);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
