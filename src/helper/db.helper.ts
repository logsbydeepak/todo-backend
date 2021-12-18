import { Request, Response } from "express";

import { UserModel } from "../model";
import { ErrorResponse } from "../response";

export const isEmailExist = async (
  req: Request,
  res: Response,
  email: string
) => {
  const emailCount = await UserModel.count({ email });

  if (emailCount !== 0) {
    return ErrorResponse(req, res, "BP", 10);
  }

  return email;
};
