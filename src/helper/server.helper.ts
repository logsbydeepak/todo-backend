import { Request, Response } from "express";

import { ErrorRequest } from "@types";
import { ErrorResponse } from "@response";

export const serverErrorHandler = (
  error: ErrorRequest,
  req: Request,
  res: Response
) => {
  if (error.ErrorObject) {
    const { messageTypeCode, messageCode } = error.ErrorObject;
    return ErrorResponse(req, res, messageTypeCode, messageCode);
  }
};
