import { Router } from "express";
import { checkAccessToken } from "../middleware/checkAccessToken.middleware";

import { loginSession } from "./session/login.session";
import { logoutSession } from "./session/logout.session";

export const sessionRouter = Router();

sessionRouter.get("/", loginSession);
sessionRouter.delete("/", checkAccessToken, logoutSession);
// userRouter.patch("/refresh");
// userRouter.delete("/refresh");
