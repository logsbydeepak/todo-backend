import express, { Express, json } from "express";

import { checkEnv } from "../helper/env.helper";

checkEnv();
export const server: Express = express();

server.use(json());
