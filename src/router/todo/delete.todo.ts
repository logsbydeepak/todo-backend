import { Request, Response } from "express";
import { TodoModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const todoId = req.query.id;
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
