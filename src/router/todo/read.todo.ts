import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { validateEmpty } from "@helper/validator";
import { ErrorResponse, SuccessResponse } from "@response";

export const readTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = res.locals.userId;

    const status = validateEmpty(req.query.status as string);
    const page = validateEmpty(req.query.page as string);

    let dbTodo: any;
    const pageInt = parseInt(page);

    if (isNaN(pageInt)) {
      return ErrorResponse(req, res, "BP", 10);
    }

    switch (status) {
      case "true":
        dbTodo = await TodoModel.find({ owner: userId, status: true }).limit(
          pageInt
        );
        break;

      case "false":
        dbTodo = await TodoModel.find({ owner: userId, status: false }).limit(
          pageInt
        );
        break;

      case "all":
        dbTodo = await TodoModel.find({ owner: userId, status: 0 }).limit(
          pageInt
        );
        break;
      default:
        return ErrorResponse(req, res, "BP", 10);
    }

    dbTodo.forEach((_: any, index: number) => {
      dbTodo[index].owner = undefined;
      dbTodo[index].__v = undefined;
    });

    return SuccessResponse(req, res, "TD", 12, dbTodo);
  } catch (error: any) {
    return next(error);
  }
};
