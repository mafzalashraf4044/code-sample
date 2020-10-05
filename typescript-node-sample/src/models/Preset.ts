/** @format */

import mongoose, { Schema } from "mongoose";

export type PresetDocument = mongoose.Document & {
  moodTypeId: string;
  image: string;
  order: number;
  archiveStatus: Boolean;
};

const presetSchema = new mongoose.Schema(
  {
    moodType: {
      type: Schema.Types.ObjectId,
      ref: "MoodType",
      required: true,
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
presetSchema.set("toJSON", {
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

export const Preset = mongoose.model<PresetDocument>("Preset", presetSchema);
