import { env } from "process";
import { config } from "dotenv";
import { resolve } from "path";

const rootPath: string = resolve(__dirname + "../../../");
export const NODE_ENV: string | undefined = env.NODE_ENV;

if (NODE_ENV !== "prod" + "../../") {
  config({ path: `${rootPath}/${NODE_ENV}.env` });
}

export const API_PORT: string | undefined = env.API_PORT;
