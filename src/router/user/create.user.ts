import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  res.send("Create user");
};
