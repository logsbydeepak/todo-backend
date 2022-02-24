import { Router } from "express";

import todoRouter from "./todo.router";
import userRouter from "./user.router";
import sessionRouter from "./session.router";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/session", sessionRouter);
router.use("/todo", todoRouter);

export default router;
