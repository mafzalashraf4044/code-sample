/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { Comment, CommentDocument } from "../models/Comment";
import ResponseMessages from "../constants/response";

export default class CommentService {
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

    return await Comment.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await Comment.findOne(where, select);
  };

  static add = async (comments: Array<CommentDocument>) => {
    return await Comment.create(comments);
  };

  static addOne = async (comment: CommentDocument) => {
    return await Comment.create(comment);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await Comment.updateMany(
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
    const comment = await Comment.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!comment) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return comment;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await Comment.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await CommentService.update(where, {
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
      const comment = await Comment.deleteOne(where);

      if (!comment) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    const result = await CommentService.updateOne(where, {
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
