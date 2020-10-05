/** @format */

import mongoose, { Schema } from "mongoose";

import Constants from "../constants";

export type CommentDocument = mongoose.Document & {
  user: string;
  post: string;
  userMode: string;
  text: string;
  reply: string;
  archiveStatus: boolean;
};

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userMode: {
      type: String,
      enum: Constants.USER_MODES,
      default: Constants.USER_MODE_NORMAL,
    },
    text: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
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

//  remvoing unwanted fields
commentSchema.set("toJSON", {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.archiveStatus;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const Comment = mongoose.model<CommentDocument>(
  "Comment",
  commentSchema,
);
