import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { dbReadTodo } from "@helper/db";
import { validateEmpty } from "@helper/validator";

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = res.locals;
    const todoIdQuery: string = req.query.id as string;

    const todoId: string = validateEmpty(todoIdQuery, "QP", 11) as string;

    await dbReadTodo(todoId, userId);
    await TodoModel.findByIdAndDelete(todoId);

    res.statusCode = 204;
    res.send();
  } catch (error: any) {
    next(error);
  }
};

export default deleteTodo;
