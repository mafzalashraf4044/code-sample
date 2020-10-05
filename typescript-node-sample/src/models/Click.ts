/** @format */

import mongoose, { Schema } from "mongoose";

export type ClickDocument = mongoose.Document & {
  user: string;
  post: string;
  archiveStatus: boolean;
};

const clickSchema = new mongoose.Schema(
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
clickSchema.set("toJSON", {
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

export const Click = mongoose.model<ClickDocument>("Click", clickSchema);
