import { Router } from "express";

import { createSession } from "./session/create.session";
import { deleteSession } from "./session/delete.session";
import { updateSession } from "./session/update.session";

import { checkAccessToken } from "@middleware";

export const sessionRouter: Router = Router();

sessionRouter.post("/", createSession);
sessionRouter.delete("/", checkAccessToken, deleteSession);
sessionRouter.put("/refresh", updateSession);
