/** @format */

import mongoose, { Schema } from "mongoose";

import Constants from "../constants";

export type FriendDocument = mongoose.Document & {
  user: string;
  friend: string;
  status: string;
  archiveStatus: boolean;
};

const friendSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friend: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enums: Constants.FRIEND_STATUSES,
      default: Constants.FRIEND_STATUS_PENDING,
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
friendSchema.set("toJSON", {
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

export const Friend = mongoose.model<FriendDocument>("Friend", friendSchema);
