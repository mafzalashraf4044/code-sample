/** @format */

import mongoose, { Schema } from "mongoose";

export type BlockedDocument = mongoose.Document & {
  user: string;
  blocked: string;
  archiveStatus: boolean;
};

const blockedSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blocked: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
blockedSchema.set("toJSON", {
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

export const Blocked = mongoose.model<BlockedDocument>(
  "Blocked",
  blockedSchema,
);
