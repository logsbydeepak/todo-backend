import { Router } from "express";

import { getUser } from "./user/get.user";
import { updateUser } from "./user/update.user";
import { createUser } from "./user/create.user";
import { deleteUser } from "./user/delete.user";

import { checkAccessToken } from "../middleware/checkAccessToken.middleware";
import { checkPassword } from "../middleware/checkPassword.middleware";

export const userRouter: Router = Router();

userRouter.post("/", createUser);
userRouter.get("/", checkAccessToken, getUser);
userRouter.patch("/", checkAccessToken, checkPassword, updateUser);
userRouter.delete("/", checkAccessToken, checkPassword, deleteUser);
