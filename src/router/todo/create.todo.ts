import { Request, Response } from "express";

import {
  validateBody,
  validateGeneral,
  validateTask,
} from "../../helper/validator.helper";
import { TodoModel } from "../../model";

import { ErrorResponse, SuccessResponse } from "../../response";
import { UserModelType } from "../../types/model.types";
import {
  BodyDataType,
  CreateTodoBodyType,
  CreateUserBodyType,
} from "../../types/validator.types";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const id: string = res.locals.userId;

    const bodyData: CreateTodoBodyType | void = validateBody(
      req,
      res,
      req.body,
      2
    );
    if (!bodyData) return;

    const task: string | void = validateGeneral(req, res, bodyData.task);
    if (!task) return;

    const status: boolean | void = validateTask(req, res, bodyData.status);
    if (!(status === true || status === false)) return;

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
