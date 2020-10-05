/** @format */

import express from "express";

//  express router object
const router = express.Router();

// passport authorization
import isAuthenticated from "../../middlewares/authentication";

//  controller
import * as PostController from "../../controllers/post";

//  routes
router.get("/", isAuthenticated(), PostController.get);
router.post("/", isAuthenticated(), PostController.add);
router.put("/:id", isAuthenticated(), PostController.update);
router.delete("/:id", isAuthenticated(), PostController.destroy);
router.get("/user/:userId", isAuthenticated(), PostController.getByUserId);

// feedback routes
router.post(
  "/:postId/feeling-same",
  isAuthenticated(),
  PostController.toggleFeelingSame,
); // add feedback to a post
router.get(
  "/:postId/feeling-same",
  isAuthenticated(),
  PostController.getFeelingSame,
); // get feeling same for post owner
router.get(
  "/:postId/is-feeling-same",
  isAuthenticated(),
  PostController.isFeelingSame,
); // check if user is feeling same for a post

router.post("/:postId/comment", isAuthenticated(), PostController.addComment); // add feedback to a post
router.get("/:postId/comment", isAuthenticated(), PostController.getComments); // get comments for a post
router.put(
  "/:postId/comment/:id",
  isAuthenticated(),
  PostController.updateComment,
);
router.delete(
  "/:postId/comment/:id",
  isAuthenticated(),
  PostController.deleteComment,
);

router.post(
  "/:postId/reveal-request",
  isAuthenticated(),
  PostController.toggleRevealRequest,
); // add feedback to a post
router.get(
  "/:postId/reveal-request",
  isAuthenticated(),
  PostController.getRevealRequests,
); // get reveal requests for post owner
router.get(
  "/:postId/is-reveal-request",
  isAuthenticated(),
  PostController.isRevealRequest,
); // check if user has reveal requested for a post
router.post(
  "/:postId/reveal-post/",
  isAuthenticated(),
  PostController.revealPost,
); // reveal post to a user by post owner

router.post(
  "/get-posting-options/",
  isAuthenticated(),
  PostController.getPostingOptions,
); // get moodTypes, presets, textStyles

export default router;
