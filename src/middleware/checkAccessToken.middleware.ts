import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "@response";
import { AccessTokenValidatorType } from "@types";
import { validateEmpty } from "@helper/validator";
import { accessTokenValidator } from "@helper/token";
import { generateDecryption } from "@helper/security";
import { dbTokenExist, dbUserExist } from "@helper/db";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken: string = validateEmpty(
      req.cookies.accessToken,
      "TP",
      14
    );
    const accessTokenDecryption: string = generateDecryption(accessToken);

    await dbTokenExist({ accessToken });

    const accessTokenData: AccessTokenValidatorType = accessTokenValidator(
      accessTokenDecryption
    );

    if (!accessTokenData) {
      return ErrorResponse(res, "TP", 13);
    }

    if (accessTokenData === "TokenExpiredError") {
      return ErrorResponse(res, "TP", 10);
    }

    const userId: string = accessTokenData.id;
    if (!userId) {
      return ErrorResponse(res, "TP", 13);
    }

    await dbUserExist(userId);
    res.locals.userId = userId;

    return next();
  } catch (error: any) {
    return next(error);
  }
};
