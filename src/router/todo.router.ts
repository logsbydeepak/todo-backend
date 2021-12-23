import { Router } from "express";

import { getTodo } from "./todo/get.todo";
import { createTodo } from "./todo/create.todo";
import { deleteTodo } from "./todo/delete.todo";
import { updateTodo } from "./todo/update.todo";
import { checkAccessToken } from "../middleware/checkAccessToken.middleware";

export const todoRouter: Router = Router();

todoRouter.get("/", checkAccessToken, getTodo);
todoRouter.post("/", checkAccessToken, createTodo);
todoRouter.delete("/", checkAccessToken, deleteTodo);
todoRouter.patch("/", checkAccessToken, updateTodo);
