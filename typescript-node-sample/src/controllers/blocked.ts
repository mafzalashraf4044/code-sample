/** @format */

import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import status from "http-status";
import boom from "@hapi/boom";

import BlockedValidation from "../util/validations/blocked";
import BlockedService from "../services/blocked";
import FriendService from "../services/friend";
import { UserDocument } from "../models/User";
import { BlockedDocument } from "../models/Blocked";
import ResponseMessages from "../constants/response";

/**
 * @api {get} /blocked/get
 * @version 1.0
 * @description get blocked users
 * @param {string:queryParam} limit - pagination limit
 * @param {array:queryParam} page - page number
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.query };
    const {
      error,
      value: { page, limit },
    } = BlockedValidation.get.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      user: userId,
      archiveStatus: false,
    };

    const friends = await BlockedService.get(where, "blocked", page, limit);

    return res.status(status.OK).json({
      friends,
      message: "Get blocked successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /blocked/block
 * @version 1.0
 * @description block user
 * @param {string:body}  - blockUserId
 */
export const block = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.query };
    const {
      error,
      value: { blockUserId },
    } = BlockedValidation.block.validate(input);

    if (error) {
      throw error;
    }

    // delete friend requests with any status before blocking the user
    const friendWhere = {
      $or: [
        { user: userId, friend: blockUserId },
        { user: blockUserId, friend: userId },
      ],
      archiveStatus: false,
    };
    await FriendService.delete(friendWhere, true);

    const data = {
      user: userId,
      blocked: blockUserId,
    };

    const blocked = await BlockedService.addOne(data as BlockedDocument);

    return res.status(status.OK).json({
      blocked,
      message: "User blocked successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /blocked/unblock
 * @version 1.0
 * @description unblock user
 * @param {string:body}  - blockedId
 */
export const unblock = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.query };
    const {
      error,
      value: { blockedId },
    } = BlockedValidation.unblock.validate(input);

    if (error) {
      throw error;
    }

    // delete friend requests with any status before blocking the user
    const where = {
      user: userId,
      blocked: blockedId,
    };

    const result = await BlockedService.deleteOne(where);

    if (result.n === 0) {
      throw boom.badRequest(ResponseMessages.USER_NOT_BLOCKED);
    }

    return res.status(status.OK).json({
      message: "User unblocked successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};
