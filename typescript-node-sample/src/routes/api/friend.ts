/** @format */

import express from "express";

//  express router object
const router = express.Router();

// passport authorization
import isAuthenticated from "../../middlewares/authentication";

//  controller
import * as FriendController from "../../controllers/friend";

//  routes
router.get("/", isAuthenticated(), FriendController.get);
router.get("/requests", isAuthenticated(), FriendController.getRequests);
router.post(
  "/send-friend-request",
  isAuthenticated(),
  FriendController.sendRequest,
);
router.post(
  "/confirm-friend-request",
  isAuthenticated(),
  FriendController.confirmRequest,
);
router.delete(
  "/delete-friend-request",
  isAuthenticated(),
  FriendController.deleteRequest,
);
router.post("/unfriend", isAuthenticated(), FriendController.unfriend);

export default router;
