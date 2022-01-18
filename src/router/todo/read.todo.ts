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
    const skip: string = validateEmpty(req.query.skip as string, "QP", 13);
    const limit: string = validateEmpty(req.query.limit as string, "QP", 16);

    const skipInt: number = parseInt(skip);
    const limitInt: number = parseInt(limit);

    if (isNaN(skipInt)) {
      return ErrorResponse(res, "QP", 14);
    }

    if (isNaN(limitInt)) {
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

      dbTodo.forEach(
        (element: {
          owner: string | undefined;
          __v: string | undefined;
          updatedAt: string | undefined;
        }) => {
          element.owner = undefined;
          element.__v = undefined;
          element.updatedAt = undefined;
        }
      );

      return SuccessResponse(res, 200, dbTodo);
    }

    return ErrorResponse(res, "QP", 15);
  } catch (error: any) {
    return next(error);
  }
};
