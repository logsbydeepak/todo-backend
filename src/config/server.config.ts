import helmet from "helmet";
import cookieParser from "cookie-parser";
import express, { Express, json } from "express";
import cors from "cors";

import { router } from "@router";
import { checkEnv } from "@helper/env";
import { serverErrorHandler } from "@helper/server";

checkEnv();
export const server: Express = express();

server.use(cors({ origin: true, credentials: true }));
server.use(helmet());
server.use(json());
server.use(cookieParser());
server.use("/v1", router);
server.use(serverErrorHandler);
