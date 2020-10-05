/** @format */

import _ from "lodash";
import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";

const ObjectId = JoiObjectId(Joi);

//  constants
import Constants from "../../constants";

const signup = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(6)
    .max(200)
    .required(),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(100)
    .required(),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .max(100)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .max(100)
    .required(),
  gender: Joi.string()
    .valid(Constants.MALE, Constants.FEMALE)
    .required(),
  lat: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  lng: Joi.number()
    .min(-180)
    .max(180)
    .required(),
});

const signupVerification = Joi.object().keys({
  id: ObjectId().required(),
  verificationToken: Joi.string()
    .length(4)
    .required(),
});

const forgotPassword = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
});

const verifyPasswordResetToken = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  passwordResetToken: Joi.string()
    .length(4)
    .required(),
});

const resetPassword = Joi.object().keys({
  id: ObjectId().required(),
  password: Joi.string()
    .min(6)
    .max(200)
    .required(),
  confirmPassword: Joi.string()
    .min(6)
    .max(200)
    .valid(Joi.ref("password"))
    .required(),
  passwordResetToken: Joi.string()
    .length(4)
    .required(),
});

const login = Joi.object().keys({
  username: Joi.alternatives().try(
    Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    Joi.string()
      .alphanum()
      .min(4)
      .max(100)
      .required(),
  ),
  password: Joi.string()
    .min(6)
    .max(200)
    .required(),
});

export default class AuthValidation {
  static signup = signup;
  static login = login;
  static signupVerification = signupVerification;
  static forgotPassword = forgotPassword;
  static verifyPasswordResetToken = verifyPasswordResetToken;
  static resetPassword = resetPassword;
}
