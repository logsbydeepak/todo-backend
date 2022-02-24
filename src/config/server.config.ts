import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express, { Express, json } from "express";

import router from "@router";
import checkEnv from "@helper/env";
import { serverErrorHandler, corsOption } from "@helper/server";

checkEnv();
const server: Express = express();

server.use(cors(corsOption));
server.use(helmet());
server.use(json());
server.use(cookieParser());
server.use("/v1", router);
server.use(serverErrorHandler);

export default server;
