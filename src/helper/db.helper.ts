import { TodoModelType, TokenModelType, UserModelType } from "@types";

import { ErrorObject } from "@response";
import { generateEncryption } from "@helper/security";
import { TodoModel, TokenModel, UserModel } from "@model";
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

export const dbReadRefreshToken = async (
  accessToken: string
): Promise<TokenModelType> => {
  const dbToken: TokenModelType | null = await TokenModel.findOne({
    accessToken,
  });

  if (!dbToken) {
    throw ErrorObject("BP", 11);
  }
  return dbToken;
};

export const dbTokenExist = async (
  data: { accessToken: string } | { refreshToken: string }
): Promise<void> => {
  const dbTokenCount: number = await TokenModel.count({ data });

  if (dbTokenCount === 0) {
    throw ErrorObject("BP", 11);
  }
  return;
};

export const dbReadAccessToken = async (
  accessToken: string
): Promise<TokenModelType> => {
  const dbToken: TokenModelType | null = await TokenModel.findOne({
    accessToken,
  });

  if (!dbToken) {
    throw ErrorObject("BP", 11);
  }
  return dbToken;
};

export const dbReadToken = async (
  data: { accessToken: string } | { refreshToken: string }
): Promise<TokenModelType> => {
  const dbToken: TokenModelType | null = await TokenModel.findOne(data);

  if (!dbToken) {
    throw ErrorObject("BP", 11);
  }
  return dbToken;
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

export const dbCreateToken = (userId: string): TokenModelType => {
  const accessToken: string = accessTokenGenerator(userId);
  const refreshToken: string = refreshTokenGenerator(userId, 1);
  const accessTokenEncrypt: string = generateEncryption(accessToken);
  const refreshTokenEncrypt: string = generateEncryption(refreshToken);

  const newToken: TokenModelType = new TokenModel({
    owner: userId,
    refreshToken: refreshTokenEncrypt,
    accessToken: accessTokenEncrypt,
  });

  return newToken;
};

export const dbReadTodo = async (todoId: string, userId: string) => {
  const dbTodo: TodoModelType | null = await TodoModel.findById(todoId);

  if (!dbTodo) {
    throw ErrorObject("BP", 10);
  }

  if (dbTodo.owner.toString() !== userId) {
    throw ErrorObject("AU", 10);
  }
  return dbTodo;
};
