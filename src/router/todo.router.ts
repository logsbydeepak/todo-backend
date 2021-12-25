import { Router } from "express";

import { readTodo } from "./todo/read.todo";
import { createTodo } from "./todo/create.todo";
import { deleteTodo } from "./todo/delete.todo";
import { updateTodo } from "./todo/update.todo";

import { checkAccessToken } from "@middleware";

export const todoRouter: Router = Router();

todoRouter.post("/", checkAccessToken, createTodo);
todoRouter.get("/", checkAccessToken, readTodo);
todoRouter.put("/", checkAccessToken, updateTodo);
todoRouter.delete("/", checkAccessToken, deleteTodo);
