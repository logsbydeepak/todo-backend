import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express, { Express, json } from "express";

import { router } from "@router";
import { checkEnv } from "@helper/env";
import { ALLOW_ORIGIN } from "@config/env";
import { serverErrorHandler } from "@helper/server";

checkEnv();
export const server: Express = express();

server.use(
  cors({
    origin: ALLOW_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
server.use(helmet());
server.use(json());
server.use(cookieParser());
server.use("/v1", router);
server.use(serverErrorHandler);
