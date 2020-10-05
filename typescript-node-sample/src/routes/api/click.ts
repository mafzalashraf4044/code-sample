/** @format */

import express from "express";

//  express router object
const router = express.Router();

// passport authorization
import isAuthenticated from "../../middlewares/authentication";

//  controller
import * as ClickController from "../../controllers/click";

//  routes
router.post("/:postId", isAuthenticated(), ClickController.add);

router.get("/today", isAuthenticated(), ClickController.getTodaysClicks);

export default router;
