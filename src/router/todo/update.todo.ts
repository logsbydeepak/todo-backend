import { Request, Response } from "express";

import { TodoModel } from "@model";
import { ErrorResponse, SuccessResponse } from "@response";
import { validateBody, validateGeneral, validateTask } from "@helper/validator";

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const bodyData = validateBody(req.body, 3);
    const id = validateGeneral(bodyData.id);
    const task = validateGeneral(bodyData.task);
    const status = validateTask(bodyData.status);

    const dbTodo: any = await TodoModel.findById(id);
    if (!dbTodo) {
      return ErrorResponse(req, res, "BP", 10);
    }

    if (dbTodo.owner.toString() !== userId) {
      return ErrorResponse(req, res, "AU", 10);
    }

    dbTodo.task = task;
    dbTodo.status = status;

    await dbTodo.save();

    SuccessResponse(req, res, "TD", 13);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
