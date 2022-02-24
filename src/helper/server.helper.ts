import { CorsOptions } from "cors";
import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "@response";
import { ALLOW_ORIGIN } from "@config/env";
import { MyErrorRequestHandler } from "@types";

export const serverErrorHandler = (
  error: MyErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.ErrorObject) {
    const { messageTypeCode, messageCode } = error.ErrorObject;
    ErrorResponse(res, messageTypeCode, messageCode);
    return;
  }

  if (error.name === "SyntaxError") {
    ErrorResponse(res, "BP", 12);
    return;
  }
  ErrorResponse(res, "IS", 10);
  next();
};

export const corsOption: CorsOptions = {
  origin: ALLOW_ORIGIN,
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
};
