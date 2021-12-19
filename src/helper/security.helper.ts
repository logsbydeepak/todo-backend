import Cryptr from "cryptr";
import { hash, compare } from "bcryptjs";

import { ENCRYPT_SECRET } from "../config/env.config";

const cryptr = new Cryptr(ENCRYPT_SECRET as string);

export const generateEncryption = (token: string) => cryptr.encrypt(token);

export const generateDecryption = (token: string) => {
  try {
    return cryptr.decrypt(token);
  } catch (error: any) {
    return null;
  }
};

export const generateHashAndSalt = async (rawPassword: string) =>
  await hash(rawPassword, 10);

export const validateHashAndSalt = async (
  rawPassword: string,
  dbPassword: string
) => await compare(rawPassword, dbPassword);
