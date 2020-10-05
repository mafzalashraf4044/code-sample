/** @format */

import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";

//  constants
import Constants from "../constants";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: string;
  isVerified: Boolean;
  verificationToken: string;
  passwordResetToken: string;
  passwordResetExpiresDt: Date;
  changeEmailToken: string;
  changeEmailExpiresDt: Date;
  changeUsernameToken: string;
  changeUsernameExpiresDt: Date;
  location: Object;
  walkthrough: Array<string>;
  archiveStatus: Boolean;

  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string) => boolean;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 200,
      trim: true,
    },
    username: {
      type: String,
      maxlength: 100,
      unique: true,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      maxlength: 100,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 100,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: Constants.GENDERS,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: Constants.ACL_ROLES,
      default: Constants.USER_ROLE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      trim: true,
    },
    passwordResetToken: {
      type: String,
      default: null,
      trim: true,
    },
    passwordResetExpiresDt: {
      type: Date,
    },
    changeEmailToken: {
      type: String,
      default: null,
      trim: true,
    },
    changeEmailExpiresDt: {
      type: Date,
    },
    changeUsernameToken: {
      type: String,
      default: null,
      trim: true,
    },
    changeUsernameExpiresDt: {
      type: Date,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    walkthrough: {
      type: Array,
      default: [],
    },
    archiveStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function(candidatePassword) {
  //  must be replaced with async version
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

//  remvoing unwanted fields
userSchema.set("toJSON", {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.role;
    delete ret.isVerified;
    delete ret.verificationToken;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpiresDt;
    delete ret.changeEmailToken;
    delete ret.changeEmailExpiresDt;
    delete ret.changeUsernameToken;
    delete ret.changeUsernameExpiresDt;
    delete ret.archiveStatus;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

// userSchema.index({
//   location: "2dsphere",
// });

export const User = mongoose.model<UserDocument>("User", userSchema);
