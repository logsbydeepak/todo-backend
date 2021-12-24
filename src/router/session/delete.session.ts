import { Request, Response } from "express";
import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
} from "../../helper/cookie.helper";
import { TokenModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const logoutAll = req.query.all;
    const accessToken = req.cookies.accessToken;
    const userId = res.locals.userId;
    const dbToken: any = await TokenModel.findById(userId);

    if (!dbToken) {
      return ErrorResponse(req, res, "AU", 10);
    }

    if (logoutAll === "true") {
      dbToken.tokens = [];
    } else {
      dbToken.tokens = dbToken.tokens.filter(
        (element: any) => !(element.accessToken === accessToken)
      );
    }

    await dbToken.save();

    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);

    SuccessResponse(req, res, "AU", 15);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
