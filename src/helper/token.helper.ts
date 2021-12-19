import { sign } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/env.config";

export const accessTokenGenerator = (id: number) =>
  sign({ id }, ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });

export const refreshTokenGenerator = (id: number) =>
  sign({ id }, REFRESH_TOKEN_SECRET as string, { expiresIn: "30d" });
