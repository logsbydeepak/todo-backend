import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "@response";
import { MyErrorRequestHandler } from "@types";

export const serverErrorHandler = (
  error: MyErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error.ErrorObject) {
    const { messageTypeCode, messageCode } = error.ErrorObject;
    return ErrorResponse(res, messageTypeCode, messageCode);
  }

  if (error.name === "SyntaxError") {
    return ErrorResponse(res, "BP", 12);
  }
  ErrorResponse(res, "IS", 10);
  next();
};
