import { Request, Response } from "express";
import { setAccessTokenCookie } from "../../helper/cookie.helper";
import {
  generateDecryption,
  generateEncryption,
} from "../../helper/security.helper";
import {
  accessTokenGenerator,
  accessTokenValidator,
  refreshTokenValidator,
} from "../../helper/token.helper";
import { TokenModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const updateSession = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      return ErrorResponse(req, res, "BP", 11);
    }
    const accessTokenDecryption = generateDecryption(accessToken);
    const refreshTokenDecryption = generateDecryption(refreshToken);
    if (!accessTokenDecryption || !refreshTokenDecryption) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenCount = await TokenModel.count({
      "tokens.accessToken": accessToken,
    });

    const refreshTokenCount = await TokenModel.count({
      "tokens.refreshToken": refreshToken,
    });

    if (accessTokenCount === 0 || refreshTokenCount === 0) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const accessTokenData: any = accessTokenValidator(accessTokenDecryption);
    const refreshTokenData: any = refreshTokenValidator(refreshTokenDecryption);

    if (!accessTokenData || !refreshTokenData) {
      return ErrorResponse(req, res, "BP", 11);
    }

    if (accessTokenData !== "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 11);
    }
    if (refreshTokenData === "TokenExpiredError") {
      return ErrorResponse(req, res, "TP", 12);
    }

    if (!refreshTokenData.id) {
      return ErrorResponse(req, res, "BP", 11);
    }

    const dbToken: any = await TokenModel.findById(refreshTokenData.id);

    if (!dbToken) {
      return ErrorResponse(req, res, "AU", 10);
    }

    const accessTokenIndex = dbToken.tokens.findIndex(
      (element: any) => element.accessToken === accessToken
    );

    const accessTokenRaw = accessTokenGenerator(refreshTokenData.id);
    const accessTokenEncrypt = generateEncryption(accessTokenRaw);

    dbToken.tokens[accessTokenIndex].accessToken = accessTokenEncrypt;

    await dbToken.save();

    setAccessTokenCookie(res, accessTokenEncrypt);

    SuccessResponse(req, res, "AU", 16);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
