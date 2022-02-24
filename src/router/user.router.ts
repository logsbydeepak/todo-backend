import { Router } from "express";

import { checkAccessToken, checkPassword } from "@middleware";
import { readUser } from "./user/read.user";
import { updateUser } from "./user/update.user";
import { createUser } from "./user/create.user";
import { deleteUser } from "./user/delete.user";

export const userRouter: Router = Router();

userRouter.post("/", createUser);
userRouter.get("/", checkAccessToken, readUser);
userRouter.put("/", checkAccessToken, checkPassword, updateUser);
userRouter.delete("/", checkAccessToken, checkPassword, deleteUser);
