import { Router } from "express";
import { sessionRouter } from "./session.user";
import { userRouter } from "./user.router";

export const router = Router();

router.use("/user", userRouter);
router.use("/session", sessionRouter);
