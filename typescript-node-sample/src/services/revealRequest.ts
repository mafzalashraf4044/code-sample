/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { RevealRequest, RevealRequestDocument } from "../models/RevealRequest";
import ResponseMessages from "../constants/response";

export default class RevealRequestService {
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

    return await RevealRequest.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await RevealRequest.findOne(where, select);
  };

  static add = async (revealRequests: Array<RevealRequestDocument>) => {
    return await RevealRequest.create(revealRequests);
  };

  static addOne = async (revealRequest: RevealRequestDocument) => {
    return await RevealRequest.create(revealRequest);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await RevealRequest.updateMany(
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
    const revealRequest = await RevealRequest.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!revealRequest) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return revealRequest;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await RevealRequest.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await RevealRequestService.update(where, {
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
      const revealRequest = await RevealRequest.deleteOne(where);

      if (!revealRequest) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    const result = await RevealRequestService.updateOne(where, {
      $set: {
        archiveStatus: true,
      },
    });

    if (!result) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return { n: 1 };
  };
}
