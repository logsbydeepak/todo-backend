import { Request, Response } from "express";

import { ErrorResponse, SuccessResponse } from "../../response";

export const createUser = async (req: Request, res: Response) => {
  try {
    SuccessResponse(req, res, "AU", 10);
  } catch (error: any) {
    ErrorResponse(req, res, "IS", 10);
  }
};
