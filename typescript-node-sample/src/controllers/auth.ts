/** @format */

import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import status from "http-status";
import boom from "@hapi/boom";

import AuthValidation from "../util/validations/auth";
import UserPlugins from "../util/plugins/user";
import UserService from "../services/user";
import Helpers from "../util/helpers";
import ESHelper from "../util/helpers/elasticsearch";
import RabbitMQHelper from "../util/helpers/rabbitmq";

//  constants
import Constants from "../constants";
import ResponseMessages from "../constants/response";

/**
 * @api {post} /auth/signup
 * @version 1.0
 * @description signup a new user
 * @param {string:body} email - user email address
 * @param {string:body} password - user password (min 6 characters)
 * @param {string:body} username - username of user
 * @param {string:body} firstName - user first name
 * @param {string:body} lastName - user last name
 * @param {string:body} gender - user gender (1 - Male, 2 = Female)
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body };
    const { error, value } = AuthValidation.signup.validate(input);

    if (error) {
      throw error;
    }

    //  if a verified user with this email already exist, throw conflict
    const { create, update } = await UserService.canCreateUser(
      value.email,
      value.username,
    );

    //  signup verification token
    value.verificationToken = Helpers.getFourDigitsRandomCode();

    let user;
    const data = UserPlugins.transform(value);

    if (create) {
      user = await UserService.addUser(data);
    } else if (update) {
      const where = { email: data.email };
      user = await UserService.updateUser(where, data);
    }

    await RabbitMQHelper.send(
      RabbitMQHelper.Exchanges.email,
      RabbitMQHelper.RoutingKeys.signup_verification_code_email,
      {
        email: user.email,
        code: user.verificationToken,
      },
    );

    return res.status(status.OK).json({
      userId: user._id,
      message: "Signup successfull",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /auth/signup-verification
 * @version 1.0
 * @description verify new user
 * @param {string:params} id - user object id
 * @param {string:body} verificationToken - 4 digits verification token
 */
export const signupVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body, ...req.params };
    const {
      error,
      value: { id, verificationToken },
    } = AuthValidation.signupVerification.validate(input);

    if (error) {
      throw error;
    }

    // where condition for fetching user
    const where = {
      _id: id,
      archiveStatus: false,
      role: {
        $ne: Constants.ADMIN_ROLE,
      },
    };

    const user = await UserService.getUser(where);

    if (_.isNull(user)) {
      throw boom.notFound(ResponseMessages.USER_DOES_NOT_EXIST);
    }

    if (user.isVerified) {
      throw boom.badRequest(ResponseMessages.USER_ALREADY_VERIFIED);
    }

    if (verificationToken !== user.verificationToken) {
      throw boom.badRequest(ResponseMessages.INVALID_VERIFICATION_TOKEN);
    }

    await UserService.updateUser(where, {
      isVerified: true,
      verificationToken: null,
    });

    // send to Elastic Search
    const data = UserPlugins.transfromForES(user);
    await ESHelper.add("user", data);

    return res.status(status.OK).json({
      message: "User email verified successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /auth/forgot-password
 * @version 1.0
 * @description forgot password
 * @param {string:body} email - user email address
 */
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body };
    const { error, value } = AuthValidation.forgotPassword.validate(input);

    if (error) {
      throw error;
    }

    // where condition for fetching user
    const where = {
      email: value.email,
      isVerified: true,
      archiveStatus: false,
      role: {
        $ne: Constants.ADMIN_ROLE,
      },
    };

    //  forgot password token
    const passwordResetToken = Helpers.getFourDigitsRandomCode();

    const user = await UserService.updateUser(where, {
      passwordResetToken,
      passwordResetExpiresDt: Helpers.getTokenExpiresDt(),
    });

    if (_.isNull(user)) {
      throw boom.notFound(ResponseMessages.EMAIL_DOES_NOT_EXIST);
    }

    await RabbitMQHelper.send(
      RabbitMQHelper.Exchanges.email,
      RabbitMQHelper.RoutingKeys.forgot_password_email,
      {
        email: user.email,
        code: user.passwordResetToken,
      },
    );

    return res.status(status.OK).json({
      message: "Reset password code sent.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /auth/verify-password-reset-token
 * @version 1.0
 * @description verify password reset token
 * @param {string:body} email - user email address
 * @param {string:body} passwordResetToken - 4 digits verification token
 */
export const verifyPasswordResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body };
    const {
      error,
      value: { email, passwordResetToken },
    } = AuthValidation.verifyPasswordResetToken.validate(input);

    if (error) {
      throw error;
    }

    // where condition for fetching user
    const where = {
      email,
      isVerified: true,
      archiveStatus: false,
      role: {
        $ne: Constants.ADMIN_ROLE,
      },
    };

    const user = await UserService.getUser(where);

    if (_.isNull(user)) {
      throw boom.notFound(ResponseMessages.USER_DOES_NOT_EXIST);
    }

    UserService.canResetPassword(user, passwordResetToken);

    return res.status(status.OK).json({
      userId: user._id,
      message: "Reset password code verified.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /auth/reset-password
 * @version 1.0
 * @description reset password
 * @param {string:params} id - user object id
 * @param {string:body} password - new password
 * @param {string:body} confirmPassword - confirm new password
 * @param {string:body} passwordResetToken - password reset token
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body, ...req.params };
    const {
      error,
      value: { id, password, passwordResetToken },
    } = AuthValidation.resetPassword.validate(input);

    if (error) {
      throw error;
    }

    // where condition for fetching user
    const where = {
      _id: id,
      archiveStatus: false,
    };

    const user = await UserService.getUser(where);

    if (_.isNull(user)) {
      throw boom.notFound(ResponseMessages.USER_DOES_NOT_EXIST);
    }

    UserService.canResetPassword(user, passwordResetToken);

    await UserService.updateUser(where, {
      password,
      passwordResetToken: null,
    });

    return res.status(status.OK).json({
      message: "Password reset successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /auth/login
 * @version 1.0
 * @description login an existing user
 * @param {string:body} email - user email address
 * @param {string:body} password - user password (min 6 characters)
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const { error, value } = AuthValidation.login.validate(req.body);

    if (error) {
      throw error;
    }

    const where = {
      $or: [{ email: value.username }, { username: value.username }],
      archiveStatus: false,
      role: {
        $ne: Constants.ADMIN_ROLE,
      },
    };

    const user = await UserService.getUser(where);

    if (_.isNull(user)) {
      throw boom.unauthorized(ResponseMessages.INVALID_CREDENTIALS);
    }

    if (!user.isVerified) {
      throw boom.unauthorized(ResponseMessages.USER_NOT_VERIFIED);
    }

    const validPassword = UserService.comparePassword(user, value.password);

    if (!validPassword) {
      throw boom.unauthorized(ResponseMessages.INVALID_CREDENTIALS);
    }

    const token = Helpers.generateJwt(user.id);

    const esUser = await ESHelper.getById("user", user.id);

    return res.status(status.OK).json({
      user: esUser,
      token,
      message: "Login successfull",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /auth/is-login
 * @version 1.0
 * @description is user logged in
 */
export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (_.isNil(user)) {
      throw boom.unauthorized(ResponseMessages.UNAUTHORIZED);
    }

    return res.status(status.OK).json({
      message: "User is logged in.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /auth/logout
 * @version 1.0
 * @description logout user
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // remove from redis

    return res.status(status.OK).json({
      msg: "Logout successfull.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};
