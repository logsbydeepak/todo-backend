import { Router } from "express";

import { createTodo } from "./todo/create.todo";
import { checkAccessToken } from "../middleware/checkAccessToken.middleware";

export const todoRouter = Router();

todoRouter.post("/", checkAccessToken, createTodo);
