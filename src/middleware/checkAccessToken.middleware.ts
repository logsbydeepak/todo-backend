import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "@response";
import { TokenValidatorType } from "@types";
import { validateEmpty } from "@helper/validator";
import { accessTokenValidator } from "@helper/token";
import { generateDecryption } from "@helper/security";
import { dbAccessTokenExist, dbUserExist } from "@helper/db";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken: string = validateEmpty(req.cookies.accessToken);
    const accessTokenDecryption: string = generateDecryption(accessToken);

    await dbAccessTokenExist(accessToken);

    const accessTokenData: TokenValidatorType = accessTokenValidator(
      accessTokenDecryption
    );

    if (!accessTokenData) {
      return ErrorResponse(req, res, "TP", 13);
    }

    if (accessTokenData === "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 10);
    }

    const userId: string = accessTokenData.id;
    if (!userId) {
      return ErrorResponse(req, res, "BP", 11);
    }

    await dbUserExist(userId);
    res.locals.userId = userId;

    return next();
  } catch (error: any) {
    return next(error);
  }
};
