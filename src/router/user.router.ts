import { Router } from "express";

import { readUser } from "./user/read.user";
import { updateUser } from "./user/update.user";
import { createUser } from "./user/create.user";
import { deleteUser } from "./user/delete.user";

import { checkAccessToken, checkPassword } from "@middleware";

export const userRouter: Router = Router();

userRouter.post("/", createUser);
userRouter.get("/", checkAccessToken, readUser);
userRouter.put("/", checkAccessToken, checkPassword, updateUser);
userRouter.delete("/", checkAccessToken, checkPassword, deleteUser);
