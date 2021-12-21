import { Router } from "express";

import { loginSession } from "./session/login.session";

export const sessionRouter = Router();

sessionRouter.get("/", loginSession);
// userRouter.delete("/");
// userRouter.patch("/refresh");
// userRouter.delete("/refresh");
