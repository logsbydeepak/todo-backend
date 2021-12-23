import { Request, Response } from "express";

import {
  validateBody,
  validateGeneral,
  validateTask,
} from "../../helper/validator.helper";
import { TodoModel } from "../../model";

import { ErrorResponse, SuccessResponse } from "../../response";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const id = res.locals.userId;

    const bodyData = validateBody(req, res, req.body, 2);
    if (!bodyData) return;

    const task = validateGeneral(req, res, bodyData.task);
    if (!task) return;

    const status = validateTask(req, res, bodyData.status);
    if (!(status === true || status === false)) return;

    const newTodo = new TodoModel({
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
