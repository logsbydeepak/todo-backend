import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorResponse, ThrowError } from "../response";
import { ErrorRequest } from "../types/validator.types";

export const serverErrorHandler = (
  error: ErrorRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.ThrowError) {
    const { messageTypeCode, messageCode } = error.ThrowError;
    return ErrorResponse(req, res, messageTypeCode, messageCode);
  }
};
