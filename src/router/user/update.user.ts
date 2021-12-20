import { Response, Request } from "express";
import { isEmailExist } from "../../helper/db.helper";
import {
  validateBody,
  validateEmail,
  validateGeneral,
  validatePassword,
} from "../../helper/validator.helper";
import { UserModel } from "../../model";

import { ErrorResponse, SuccessResponse } from "../../response";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const bodyData = validateBody(req, res, req.body, 3);
    if (!bodyData) return;

    const toUpdate = validateGeneral(req, res, bodyData.toUpdate);
    if (!toUpdate) return;

    const dbUser = await UserModel.findById(userId);
    if (!dbUser) {
      return ErrorResponse(req, res, "AU", 10);
    }

    switch (toUpdate) {
      case "name":
        const name = validateGeneral(req, res, bodyData.name);
        if (!name) return;
        dbUser.name = name;
        break;

      case "email":
        const email = validateEmail(req, res, bodyData.email);
        if (!email) return;
        const dbEmailCheck = await isEmailExist(req, res, email);
        if (!dbEmailCheck) return;
        dbUser.email = email;
        break;

      case "password":
        const password = validatePassword(req, res, bodyData.password);
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
