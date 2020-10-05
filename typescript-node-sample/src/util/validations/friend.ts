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

const getRequests = Joi.object().keys({
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

const sendRequest = Joi.object().keys({
  requestToId: ObjectId().required(),
});

const confirmRequest = Joi.object().keys({
  confirmRequestId: ObjectId().required(),
});

const deleteRequest = Joi.object().keys({
  friendRequestId: ObjectId().required(),
});

const unfriend = Joi.object().keys({
  friendId: ObjectId().required(),
});

export default class UserValidation {
  static get = get;
  static getRequests = getRequests;
  static sendRequest = sendRequest;
  static confirmRequest = confirmRequest;
  static deleteRequest = deleteRequest;
  static unfriend = unfriend;
}
