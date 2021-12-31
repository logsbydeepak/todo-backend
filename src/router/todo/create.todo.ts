import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { SuccessResponse } from "@response";
import { CreateTodoBodyType, TodoModelType } from "@types";
import { validateBody, validateEmpty, validateTask } from "@helper/validator";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = res.locals.userId;

    const bodyData: CreateTodoBodyType = validateBody(req.body, 2);
    const task: string = validateEmpty(bodyData.task, "BP", 21) as string;
    const status: boolean = validateTask(bodyData.status);

    const newTodo: TodoModelType = new TodoModel({
      owner: id,
      task,
      status,
    });

    await newTodo.save();
    return SuccessResponse(res, {
      id: newTodo._id,
      task: newTodo.task,
      status: newTodo.status,
    });
  } catch (error: any) {
    return next(error);
  }
};
