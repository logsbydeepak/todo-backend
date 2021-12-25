import { NextFunction, Request, Response } from "express";

import { ErrorRequest } from "@types";
import { ErrorResponse } from "@response";

export const serverErrorHandler = (
  error: ErrorRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error.ErrorObject) {
    const { messageTypeCode, messageCode } = error.ErrorObject;
    return ErrorResponse(req, res, messageTypeCode, messageCode);
  }
  ErrorResponse(req, res, "IS", 10);
  next();
};
