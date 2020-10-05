/** @format */

import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import status from "http-status";
import boom from "@hapi/boom";

import FriendValidation from "../util/validations/friend";
import FriendService from "../services/friend";
import BlockedService from "../services/blocked";
import Helpers from "../util/helpers";
import { FriendDocument } from "../models/Friend";
import { UserDocument } from "../models/User";
import { BlockedDocument } from "../models/Blocked";
import ResponseMessages from "../constants/response";

//  constants
import Constants from "../constants";

/**
 * @api {get} /friend/get
 * @version 1.0
 * @description get user friends
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
    } = FriendValidation.get.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      user: userId,
      archiveStatus: false,
      status: Constants.FRIEND_STATUS_FRIENDS,
    };

    const friends = await FriendService.get(where, "friend", page, limit);

    return res.status(status.OK).json({
      friends,
      message: "Get friends successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /friend/requests
 * @version 1.0
 * @description get friend requests
 * @param {string:queryParam} limit - pagination limit
 * @param {array:queryParam} page - page number
 */
export const getRequests = async (
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
      value: { page, limit },
    } = FriendValidation.getRequests.validate(input);

    if (error) {
      throw error;
    }

    const blockedWhere = {
      user: userId,
      archiveStatus: false,
    };

    const blocked: BlockedDocument[] = await BlockedService.get(
      blockedWhere,
      "_id",
    );

    const where = {
      user: userId,
      archiveStatus: false,
      status: Constants.FRIEND_STATUS_PENDING,
      friend: {
        $nin: Helpers.pickKeysFromArrayOfObjects(blocked, "_id"),
      },
    };

    const requests = await FriendService.get(where, "friends", page, limit);

    return res.status(status.OK).json({
      requests,
      message: "Get friend requests successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /friend/send-request
 * @version 1.0
 * @description send friend request
 * @param {string:body} requestToId - object id of user for sending friend request
 */
export const sendRequest = async (
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
      value: { requestToId },
    } = FriendValidation.sendRequest.validate(input);

    if (error) {
      throw error;
    }

    //  checking if user is blocked
    await BlockedService.canSendRequest(userId, requestToId);

    //  checking if friend request in any status already exist
    await FriendService.canSendRequest(userId, requestToId);

    const data = [
      {
        user: userId,
        friend: requestToId,
        status: Constants.FRIEND_STATUS_REQUESTED,
      },
      {
        user: requestToId,
        friend: userId,
        status: Constants.FRIEND_STATUS_PENDING,
      },
    ];

    await FriendService.add(data as FriendDocument[]);

    return res.status(status.OK).json({
      message: "Friend Request sent successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /friend/confirm-request
 * @version 1.0
 * @description confirm friend request
 * @param {string:body} confirmRequestId - object id of user for confirming friend request
 */
export const confirmRequest = async (
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
      value: { confirmRequestId },
    } = FriendValidation.confirmRequest.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      $or: [
        {
          user: userId,
          friend: confirmRequestId,
          status: Constants.FRIEND_STATUS_PENDING,
        },
        {
          user: confirmRequestId,
          friend: userId,
          status: Constants.FRIEND_STATUS_REQUESTED,
        },
      ],
      archiveStatus: false,
    };

    const updateObj = {
      status: Constants.FRIEND_STATUS_FRIENDS,
    };

    const friend = await FriendService.update(where, updateObj);

    return res.status(status.OK).json({
      friend,
      message: "Friend Request confirmed successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {delete} /friend/delete-request
 * @version 1.0
 * @description delete friend request
 * @param {string:body} friendId - object id of friend request
 */
export const deleteRequest = async (
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
      value: { friendId },
    } = FriendValidation.deleteRequest.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      $or: [
        {
          user: userId,
          friend: friendId,
          status: Constants.FRIEND_STATUS_PENDING,
        },
        {
          user: friendId,
          friend: userId,
          status: Constants.FRIEND_STATUS_REQUESTED,
        },

        {
          user: userId,
          friend: friendId,
          status: Constants.FRIEND_STATUS_REQUESTED,
        },
        {
          user: friendId,
          friend: userId,
          status: Constants.FRIEND_STATUS_PENDING,
        },
      ],
      archiveStatus: false,
    };

    const result = await FriendService.delete(where, true);

    if (result.n === 0) {
      throw boom.badRequest(ResponseMessages.FRIEND_REQUEST_DOES_NOT_EXIST);
    }

    return res.status(status.OK).json({
      message: "Friend request deleted successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /friend/unfriend
 * @version 1.0
 * @description unfriend user
 * @param {string:body} friendId - object id of friend
 */
export const unfriend = async (
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
      value: { friendId },
    } = FriendValidation.unfriend.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      $or: [
        {
          user: userId,
          friend: friendId,
          status: Constants.FRIEND_STATUS_NOT_FRIENDS,
        },
        {
          user: friendId,
          friend: userId,
          status: Constants.FRIEND_STATUS_NOT_FRIENDS,
        },
      ],
      archiveStatus: false,
    };

    const result = await FriendService.delete(where, true);

    if (result.n === 0) {
      throw boom.badRequest(ResponseMessages.FRIEND_REQUEST_DOES_NOT_EXIST);
    }

    return res.status(status.OK).json({
      message: "Unfriended successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};
