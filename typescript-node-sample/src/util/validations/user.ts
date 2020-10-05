/** @format */

import _ from "lodash";
import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";

const ObjectId = JoiObjectId(Joi);

//  constants
import Constants from "../../constants";

const get = Joi.object().keys({
  qText: Joi.string().required(),
  userNIn: Joi.array()
    .items(ObjectId)
    .max(500)
    .required(),
  location: Joi.object()
    .keys({
      lat: Joi.number()
        .min(-90)
        .max(90)
        .required(),
      lng: Joi.number()
        .min(-180)
        .max(180)
        .required(),
    })
    .optional(),
  page: Joi.number()
    .default(1)
    .min(1)
    .max(100)
    .optional(),
  limit: Joi.number()
    .default(10)
    .min(5)
    .max(20)
    .optional(),
});

const sendVerificationToken = Joi.object().keys({
  id: ObjectId().required(),
  type: Joi.string()
    .valid(...Constants.VERIFICATION_TOKENS)
    .required(),
});

const update = Joi.object()
  .keys({
    id: ObjectId().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .optional(),
    changeEmailToken: Joi.when("email", {
      is: Joi.exist(),
      then: Joi.string()
        .length(4)
        .required(),
      otherwise: Joi.string()
        .allow(null)
        .default(null),
    }),

    password: Joi.string()
      .min(6)
      .max(200)
      .optional(),
    confirmPassword: Joi.when("password", {
      is: Joi.exist(),
      then: Joi.string()
        .min(6)
        .max(200)
        .valid(Joi.ref("password"))
        .required(),
      otherwise: Joi.forbidden(),
    }),
    passwordResetToken: Joi.when("password", {
      is: Joi.exist(),
      then: Joi.string()
        .length(4)
        .required(),
      otherwise: Joi.string()
        .allow(null)
        .default(null),
    }),

    username: Joi.string()
      .alphanum()
      .min(4)
      .max(100)
      .optional(),
    changeUsernameToken: Joi.when("username", {
      is: Joi.exist(),
      then: Joi.string()
        .length(4)
        .required(),
      otherwise: Joi.string()
        .allow(null)
        .default(null),
    }),

    image: Joi.string()
      .uri()
      .optional(),

    firstName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .max(100)
      .optional(),
    lastName: Joi.when("firstName", {
      is: Joi.exist(),
      then: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .max(100)
        .required(),
      otherwise: Joi.forbidden(),
    }),
    gender: Joi.string()
      .valid(Constants.MALE, Constants.FEMALE)
      .optional(),
    isPublic: Joi.boolean().optional(),
  })
  .xor(...Constants.USER_PROFILE_ALLOWED_UPDATE_KEYS);

const getUserClicks = Joi.object().keys({
  userId: ObjectId().required(),
});

export default class UserValidation {
  static get = get;
  static sendVerificationToken = sendVerificationToken;
  static update = update;
  static getUserClicks = getUserClicks;
}
