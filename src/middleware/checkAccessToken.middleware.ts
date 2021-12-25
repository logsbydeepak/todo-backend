import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "@response";
import { accessTokenValidator } from "@helper/token";
import { generateDecryption } from "@helper/security";
import { dbAccessTokenExist, dbUserExist } from "@helper/db";

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

    await dbAccessTokenExist(accessToken);

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

    await dbUserExist(id);

    res.locals.userId = id;

    next();
  } catch {
    ErrorResponse(req, res, "IS", 10);
  }
};
