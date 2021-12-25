import { UserModelType } from "@types";
import { ErrorObject } from "@response";
import { TokenModel, UserModel } from "@model";

export const isEmailExist = async (email: string): Promise<void> => {
  const emailCount = await UserModel.count({ email });
  if (emailCount !== 0) {
    throw ErrorObject("BP", 10);
  }

  return;
};

export const dbAccessTokenExist = async (
  accessToken: string
): Promise<void> => {
  const accessTokenCount: number = await TokenModel.count({ accessToken });

  if (accessTokenCount === 0) {
    throw ErrorObject("BP", 11);
  }
  return;
};

export const dbUserExist = async (userId: string): Promise<void> => {
  const idCount: number = await UserModel.count({
    _id: userId,
  });

  if (idCount === 0) {
    throw ErrorObject("AU", 10);
  }
  return;
};

export const dbGetUserById = async (userId: string): Promise<UserModelType> => {
  const dbUser: UserModelType | null = await UserModel.findById(userId);

  if (!dbUser) {
    throw ErrorObject("AU", 10);
  }

  return dbUser;
};
