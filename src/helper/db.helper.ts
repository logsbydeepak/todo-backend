import { TokenModel, UserModel } from "../model";
import { ErrorObject } from "../response";
import { UserModelType } from "../types/model.types";

export const isEmailExist = async (email: string): Promise<string> => {
  const emailCount = await UserModel.count({ email });

  if (emailCount !== 0) {
    throw ErrorObject("BP", 10);
  }

  return email;
};

export const dbAccessTokenExist = async (
  accessToken: string
): Promise<string> => {
  const accessTokenCount: number = await TokenModel.count({
    "tokens.accessToken": accessToken,
  });

  if (accessTokenCount === 0) {
    throw ErrorObject("BP", 11);
  }
  return accessToken;
};

export const dbUserExist = async (userId: string): Promise<number> => {
  const idCount: number = await UserModel.count({
    _id: userId,
  });

  if (idCount === 0) {
    throw ErrorObject("AU", 10);
  }

  return idCount;
};

export const dbGetUserById = async (userId: string): Promise<UserModelType> => {
  const dbUser: UserModelType | null = await UserModel.findById(userId);

  if (!dbUser) {
    throw ErrorObject("AU", 10);
  }

  return dbUser;
};
