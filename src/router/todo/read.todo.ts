import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { TodoModelType } from "@types";
import { validateEmpty } from "@helper/validator";
import { ErrorResponse, SuccessResponse } from "@response";

const readTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = res.locals;
    const status: string = validateEmpty(req.query.status as string, "QP", 12);
    const skip: string = validateEmpty(req.query.skip as string, "QP", 13);
    const limit: string = validateEmpty(req.query.limit as string, "QP", 16);

    const skipInt: number = parseInt(skip, 10);
    const limitInt: number = parseInt(limit, 10);

    if (Number.isNaN(skipInt)) {
      return ErrorResponse(res, "QP", 14);
    }

    if (Number.isNaN(limitInt)) {
      return ErrorResponse(res, "QP", 17);
    }

    if (status === "true" || status === "false" || status === "all") {
      const dbTodo: TodoModelType[] = await TodoModel.find({
        owner: userId,
        status: status === "all" ? [true, false] : status,
      })
        .sort("-updatedAt")
        .skip(skipInt)
        .limit(limitInt);

      const newDBTodo = [];

      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      dbTodo.forEach((element) => {
        const { _id, task, status: _status, updatedAt } = element;
        newDBTodo.push({ _id, task, status: _status, updatedAt });
      });

      return SuccessResponse(res, 200, dbTodo);
    }

    return ErrorResponse(res, "QP", 15);
  } catch (error: any) {
    return next(error);
  }
};

export default readTodo;
