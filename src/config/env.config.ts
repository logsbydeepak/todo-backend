import { env } from "process";
import { resolve } from "path";
import { config } from "dotenv";

// get the root path of the project to import .env file
const rootPath: string = resolve(__dirname + "../../../");
export const NODE_ENV: string | undefined = env.NODE_ENV;

if (NODE_ENV !== "prod" + "../../") {
  config({ path: `${rootPath}/${NODE_ENV}.env` });
}

export const API_PORT: string | undefined = env.API_PORT;
export const DB_URL: string | undefined = env.DB_URL;
export const DB_LOG_URL: string | undefined = env.DB_LOG_URL;
export const ACCESS_TOKEN_SECRET: string | undefined = env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET: string | undefined =
  env.REFRESH_TOKEN_SECRET;
export const ENCRYPT_SECRET: string | undefined = env.ENCRYPT_SECRET;
