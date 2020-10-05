/** @format */

import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import moment from "moment";
import status from "http-status";

import ClickValidation from "../util/validations/click";
import ClickService from "../services/click";
import PostService from "../services/post";
import { UserDocument } from "../models/User";
import Helpers from "../util/helpers";
import ESHelper from "../util/helpers/elasticsearch";

/**
 * @api {post} /:postId
 * @version 1.0
 * @description add click to post
 * @param {string:param} postId - object id of post
 */
export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, user: userId };
    const { error, value } = ClickValidation.add.validate(input);

    if (error) {
      throw error;
    }

    const click = await ClickService.addOne(value);

    // increment clicks count by 1
    await ESHelper.increment("user", userId, "clicks");

    return res.status(status.OK).json({
      click,
      message: "Click added successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /today
 * @version 1.0
 * @description get todays clicks for user
 * @param {string:queryParam} limit - pagination limit
 * @param {array:queryParam} page - page number
 */
export const getTodaysClicks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { user: userId };
    const {
      error,
      value: { page, limit },
    } = ClickValidation.getTodaysClicks.validate(input);

    if (error) {
      throw error;
    }

    const wherePosts = {
      user: userId,
    };
    const posts = await PostService.get(wherePosts, "_id");

    const whereClicks = {
      createdAt: {
        $gte: moment()
          .startOf("day")
          .toDate(),
      },
      post: {
        $in: Helpers.pickKeysFromArrayOfObjects(posts, "_id"),
      },
      archiveStatus: false,
    };

    const clicks = await ClickService.get(
      whereClicks,
      "user post",
      page,
      limit,
    );

    return res.status(status.OK).json({
      clicks,
      message: "Get todays clicks successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};
