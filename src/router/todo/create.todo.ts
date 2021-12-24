import { Request, Response } from "express";

import {
  validateBody,
  validateGeneral,
  validateTask,
} from "../../helper/validator.helper";
import { TodoModel } from "../../model";

import { ErrorResponse, SuccessResponse } from "../../response";
import { CreateTodoBodyType } from "../../types/validator.types";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const id: string = res.locals.userId;

    const bodyData: CreateTodoBodyType = validateBody(req.body, 2);
    if (!bodyData) return;

    const task: string = validateGeneral(bodyData.task);

    const status: boolean = validateTask(bodyData.status);

    const newTodo: any = new TodoModel({
      owner: id,
      task,
      status,
    });

    newTodo.save();
    SuccessResponse(req, res, "TD", 10);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
