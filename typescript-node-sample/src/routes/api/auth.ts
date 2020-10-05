/** @format */

import express from "express";

//  express router object
const router = express.Router();

// passport authorization
import isAuthenticated from "../../middlewares/authentication";

//  controller
import {
  signup,
  signupVerification,
  forgotPassword,
  verifyPasswordResetToken,
  resetPassword,
  login,
  isLogin,
  logout,
} from "../../controllers/auth";

//  routes
router.post("/signup", signup);
router.patch("/signup-verification/:id", signupVerification);

router.patch("/forgot-password", forgotPassword);
router.post("/verify-password-reset-token", verifyPasswordResetToken);
router.patch("/reset-password/:id", resetPassword);

router.post("/login", login);

router.get("/is-login", isAuthenticated(), isLogin);
router.post("/logout", isAuthenticated(), logout);

router.get("/check", isAuthenticated(), (req, res) => {
  return res.status(200).json({ msg: "inside req." });
});

export default router;
