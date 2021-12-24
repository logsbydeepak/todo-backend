import { Request, Response } from "express";

import { TokenModel, UserModel } from "../model";
import { ErrorResponse } from "../response";
import { UserModelType } from "../types/model.types";

export const isEmailExist = async (
  req: Request,
  res: Response,
  email: string
): Promise<string | void> => {
  const emailCount = await UserModel.count({ email });

  if (emailCount !== 0) {
    return ErrorResponse(req, res, "BP", 10);
  }

  return email;
};

export const dbAccessTokenExist = async (
  req: Request,
  res: Response,
  accessToken: string
): Promise<string | void> => {
  const accessTokenCount: number = await TokenModel.count({
    "tokens.accessToken": accessToken,
  });

  if (accessTokenCount === 0) {
    return ErrorResponse(req, res, "BP", 11);
  }
  return accessToken;
};

export const dbUserExist = async (
  req: Request,
  res: Response,
  userId: string
): Promise<number | void> => {
  const idCount: number = await UserModel.count({
    _id: userId,
  });

  if (idCount === 0) {
    return ErrorResponse(req, res, "AU", 10);
  }

  return idCount;
};

export const dbGetUserById = async (
  req: Request,
  res: Response,
  userId: string
): Promise<UserModelType | void> => {
  const dbUser: UserModelType | null = await UserModel.findById(userId);

  if (!dbUser) {
    return ErrorResponse(req, res, "AU", 10);
  }

  return dbUser;
};
