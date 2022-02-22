import { Router } from "express";

import { createSession } from "./session/create.session";
import { deleteSession } from "./session/delete.session";
import { updateSession } from "./session/update.session";

import { checkAccessToken, checkPassword } from "@middleware";
import { deleteAllSession } from "./session/deleteAll.session";

export const sessionRouter: Router = Router();

sessionRouter.post("/", createSession);
sessionRouter.put("/refresh", updateSession);
sessionRouter.delete("/", checkAccessToken, deleteSession);
sessionRouter.delete("/all", checkAccessToken, checkPassword, deleteAllSession);
