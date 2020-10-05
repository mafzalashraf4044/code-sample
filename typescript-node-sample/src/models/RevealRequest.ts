/** @format */

import mongoose, { Schema } from "mongoose";

export type RevealRequestDocument = mongoose.Document & {
  user: string;
  post: string;
  userMode: string;
  archiveStatus: boolean;
};

const revealRequestSchema = new mongoose.Schema(
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
revealRequestSchema.set("toJSON", {
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

export const RevealRequest = mongoose.model<RevealRequestDocument>(
  "RevealRequest",
  revealRequestSchema,
);
