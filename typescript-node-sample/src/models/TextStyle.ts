/** @format */

import mongoose, { Schema } from "mongoose";

export type TextStyleDocument = mongoose.Document & {
  json: Object;
  order: number;
  archiveStatus: Boolean;
};

const textStyleSchema = new mongoose.Schema(
  {
    json: {
      type: Object,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      unique: true,
    },
    archiveStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  },
);

//  remvoing unwanted fields
textStyleSchema.set("toJSON", {
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

export const TextStyle = mongoose.model<TextStyleDocument>(
  "TextStyle",
  textStyleSchema,
);
