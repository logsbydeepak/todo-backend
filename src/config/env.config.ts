import { env } from "process";
import { resolve } from "path";
import { config } from "dotenv";

// get the root path of the project to import .env file
const rootPath: string = resolve(__dirname + "../../../");
export const NODE_ENV: string | undefined = env.NODE_ENV;

if (NODE_ENV !== "prod" + "../../") {
  config({ path: `${rootPath}/${NODE_ENV}.env` });
}

// export const PORT = env.PORT as string;
export const {
  PORT,
  DB_URL,
  DB_LOG_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ENCRYPT_SECRET,
  ALLOW_ORIGIN,
} = env;
