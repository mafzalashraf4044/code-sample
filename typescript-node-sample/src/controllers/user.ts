/** @format */

import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import status from "http-status";
import boom from "@hapi/boom";

import Types from "../types";
import UserValidation from "../util/validations/user";
import UserService from "../services/user";
import Helpers from "../util/helpers";
import { UserDocument } from "../models/User";
import ESService from "../services/elasticsearch";
import RabbitMQHelper from "../util/helpers/rabbitmq";
import ResponseMessages from "../constants/response";
import ESHelper from "../util/helpers/elasticsearch";

//  constants
import Constants from "../constants";

/**
 * @api {get} /user/get
 * @version 1.0
 * @description get posts
 * @param {string:queryParam} qText - query text
 * @param {array:queryParam} userNIn - user excluded
 * @param {object:queryParam} location - object id of text stylee - optional
 * @param {number:queryParam} page - post text - optional
 * @param {number:queryParam} limit - post image - optional
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  input validation
    const input = { ...req.query };

    const { error, value } = UserValidation.get.validate(input);

    if (error) {
      throw error;
    }

    const posts = await ESService.getUsers(value);

    return res.status(status.OK).json({
      posts,
      message: "Gets users successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /user/send-verification-token/:id
 * @version 1.0
 * @description send verification token
 * @param {string:params} id - user object id
 * @param {string:body} type - verification token type
 */
export const sendVerificationToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body };
    const { error, value } = UserValidation.sendVerificationToken.validate(
      input,
    );

    if (error) {
      throw error;
    }

    // where condition for fetching user
    const where = {
      _id: value.id,
      isVerified: true,
      archiveStatus: false,
      role: {
        $ne: Constants.ADMIN_ROLE,
      },
    };

    const tokenType: Types.TokenType =
      Constants.VERIFICATION_TOKEN_TYPES[value.type as Types.TokenTypes];

    //  verification token
    const verificationToken = Helpers.getFourDigitsRandomCode();

    const user = await UserService.updateUser(where, {
      [tokenType.key]: verificationToken,
      [tokenType.expiresDtKey]: Helpers.getTokenExpiresDt(),
    });

    if (_.isNull(user)) {
      throw boom.notFound(ResponseMessages.EMAIL_DOES_NOT_EXIST);
    }

    await RabbitMQHelper.send(
      RabbitMQHelper.Exchanges.email,
      RabbitMQHelper.RoutingKeys.verification_token_email,
      {
        email: user.email,
        code: verificationToken,
      },
    );

    return res.status(status.OK).json({
      message: "Verification code sent.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /user/update
 * @version 1.0
 * @description update user profile
 * @param {string:params} id - user object id
 * @param {string:body} email - user email address
 * @param {string:body} changeEmailToken - 4 digits token
 * @param {string:body} password - user password (min 6 characters)
 * @param {string:body} confirmPassword - user password (min 6 characters)
 * @param {string:body} passwordResetToken - 4 digits token
 * @param {string:body} username - username of user
 * @param {string:body} changeUsernameToken - 4 digits token
 * @param {string:body} image - user profile image
 * @param {string:body} firstName - user first name
 * @param {string:body} lastName - user last name
 * @param {string:body} gender - user gender (1 - Male, 2 = Female)
 * @param {boolean:body} isPublic - is user feed public
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.body, ...req.params };
    const { error, value } = UserValidation.update.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      _id: value.id,
    };

    const data = _.omit(value, "id");

    // verify token in case of email, username or password update
    await UserService.canUpdate(value.id, data as UserDocument);

    const user = await UserService.updateUser(where, data);

    return res.status(status.OK).json({
      user,
      message: "Updated successfull",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /user/clicks
 * @version 1.0
 * @description get user total clicks
 * @param {string:params} id - user object id
 */
export const getUserClicks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const { id: userId } = req.params;
    const input = { userId };
    const { error, value } = UserValidation.getUserClicks.validate(input);

    if (error) {
      throw error;
    }

    const { clicks } = await ESHelper.getById("user", userId);

    return res.status(status.OK).json({
      clicks,
      message: "Get user clicks successfull",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};
