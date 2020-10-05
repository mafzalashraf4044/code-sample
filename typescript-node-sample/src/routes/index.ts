/** @format */

import express, { Request, Response } from "express";

//  routes
import authRouter from "./api/auth";
import userRouter from "./api/user";
import postRouter from "./api/post";

//  express router object
const router = express.Router();

router.get("/status", (req: Request, res: Response) => {
  res.send({ status: "OK" });
}); // api status

router.use("/auth", authRouter); // mount auth paths
router.use("/user", userRouter); // mount user paths
router.use("/post", postRouter); // mount post paths

export default router;
