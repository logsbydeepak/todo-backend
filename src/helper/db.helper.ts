import { ErrorObject } from "@response";
import { TokenModel, UserModel } from "@model";
import { generateEncryption } from "@helper/security";
import { TokenModelType, UserModelType } from "@types";
import { accessTokenGenerator, refreshTokenGenerator } from "@helper/token";

export const dbEmailExist = async (email: string): Promise<void> => {
  const emailCount = await UserModel.count({ email });
  if (emailCount !== 0) {
    throw ErrorObject("AU", 11);
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

export const dbReadUserById = async (
  userId: string
): Promise<UserModelType> => {
  const dbUser: UserModelType | null = await UserModel.findById(userId);

  if (!dbUser) {
    throw ErrorObject("AU", 10);
  }

  return dbUser;
};

export const dbReadUserByEmail = async (
  email: string
): Promise<UserModelType> => {
  const dbUser: UserModelType | null = await UserModel.findOne({ email });

  if (!dbUser) {
    throw ErrorObject("AU", 10);
  }

  return dbUser;
};

export const dbCreateAccessTokenAndRefreshToken = (
  userId: number
): TokenModelType => {
  const accessToken: string = accessTokenGenerator(userId);
  const refreshToken: string = refreshTokenGenerator(userId);
  const accessTokenEncrypt: string = generateEncryption(accessToken);
  const refreshTokenEncrypt: string = generateEncryption(refreshToken);

  const newToken: TokenModelType = new TokenModel({
    owner: userId,
    refreshToken: refreshTokenEncrypt,
    accessToken: accessTokenEncrypt,
  });

  return newToken;
};
