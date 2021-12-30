import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { dbReadTodo } from "@helper/db";
import { SuccessResponse } from "@response";
import { validateEmpty } from "@helper/validator";

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;
    const todoIdQuery: string = req.query.id as string;

    const todoId: string = validateEmpty(todoIdQuery, "QP", 11) as string;

    await dbReadTodo(todoId, userId);
    await TodoModel.findByIdAndDelete(todoId);

    return SuccessResponse(res, { message: "Todo not found" });
  } catch (error: any) {
    return next(error);
  }
};
