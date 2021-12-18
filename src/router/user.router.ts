import { Router } from "express";

import { createUser } from "./user/create.user";

export const userRouter = Router();

userRouter.post("/", createUser);
