/** @format */

import _ from "lodash";
import boom from "@hapi/boom";
import passport from "passport";
import { Request, Response, NextFunction } from "express";

import { UserDocument } from "../models/User";

//  constants
import Constants from "../constants";
import ResponseMessages from "../constants/response";

// handleJWT with roles
const handleJWT = (
  req: Request,
  res: Response,
  next: Function,
  roles: Array<string>,
) => async (err: object, user: UserDocument, info: object) => {
  const error = err || info;

  // log user in
  try {
    if (error || !user) {
      throw boom.unauthorized(ResponseMessages.UNAUTHORIZED);
    }

    // see if user is authorized to do the action
    if (!roles.includes(user.role)) {
      throw boom.forbidden(ResponseMessages.FORBIDDEN);
    }

    req.user = user;

    return next();
  } catch (error) {
    console.log("Error", err);
    next(error);
  }
};

// exports the middleware
const isAuthenticated = (roles: any = Constants.USER_ROLE) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _roles = _.isArray(roles) ? roles : [roles];

  return passport.authenticate(
    "jwt",
    {
      session: false,
    },
    handleJWT(req, res, next, _roles),
  )(req, res, next);
};

export default isAuthenticated;
