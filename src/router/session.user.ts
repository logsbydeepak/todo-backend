import { Router } from "express";

import { loginSession } from "./session/login.session";
import { logoutSession } from "./session/logout.session";
import { refreshSession } from "./session/refresh.session";
import { checkRefreshToken } from "../middleware/checkRefreshToken.middleware";
import { checkAccessToken } from "../middleware/checkAccessToken.middleware";

export const sessionRouter = Router();

sessionRouter.get("/", loginSession);
sessionRouter.delete("/", checkAccessToken, logoutSession);
sessionRouter.patch("/refresh", refreshSession);
