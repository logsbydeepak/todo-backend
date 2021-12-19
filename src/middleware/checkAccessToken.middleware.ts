import { NextFunction, Request, Response } from "express";
import { generateDecryption } from "../helper/security.helper";
import { accessTokenValidator } from "../helper/token.helper";
import { TokenModel, UserModel } from "../model";
import { ErrorResponse } from "../response";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenCount = await TokenModel.count({
      "tokens.accessToken.token": accessToken,
    });

    if (accessToken === 0) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenDecryption = generateDecryption(accessToken);
    if (!accessTokenDecryption) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenData: any = accessTokenValidator(accessTokenDecryption);
    console.log(accessTokenData);
    if (!accessTokenData) {
      return ErrorResponse(req, res, "BP", 11);
    }

    if (accessTokenData === "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 10);
    }

    if (!accessTokenData.id) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const idCount = await UserModel.count({
      _id: accessTokenData.id as string,
    });

    if (idCount === 0) {
      return ErrorResponse(req, res, "AU", 10);
    }

    res.locals.userId = accessToken.id;

    next();
  } catch {
    ErrorResponse(req, res, "IS", 10);
  }
};
