import Cryptr from "cryptr";
import { ENCRYPT_SECRET } from "../config/env.config";

const cryptr = new Cryptr(ENCRYPT_SECRET as string);

export const generateEncrypt = (token: string) => cryptr.encrypt(token);
