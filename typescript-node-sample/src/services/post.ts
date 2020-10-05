/** @format */

import _ from "lodash";
import boom from "@hapi/boom";

import Types from "../types";
import { Post, PostDocument } from "../models/Post";
import { MoodType } from "../models/MoodType";
import { Preset } from "../models/Preset";
import { TextStyle } from "../models/TextStyle";
import ResponseMessages from "../constants/response";

export default class PostService {
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
      options.skip = (page - 1) * limit;
      options.limit = limit;
    }

    return await Post.find(where, select, options);
  };

  static getOne = async (where: object, select: string = null) => {
    return await Post.findOne(where, select);
  };

  static add = async (posts: Array<PostDocument>) => {
    return await Post.create(posts);
  };

  static addOne = async (post: PostDocument) => {
    return await Post.create(post);
  };

  static update = async (where: object, updateObj: any) => {
    const result = await Post.updateMany(
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
    const post = await Post.findOneAndUpdate(
      where,
      {
        $set: updateObj,
      },
      { new: true },
    );

    if (!post) {
      throw boom.notFound(ResponseMessages.NOT_FOUND);
    }

    return post;
  };

  static delete = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await Post.deleteMany(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return result;
    }

    const result = await PostService.update(where, {
      $set: {
        archiveStatus: true,
      },
    });

    return { n: result.length };
  };

  static deleteOne = async (where: object, hard: boolean = false) => {
    if (hard) {
      const result = await Post.deleteOne(where);

      if (result.n === 0) {
        throw boom.notFound(ResponseMessages.NOT_FOUND);
      }

      return { n: 1 };
    }

    await PostService.updateOne(where, {
      $set: {
        archiveStatus: true,
      },
    });

    return { n: 1 };
  };

  static canAddFeedback = async (postId: string) => {
    const where = { _id: postId };
    const post = await PostService.getOne(where);

    if (!post) {
      throw boom.notFound(ResponseMessages.POST_DOES_NOT_EXIST);
    }

    // TODO:  add !isMoodPostPublic && !isFriend check here
  };

  static isPostBelongsToUser = async (postId: string, userId: string) => {
    const where = { _id: postId };
    const post = await PostService.getOne(where);

    if (!post) {
      throw boom.notFound(ResponseMessages.POST_DOES_NOT_EXIST);
    }

    if (post.user !== userId) {
      throw boom.unauthorized(
        ResponseMessages.POST_DOES_NOT_BELONG_TO_THIS_USER,
      );
    }
  };

  static getPostingOptions = async () => {
    const where = { archiveStatus: false };
    const options = { sort: { order: 1 } };

    const moodTypes = await MoodType.find(where, null, options).lean();
    const presets = await Preset.find(where, null, options).lean();
    const textStyles = await TextStyle.find(where, null, options).lean();

    return {
      moodTypes,
      presets,
      textStyles,
    };
  };
}
