import { NextFunction, Request, Response } from "express";

import { TodoModel } from "@model";
import { TodoModelType, TokenModelType } from "@types";
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

    const pageInt = parseInt(page);

    if (isNaN(pageInt)) {
      return ErrorResponse(req, res, "BP", 10);
    }

    if (status === "true" || status === "false" || status === "all") {
      const dbTodo: TodoModelType[] = await TodoModel.find({
        owner: userId,
        status: status === "all" ? 0 : status,
      });

      dbTodo.forEach((element: any) => {
        element.owner = undefined as unknown;
        element.__v = undefined;
      });

      return SuccessResponse(req, res, "TD", 12, dbTodo);
    }

    return ErrorResponse(req, res, "BP", 10);
  } catch (error: any) {
    return next(error);
  }
};
