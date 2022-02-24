import { Router } from "express";

import { checkAccessToken } from "@middleware";
import readTodo from "./todo/read.todo";
import createTodo from "./todo/create.todo";
import deleteTodo from "./todo/delete.todo";
import updateTodo from "./todo/update.todo";

export const todoRouter: Router = Router();

todoRouter.post("/", checkAccessToken, createTodo);
todoRouter.get("/", checkAccessToken, readTodo);
todoRouter.put("/", checkAccessToken, updateTodo);
todoRouter.delete("/", checkAccessToken, deleteTodo);

export default todoRouter;
