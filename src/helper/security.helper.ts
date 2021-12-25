import Cryptr from "cryptr";
import { hash, compare } from "bcryptjs";

import { ENCRYPT_SECRET } from "@config/env";

const cryptr = new Cryptr(ENCRYPT_SECRET as string);

export const generateEncryption = (token: string): string =>
  cryptr.encrypt(token);

export const generateDecryption = (token: string): string | null => {
  try {
    return cryptr.decrypt(token);
  } catch (error: any) {
    return null;
  }
};

export const generateHashAndSalt = async (
  rawPassword: string
): Promise<string> => await hash(rawPassword, 10);

export const validateHashAndSalt = async (
  rawPassword: string,
  dbPassword: string
): Promise<boolean> => await compare(rawPassword, dbPassword);
