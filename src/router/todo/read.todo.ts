import { Request, Response } from "express";
import { validateGeneral } from "../../helper/validator.helper";
import { TodoModel, TokenModel } from "../../model";
import { ErrorResponse, SuccessResponse } from "../../response";

export const readTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = res.locals.userId;

    const status = validateGeneral(req, res, req.query.status as string);
    if (!status) return;

    const page = validateGeneral(req, res, req.query.page as string);
    if (!page) return;

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

    SuccessResponse(req, res, "TD", 12, dbTodo);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
