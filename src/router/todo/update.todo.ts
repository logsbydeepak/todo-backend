import { NextFunction, Request, Response } from "express";

import { SuccessResponse } from "@response";
import { validateBody, validateEmpty, validateTask } from "@helper/validator";
import { TodoModelType, UpdateTodoBodyType } from "@types";
import { dbReadTodo } from "@helper/db";

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const bodyData: UpdateTodoBodyType = validateBody(req.body, 3);
    const todoId: string = validateEmpty(bodyData.id, "BP", 11);
    const task: string = validateEmpty(bodyData.task, "BP", 11);
    const status: boolean = validateTask(bodyData.status);

    const dbTodo: TodoModelType = await dbReadTodo(todoId, userId);

    dbTodo.task = task;
    dbTodo.status = status;

    await dbTodo.save();

    return SuccessResponse(req, res, "TD", 13);
  } catch (error: any) {
    return next(error);
  }
};
