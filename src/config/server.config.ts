import express, { Express, json } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { router } from "../router";
import { checkEnv } from "../helper/env.helper";
import { serverErrorHandler } from "../helper/server.helper";

checkEnv();
export const server: Express = express();

server.use(helmet());
server.use(json());
server.use(cookieParser());
server.use("/v1", router);
server.use(serverErrorHandler);
