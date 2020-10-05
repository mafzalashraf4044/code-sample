/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { Blocked, BlockedDocument } from "../models/Blocked";

//  constants
import ResponseMessages from "../constants/response";

export default class BlockedService {
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

    return await Blocked.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await Blocked.findOne(where, select);
  };

  static add = async (friends: Array<BlockedDocument>) => {
    return await Blocked.create(friends);
  };

  static addOne = async (friend: BlockedDocument) => {
    return await Blocked.create(friend);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await Blocked.updateMany(
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
    const blocked = await Blocked.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!blocked) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return blocked;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await Blocked.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await BlockedService.update(where, {
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
      const blocked = await Blocked.deleteOne(where);

      if (!blocked) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    const result = await BlockedService.updateOne(where, {
      $set: {
        archiveStatus: true,
      },
    });

    if (!result) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return { n: 1 };
  };

  static canSendRequest = async (user: string, blocked: string) => {
    const where = {
      $or: [
        {
          user,
          blocked,
        },
        {
          user: blocked,
          blocked: user,
        },
      ],
      archiveStatus: false,
    };
    const result = BlockedService.getOne(where);

    if (result) {
      throw boom.badRequest(ResponseMessages.CAN_NOT_SEND_FRIEND_REQUEST);
    }

    return true;
  };
}
