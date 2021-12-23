import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "../response";
import { TokenModel, UserModel } from "../model";
import { accessTokenValidator } from "../helper/token.helper";
import { generateDecryption } from "../helper/security.helper";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken: string | null = req.cookies.accessToken;
    if (!accessToken) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenDecryption: string | null =
      generateDecryption(accessToken);
    if (!accessTokenDecryption) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenCount: number = await TokenModel.count({
      "tokens.accessToken": accessToken,
    });

    if (accessTokenCount === 0) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenData: any = accessTokenValidator(accessTokenDecryption);

    if (!accessTokenData) {
      return ErrorResponse(req, res, "BP", 11);
    }

    if (accessTokenData === "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 10);
    }

    const { id }: { id: string } = accessTokenData;

    if (!id) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const idCount: number = await UserModel.count({
      _id: id as string,
    });

    if (idCount === 0) {
      return ErrorResponse(req, res, "AU", 10);
    }

    res.locals.userId = id;

    next();
  } catch {
    ErrorResponse(req, res, "IS", 10);
  }
};
