/** @format */

import express from "express";

//  express router object
const router = express.Router();

// passport authorization
import isAuthenticated from "../../middlewares/authentication";

//  controller
import * as UserController from "../../controllers/user";

//  routes
router.get("/", isAuthenticated(), UserController.get);
router.post(
  "/send-verification-token/:id",
  isAuthenticated(),
  UserController.sendVerificationToken,
);
router.put("/:id", isAuthenticated(), UserController.update);
router.put("/clicks/:id", isAuthenticated(), UserController.getUserClicks);

export default router;
