/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { Click, ClickDocument } from "../models/Click";
import ResponseMessages from "../constants/response";

export default class ClickService {
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

    return await Click.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await Click.findOne(where, select);
  };

  static add = async (clicks: Array<ClickDocument>) => {
    return await Click.create(clicks);
  };

  static addOne = async (click: ClickDocument) => {
    return await Click.create(click);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await Click.updateMany(
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
    const click = await Click.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!click) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return click;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await Click.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await ClickService.update(where, {
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
      const click = await Click.deleteOne(where);

      if (!click) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    const result = await ClickService.updateOne(where, {
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
