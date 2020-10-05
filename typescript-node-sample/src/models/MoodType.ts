/** @format */

import mongoose from "mongoose";

export type MoodTypeDocument = mongoose.Document & {
  title: string;
  image: string;
  order: number;
  archiveStatus: Boolean;
};

const moodTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
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
moodTypeSchema.set("toJSON", {
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

export const MoodType = mongoose.model<MoodTypeDocument>(
  "MoodType",
  moodTypeSchema,
);
