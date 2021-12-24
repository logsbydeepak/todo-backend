import { Request, Response } from "express";

import { TodoModel } from "../../model";
import { TodoModelType } from "../../types/model.types";
import { ErrorResponse, SuccessResponse } from "../../response";
import { validateGeneral } from "../../helper/validator.helper";

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const todoIdQuery = req.query.id;

    const todoId: string = validateGeneral(todoIdQuery as string);
    if (!todoId) return;

    const todo: any = await TodoModel.findById(todoId);

    if (!todo) {
      return ErrorResponse(req, res, "BP", 10);
    }

    if (todo.owner.toString() !== userId) {
      return ErrorResponse(req, res, "AU", 10);
    }

    await TodoModel.findByIdAndDelete(todoId);

    SuccessResponse(req, res, "TD", 11);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
