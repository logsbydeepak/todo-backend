import { Router } from "express";

import { loginSession } from "./session/login.session";
import { logoutSession } from "./session/logout.session";
import { refreshSession } from "./session/refresh.session";
import { checkAccessToken } from "../middleware/checkAccessToken.middleware";

export const sessionRouter: Router = Router();

sessionRouter.get("/", loginSession);
sessionRouter.delete("/", checkAccessToken, logoutSession);
sessionRouter.patch("/refresh", refreshSession);
