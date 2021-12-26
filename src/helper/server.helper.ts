import { NextFunction, Request, Response } from "express";

import { MyErrorRequestHandler } from "@types";
import { ErrorResponse } from "@response";

export const serverErrorHandler = (
  error: MyErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.ErrorObject) {
    const { messageTypeCode, messageCode } = error.ErrorObject;
    return ErrorResponse(req, res, messageTypeCode, messageCode);
  }

  if (error.name === "SyntaxError") {
    return ErrorResponse(req, res, "BP", 12);
  }
  ErrorResponse(req, res, "IS", 10);
  next();
};
