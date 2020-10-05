/** @format */

import mongoose, { Schema } from "mongoose";

//  constants
import Constants from "../constants";

export type PostDocument = mongoose.Document & {
  user: string;
  moodType: string;
  preset: string;
  textStyle: string;
  location: Object;
  text: string;
  image: string;
  audio: string;
  video: string;
  userMode: number;
  postType: number;
  archiveStatus: Boolean;
};

const postSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moodType: {
      type: Schema.Types.ObjectId,
      ref: "MoodType",
      default: null,
    },
    preset: {
      type: Schema.Types.ObjectId,
      ref: "Preset",
      default: null,
    },
    textStyle: {
      type: Schema.Types.ObjectId,
      ref: "TextStyle",
      default: null,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    text: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    audio: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    userMode: {
      type: String,
      enum: Constants.USER_MODES,
      default: Constants.USER_MODE_NORMAL,
    },
    postType: {
      type: String,
      enum: Constants.POST_TYPES,
      default: Constants.POST_TYPE_REGULAR,
    },
    archiveStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.index({
  user: 1,
});

//  remvoing unwanted fields
postSchema.set("toJSON", {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret.archiveStatus;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const Post = mongoose.model<PostDocument>("Post", postSchema);
