/** @format */

import express from "express";

//  express router object
const router = express.Router();

// passport authorization
import isAuthenticated from "../../middlewares/authentication";

//  controller
import * as BlockedController from "../../controllers/blocked";

//  routes
router.get("/", isAuthenticated(), BlockedController.get);
router.post("/block", isAuthenticated(), BlockedController.block);
router.post("/unblock", isAuthenticated(), BlockedController.unblock);

export default router;
