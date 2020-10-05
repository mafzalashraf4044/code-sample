/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Helpers from "../util/helpers";
import { User, UserDocument } from "../models/User";

//  constants
import ResponseMessages from "../constants/response";

export default class UserService {
  static getUser = async (where: object) => {
    return await User.findOne(where);
  };

  static getUserByEmail = async (email: string) => {
    return await User.findOne({
      email,
    }).lean();
  };

  static getUserByUsername = async (username: string) => {
    return await User.findOne({
      username,
    }).lean();
  };

  static canCreateUser = async (email: string, username: string) => {
    const result = {
      create: false,
      update: false,
    };

    const user = await UserService.checkExistingEmail(email, true);

    //  user does not exist in db, create new user
    if (_.isNull(user)) {
      await UserService.checkExistingUsername(username);
      result.create = true;
      return result;
    }

    //  unverified user exist, update the user with new input data
    if (!user.isVerified) {
      user.username !== username &&
        (await UserService.checkExistingUsername(username));

      result.update = true;
      return result;
    }

    return result;
  };

  static canUpdate = async (id: string, updateObj: UserDocument) => {
    const user = await UserService.getUserById(id);

    if (!_.isNil(updateObj.email)) {
      UserService.canUpdateEmail(user, updateObj);
    }

    if (!_.isNil(updateObj.username)) {
      UserService.canUpdateUsername(user, updateObj);
    }

    if (!_.isNil(updateObj.password)) {
      UserService.canUpdatePassword(user, updateObj);
    }

    return true;
  };

  static canUpdateEmail = (user: UserDocument, updateObj: UserDocument) => {
    if (user.email === updateObj.email) {
      throw boom.badRequest(ResponseMessages.SAME_EMAIL_PROVIDED_FOR_UPDATE);
    }

    if (user.changeEmailToken !== updateObj.changeEmailToken) {
      throw boom.badRequest(ResponseMessages.INVALID_VERIFICATION_TOKEN);
    }

    if (Helpers.isTokenExpired(user.changeEmailExpiresDt)) {
      throw boom.forbidden(ResponseMessages.VERIFICATION_TOKEN_EXPIRED);
    }

    UserService.checkExistingEmail(updateObj.email);

    return true;
  };

  static canUpdateUsername = (user: UserDocument, updateObj: UserDocument) => {
    if (user.username === updateObj.username) {
      throw boom.badRequest(ResponseMessages.SAME_USERNAME_PROVIDED_FOR_UPDATE);
    }

    if (user.changeUsernameToken !== updateObj.changeUsernameToken) {
      throw boom.badRequest(ResponseMessages.INVALID_VERIFICATION_TOKEN);
    }

    if (Helpers.isTokenExpired(user.changeUsernameExpiresDt)) {
      throw boom.forbidden(ResponseMessages.VERIFICATION_TOKEN_EXPIRED);
    }

    UserService.checkExistingUsername(updateObj.username);

    return true;
  };

  static canUpdatePassword = (user: UserDocument, updateObj: UserDocument) => {
    if (user.passwordResetToken !== updateObj.passwordResetToken) {
      throw boom.badRequest(ResponseMessages.INVALID_VERIFICATION_TOKEN);
    }

    if (Helpers.isTokenExpired(user.passwordResetExpiresDt)) {
      throw boom.forbidden(ResponseMessages.VERIFICATION_TOKEN_EXPIRED);
    }

    return true;
  };

  static canResetPassword = async (
    user: UserDocument,
    passwordResetToken: string,
  ) => {
    if (user.passwordResetToken !== passwordResetToken) {
      throw boom.badRequest(ResponseMessages.INVALID_VERIFICATION_TOKEN);
    }

    if (Helpers.isTokenExpired(user.passwordResetExpiresDt)) {
      throw boom.forbidden(ResponseMessages.VERIFICATION_TOKEN_EXPIRED);
    }

    return true;
  };

  static checkExistingEmail = async (
    email: string,
    isCreate: boolean = false,
  ) => {
    const user = await User.findOne({
      email,
    }).lean();

    //  isVerified check is used only for create, if an unverified user with the same email exist, override it.
    //  if it's not a create call, through an error irrespective of isVerified
    if (!_.isNull(user) && (!isCreate || user.isVerified)) {
      throw boom.conflict(ResponseMessages.EMAIL_ALREADY_EXIST);
    }

    return user;
  };

  static checkExistingUsername = async (username: string) => {
    const user = await User.findOne({
      username,
    });

    if (!_.isNull(user)) {
      throw boom.conflict(ResponseMessages.USERNAME_ALREADY_EXIST);
    }

    return user;
  };

  static getUserById = async (id: string) => {
    return await User.findById(id);
  };

  static addUser = async (user: UserDocument) => {
    return await User.create(user);
  };

  static updateUser = async (where: object, updateObj: any) => {
    if (!_.isNil(updateObj.password)) {
      updateObj.password = Helpers.hashPassword(updateObj.password);
    }

    return await User.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );
  };

  static comparePassword = (user: UserDocument, password: string) => {
    return user.comparePassword(password);
  };
}
