import express, { Express, json } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { checkEnv } from "../helper/env.helper";
import { dbConnect } from "../config/db.config";
import { router } from "../router";

checkEnv();
dbConnect();
export const server: Express = express();

server.use(helmet());
server.use(json());
server.use(cookieParser());
server.use("/v1", router);
