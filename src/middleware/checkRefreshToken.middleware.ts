import { NextFunction, Request, Response } from "express";
import { generateDecryption } from "../helper/security.helper";
import { refreshTokenValidator } from "../helper/token.helper";
import { TokenModel, UserModel } from "../model";
import { ErrorResponse } from "../response";

export const checkRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const refreshTokenDecryption = generateDecryption(refreshToken);
    if (!refreshTokenDecryption) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const refreshTokenCount = await TokenModel.count({
      "tokens.refreshToken": refreshToken,
    });

    if (refreshTokenCount === 0) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const refreshTokenData: any = refreshTokenValidator(refreshTokenDecryption);
    if (!refreshTokenData) {
      return ErrorResponse(req, res, "BP", 11);
    }

    if (refreshTokenData === "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 10);
    }

    if (!refreshTokenData.id) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const idCount = await UserModel.count({
      _id: refreshTokenData.id as string,
    });

    if (idCount === 0) {
      return ErrorResponse(req, res, "AU", 10);
    }

    res.locals.userId = refreshTokenData.id;

    next();
  } catch {
    ErrorResponse(req, res, "IS", 10);
  }
};
