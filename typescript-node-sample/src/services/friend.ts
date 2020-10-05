/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { Friend, FriendDocument } from "../models/Friend";

//  constants
import ResponseMessages from "../constants/response";

export default class FriendService {
  static get = async (
    where: object,
    select: string = null,
    page: number = null,
    limit: number = null,
  ) => {
    const options: Types.MongooseOptions = {
      sort: { createdAt: -1 }, // sort createdAt desc
    };

    if (page && limit) {
      options.skip = page * limit;
      options.limit = limit;
    }

    return await Friend.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await Friend.findOne(where, select);
  };

  static add = async (friends: Array<FriendDocument>) => {
    return await Friend.create(friends);
  };

  static addOne = async (friend: FriendDocument) => {
    return await Friend.create(friend);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await Friend.updateMany(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (result.length === 0) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return result;
  };

  static updateOne = async (where: object, updateObj: any) => {
    const friend = await Friend.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!friend) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return friend;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await Friend.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await FriendService.update(where, {
      $set: {
        archiveStatus: true,
      },
    });

    if (result.length === 0) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return { n: result.length };
  };

  static deleteOne = async (where: object, hard: boolean = false) => {
    if (hard) {
      const friend = await Friend.deleteOne(where);

      if (!friend) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    const result = await FriendService.updateOne(where, {
      $set: {
        archiveStatus: true,
      },
    });

    if (!result) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return { n: 1 };
  };

  static canSendRequest = async (user: string, friend: string) => {
    const where = {
      user,
      friend,
      archiveStatus: false,
    };
    const result = FriendService.getOne(where);

    if (result) {
      throw boom.badRequest(ResponseMessages.CAN_NOT_SEND_FRIEND_REQUEST);
    }

    return true;
  };
}
