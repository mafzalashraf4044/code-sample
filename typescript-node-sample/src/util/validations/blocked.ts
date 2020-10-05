/** @format */

import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";

const ObjectId = JoiObjectId(Joi);

const get = Joi.object().keys({
  page: Joi.number()
    .optional()
    .default(1)
    .min(1)
    .max(50),
  limit: Joi.number()
    .optional()
    .default(10)
    .min(5)
    .max(20),
});

const block = Joi.object().keys({
  blockUserId: ObjectId().required(),
});

const unblock = Joi.object().keys({
  blockedId: ObjectId().required(),
});

export default class UserValidation {
  static get = get;
  static block = block;
  static unblock = unblock;
}
