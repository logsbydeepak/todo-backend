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

    const bodyData: UpdateUserBodyType | void = validateBody(
      req,
      res,
      req.body,
      3
    );
    if (!bodyData) return;

    const toUpdate: string | void = validateGeneral(
      req,
      res,
      bodyData.toUpdate
    );
    if (!toUpdate) return;

    const dbUser: UserModelType | null = await UserModel.findById(userId);
    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    switch (toUpdate) {
      case "name":
        const name: string | void = validateGeneral(req, res, bodyData.name);
        if (!name) return;
        dbUser.name = name;
        break;

      case "email":
        const email: string | void = validateEmail(req, res, bodyData.email);
        if (!email) return;
        const dbEmailCheck: string | void = await isEmailExist(req, res, email);
        if (!dbEmailCheck) return;
        dbUser.email = email;
        break;

      case "password":
        const password: string | void = validatePassword(
          req,
          res,
          bodyData.password
        );
        if (!password) return;
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
