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
    const status: string = validateEmpty(req.query.status as string, "QP", 12);
    const page: string = validateEmpty(req.query.page as string, "QP", 13);

    const pageInt: number = parseInt(page);

    if (isNaN(pageInt)) {
      return ErrorResponse(res, "QP", 14);
    }

    if (status === "true" || status === "false" || status === "all") {
      const dbTodo: TodoModelType[] = await TodoModel.find({
        owner: userId,
        status: status === "all" ? [true, false] : status,
      }).limit(pageInt);

      dbTodo.forEach(
        (element: { owner: string | undefined; __v: string | undefined }) => {
          element.owner = undefined;
          element.__v = undefined;
        }
      );

      return SuccessResponse(res, 200, dbTodo);
    }

    return ErrorResponse(res, "QP", 15);
  } catch (error: any) {
    return next(error);
  }
};
