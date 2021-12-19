import { Router } from "express";

import { createUser } from "./user/create.user";
import { getUser } from "./user/get.user";
import { checkAccessToken } from "../middleware/checkAccessToken.middleware";

export const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", checkAccessToken, getUser);
