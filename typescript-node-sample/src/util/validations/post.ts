/** @format */

import _ from "lodash";
import Joi from ".";
import JoiObjectId from "joi-objectid";

const ObjectId = JoiObjectId(Joi);

//  constants
import Constants from "../../constants";

const get = Joi.object().keys({
  userIn: Joi.array()
    .max(500)
    .required(),
  userNIn: Joi.array()
    .items(ObjectId)
    .max(500)
    .required(),
  postNIn: Joi.array()
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

const add = Joi.object().keys({
  user: ObjectId().required(),
  moodType: ObjectId().optional(),
  preset: Joi.when("text", {
    is: Joi.string().exist(),
    then: Joi.any().valid(null),
    otherwise: ObjectId().optional(),
  }),
  textStyle: Joi.when("text", {
    is: Joi.string().exist(),
    then: ObjectId().required(),
    otherwise: Joi.any().valid(null),
  }),
  text: Joi.string()
    .max(300)
    .allow("")
    .optional(),
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
    .required(),
  image: Joi.string()
    .uri()
    .optional(),
  audio: Joi.string()
    .uri()
    .optional(),
  video: Joi.string()
    .uri()
    .optional(),
  userMode: Joi.string()
    .valid(...Constants.USER_MODES)
    .required(),
  postType: Joi.string()
    .valid(...Constants.POST_TYPES)
    .required(),
});

const update = Joi.object().keys({
  id: ObjectId().required(),
  moodType: ObjectId().optional(),
  preset: Joi.when("text", {
    is: Joi.string().exist(),
    then: Joi.any().valid(null),
    otherwise: ObjectId().optional(),
  }),
  textStyle: Joi.when("text", {
    is: Joi.string().exist(),
    then: ObjectId().required(),
    otherwise: Joi.any().valid(null),
  }),
  text: Joi.string()
    .max(300)
    .allow("")
    .optional(),
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
  image: Joi.string()
    .uri()
    .optional(),
  audio: Joi.string()
    .uri()
    .optional(),
  video: Joi.string()
    .uri()
    .optional(),
  userMode: Joi.string()
    .valid(...Constants.USER_MODES)
    .optional(),
  postType: Joi.string()
    .valid(...Constants.POST_TYPES)
    .optional(),
});

const destroy = Joi.object().keys({
  id: ObjectId().required(),
});

const getByUserId = Joi.object().keys({
  userId: ObjectId().required(),
  postNIn: Joi.array()
    .items(Joi.string())
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

const toggleFeelingSame = Joi.object().keys({
  postId: ObjectId().required(),
});

const getFeelingSame = Joi.object().keys({
  postId: ObjectId().required(),
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

const isFeelingSame = Joi.object().keys({
  postId: ObjectId().required(),
});

const addComment = Joi.object().keys({
  postId: ObjectId().required(),
  text: Joi.string()
    .max(1000)
    .required(),
  userMode: Joi.string()
    .valid(...Constants.USER_MODES)
    .required(),
});

const getComments = Joi.object().keys({
  postId: ObjectId().required(),
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

const updateComment = Joi.object().keys({
  postId: ObjectId().required(),
  id: ObjectId().required(),
  text: Joi.string()
    .max(1000)
    .required(),
  userMode: Joi.string()
    .valid(...Constants.USER_MODES)
    .required(),
});

const deleteComment = Joi.object().keys({
  postId: ObjectId().required(),
  id: ObjectId().required(),
});

const toggleRevealRequest = Joi.object().keys({
  postId: ObjectId().required(),
});

const getRevealRequests = Joi.object().keys({
  postId: ObjectId().required(),
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

const isRevealRequest = Joi.object().keys({
  postId: ObjectId().required(),
});

const revealPost = Joi.object().keys({
  postId: ObjectId().required(),
  revealTo: ObjectId().required(),
});

export default class PostValidation {
  static get = get;
  static add = add;
  static update = update;
  static destroy = destroy;
  static getByUserId = getByUserId;
  static toggleFeelingSame = toggleFeelingSame;
  static getFeelingSame = getFeelingSame;
  static isFeelingSame = isFeelingSame;
  static addComment = addComment;
  static getComments = getComments;
  static updateComment = updateComment;
  static deleteComment = deleteComment;
  static toggleRevealRequest = toggleRevealRequest;
  static getRevealRequests = getRevealRequests;
  static isRevealRequest = isRevealRequest;
  static revealPost = revealPost;
}
