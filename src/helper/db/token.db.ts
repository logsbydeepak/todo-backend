import { TokenModelType } from "@types";

import { ErrorObject } from "@response";
import { generateEncryption } from "@helper/security";
import { TokenModel } from "@model";
import { accessTokenGenerator, refreshTokenGenerator } from "@helper/token";

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

export const dbTokenExist = async (
  data: { accessToken: string } | { refreshToken: string }
): Promise<void> => {
  const dbTokenCount: number = await TokenModel.count({ data });

  if (dbTokenCount === 0) {
    throw ErrorObject("BP", 11);
  }
  return;
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
