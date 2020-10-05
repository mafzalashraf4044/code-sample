/** @format */

import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";

const ObjectId = JoiObjectId(Joi);

const add = Joi.object().keys({
  user: ObjectId().required(),
  post: ObjectId().required(),
});

const getTodaysClicks = Joi.object().keys({
  user: ObjectId().required(),
});

export default class UserValidation {
  static add = add;
  static getTodaysClicks = getTodaysClicks;
}
