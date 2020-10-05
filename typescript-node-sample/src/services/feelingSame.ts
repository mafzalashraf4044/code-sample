/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { FeelingSame, FeelingSameDocument } from "../models/FeelingSame";
import ResponseMessages from "../constants/response";

export default class FeelingSameService {
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

    return await FeelingSame.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await FeelingSame.findOne(where, select);
  };

  static add = async (feelingSameItems: Array<FeelingSameDocument>) => {
    return await FeelingSame.create(feelingSameItems);
  };

  static addOne = async (feelingSame: FeelingSameDocument) => {
    return await FeelingSame.create(feelingSame);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await FeelingSame.updateMany(
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
    const feelingSame = await FeelingSame.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!feelingSame) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return feelingSame;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await FeelingSame.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await FeelingSameService.update(where, {
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
      const feelingSame = await FeelingSame.deleteOne(where);

      if (!feelingSame) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    const result = await FeelingSameService.updateOne(where, {
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
