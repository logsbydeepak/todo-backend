import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { dbReadTodo } from "@helper/db";
import { SuccessResponse } from "@response";
import { validateGeneral } from "@helper/validator";

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const todoIdQuery: string = req.query.id as string;

    const todoId: string = validateGeneral(todoIdQuery);

    await dbReadTodo(todoId, userId);
    await TodoModel.findByIdAndDelete(todoId);

    return SuccessResponse(req, res, "TD", 11);
  } catch (error: any) {
    return next(error);
  }
};
