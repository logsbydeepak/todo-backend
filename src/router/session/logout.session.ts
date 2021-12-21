import { Request, Response } from "express";
import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "../../helper/cookie.helper";
import { ErrorResponse, SuccessResponse } from "../../response";

export const logoutSession = (req: Request, res: Response) => {
  try {
    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    SuccessResponse(req, res, "AU", 15);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
