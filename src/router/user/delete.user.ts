import { Request, Response } from "express";
import { TokenModel, UserModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = res.locals.userId;

    await UserModel.findByIdAndRemove(id);
    await TokenModel.findByIdAndRemove(id);

    SuccessResponse(req, res, "AU", 13);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
