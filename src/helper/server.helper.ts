import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorResponse, ErrorObject } from "../response";
import { ErrorRequest } from "../types/validator.types";

export const serverErrorHandler = (
  error: ErrorRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.ErrorObject) {
    const { messageTypeCode, messageCode } = error.ErrorObject;
    return ErrorResponse(req, res, messageTypeCode, messageCode);
  }
};
