/** @format */

import { Request, Response, NextFunction } from "express";
import status from "http-status";

import { UserDocument } from "../models/User";
import { FeelingSameDocument } from "../models/FeelingSame";
import { CommentDocument } from "../models/Comment";
import { RevealRequestDocument } from "../models/RevealRequest";
import PostValidation from "../util/validations/post";
import PostPlugins from "../util/plugins/post";
import CommentPlugins from "../util/plugins/comment";
import PostService from "../services/post";
import FeelingSameService from "../services/feelingSame";
import CommentService from "../services/comment";
import RevealRequestService from "../services/revealRequest";
import ESService from "../services/elasticsearch";
import ESHelper from "../util/helpers/elasticsearch";
import Helpers from "../util/helpers";

/**
 * @api {get} /post
 * @version 1.0
 * @description get posts
 * @param {array:queryParam} userIn - user included
 * @param {array:queryParam} userNIn - user excluded
 * @param {array:queryParam} postNIn - post excluded
 * @param {object:queryParam} location - object id of text stylee - optional
 * @param {number:queryParam} page - post text - optional
 * @param {number:queryParam} limit - post image - optional
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  input validation
    const input = { ...req.query };

    const { error, value } = PostValidation.get.validate(input);

    if (error) {
      throw error;
    }

    const posts = await ESService.getPosts(value);

    return res.status(status.OK).json({
      posts,
      message: "Gets posts successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /post
 * @version 1.0
 * @description add new post
 * @param {string:body} user - object id of user
 * @param {string:body} moodType - object id of mood type - optional
 * @param {string:body} preset - object id of preset - optional
 * @param {string:body} textStyle - object id of text stylee - optional
 * @param {object:body} location - location object {lat, lng}
 * @param {string:body} text - post text - optional
 * @param {string:body} image - post image - optional
 * @param {string:body} audio - post audio - optional
 * @param {string:body} video - post video - optional
 * @param {number:body} userMode - userMode
 * @param {number:body} postType - postType
 */
export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.body, user: user.id };
    const { error, value } = PostValidation.add.validate(input);

    if (error) {
      throw error;
    }

    const data = PostPlugins.transofrom(value);
    const post = await PostService.addOne(data);

    // send to Elastic Search
    const dataES = PostPlugins.transofromForES(post);
    await ESHelper.add("post", dataES);

    return res.status(status.OK).json({
      post,
      message: "Post added successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {put} /post/:id
 * @version 1.0
 * @description update post by id
 * @param {string:param} id - object id of post
 * @param {string:body} moodType - object id of mood type - optional
 * @param {string:body} preset - object id of preset - optional
 * @param {string:body} textStyle - object id of text stylee - optional
 * @param {object:body} location - location object {lat, lng}
 * @param {string:body} text - post text - optional
 * @param {string:body} image - post image - optional
 * @param {string:body} audio - post audio - optional
 * @param {string:body} video - post video - optional
 * @param {number:body} userMode - userMode
 * @param {number:body} postType - postType
 */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.body, ...req.params };
    const { error, value } = PostValidation.update.validate(input);

    if (error) {
      throw error;
    }

    const data = PostPlugins.transofrom(value);
    const where = { _id: input.id, user: userId };
    const post = await PostService.updateOne(where, data);

    // send to Elastic Search
    const dataES = PostPlugins.transofromForES(post);
    await ESHelper.update("post", input.id, dataES);

    return res.status(status.OK).json({
      post,
      message: "Post updated successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {delete} /post/:id
 * @version 1.0
 * @description delete post by id
 * @param {string:param} id - object id of post
 */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params };
    const { error, value } = PostValidation.destroy.validate(input);

    if (error) {
      throw error;
    }

    const where = { _id: value.id, user: userId };
    await PostService.deleteOne(where, true);

    // destroy from Elastic Search
    await ESHelper.destroy("post", input.id);

    return res.status(status.OK).json({
      message: "Post deleted successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /post/get
 * @version 1.0
 * @description get posts
 * @param {string:param} userId - user id
 * @param {array:queryParam} userNIn - user excluded
 * @param {object:queryParam} location - object id of text stylee - optional
 * @param {number:queryParam} page - post text - optional
 * @param {number:queryParam} limit - post image - optional
 */
export const getByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.query, ...req.params };

    const { error, value } = PostValidation.getByUserId.validate(input);

    if (error) {
      throw error;
    }

    const posts = await ESService.getPostsByUserId(value);

    return res.status(status.OK).json({
      posts,
      message: "Gets posts by user id successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /post/:postId/feeling-same
 * @version 1.0
 * @description toggle feeling same feedback
 * @param {string:param} postId - post id
 */
export const toggleFeelingSame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params };

    const {
      error,
      value: { postId },
    } = PostValidation.toggleFeelingSame.validate(input);

    if (error) {
      throw error;
    }

    const where = { user: userId, post: postId };
    const feelingSame = await FeelingSameService.getOne(where);

    if (feelingSame) {
      await FeelingSameService.deleteOne(where, true);

      // decrement feelingSame count by 1
      await ESHelper.decrement("post", input.id, "feelingSame");

      return res.status(status.OK).json({
        feelingSame: false,
        message: "Same feeling feedback removed successfully.",
      });
    }

    const data = {
      user: userId,
      post: postId, // post id is not validated
    };
    await FeelingSameService.addOne(data as FeelingSameDocument);

    // increment feelingSame count by 1
    await ESHelper.increment("post", input.id, "feelingSame");

    return res.status(status.OK).json({
      feelingSame: false,
      message: "Same feeling feedback added successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /post/:postId/feeling-same
 * @version 1.0
 * @description get feeling same feedback of a post
 * @param {string:param} postId - post id
 * @param {string:queryParam} limit - pagination limit
 * @param {array:queryParam} page - page number
 */
export const getFeelingSame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, ...req.query };

    const {
      error,
      value: { postId, page, limit },
    } = PostValidation.toggleFeelingSame.validate(input);

    if (error) {
      throw error;
    }

    await PostService.isPostBelongsToUser(postId, userId);

    const where = {
      post: postId,
    };

    const feelingSame = await FeelingSameService.get(
      where,
      "user createdAt",
      page,
      limit,
    );

    return res.status(status.OK).json({
      feelingSame,
      message: "Get feeling same successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /post/:postId/is-feeling-same
 * @version 1.0
 * @description get is feeling same feedback of a post
 * @param {string:param} postId - post id
 */
export const isFeelingSame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params };

    const {
      error,
      value: { postId },
    } = PostValidation.isFeelingSame.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      post: postId, // post id is not validated
      user: userId,
    };

    const feelingSame = await FeelingSameService.getOne(where);

    return res.status(status.OK).json({
      feelingSame: !!feelingSame,
      message: "Get is feeling same successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /post/:postId/comment
 * @version 1.0
 * @description add comment to post
 * @param {string:param} postId - object id of post
 * @param {string:body} text - comment text
 * @param {number:body} userMode - userMode
 */
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, ...req.body };
    const {
      error,
      value: { postId, text, userMode },
    } = PostValidation.addComment.validate(input);

    if (error) {
      throw error;
    }

    const data = {
      post: postId,
      user: userId,
      text,
      userMode,
    };

    const comment = await CommentService.addOne(data as CommentDocument);

    // increment comments count by 1
    await ESHelper.increment("post", input.id, "comments");

    return res.status(status.OK).json({
      comment,
      message: "Comment added successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /post/:postId/comment
 * @version 1.0
 * @description get comment feedback of a post
 * @param {string:param} postId - post id
 * @param {string:queryParam} limit - pagination limit
 * @param {array:queryParam} page - page number
 */
export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, ...req.query };

    const {
      error,
      value: { postId, page, limit },
    } = PostValidation.getComments.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      post: postId,
    };

    const comments = await CommentService.get(
      where,
      "user userMode createdAt",
      page,
      limit,
    );

    const commentsWithoutAnonymousUsers = CommentPlugins.removeAnonymousUsers(
      comments,
      userId,
    );

    return res.status(status.OK).json({
      comments: commentsWithoutAnonymousUsers,
      message: "Get feeling same successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {put} /post/:postId/comment/:id
 * @version 1.0
 * @description update comment of a post
 * @param {string:param} postId - object id of post
 * @param {string:param} id - object id of comment to be updated
 * @param {string:body} text - comment text
 * @param {number:body} userMode - userMode
 */
export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, ...req.body };
    const {
      error,
      value: { postId, id, text, userMode },
    } = PostValidation.updateComment.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      _id: id,
      post: postId,
      user: userId,
    };

    const data = {
      text,
      userMode,
    };

    const comment = await CommentService.updateOne(where, data);

    return res.status(status.OK).json({
      comment,
      message: "Comment updated successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {delete} /post/:postId/comment/:id
 * @version 1.0
 * @description delete comment of a post
 * @param {string:param} postId - object id of post
 * @param {string:param} id - object id of comment to be updated
 */
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, ...req.body };
    const {
      error,
      value: { postId, id },
    } = PostValidation.deleteComment.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      _id: id,
      post: postId,
      user: userId,
    };

    const comment = await CommentService.deleteOne(where);

    // decrement comments count by 1
    await ESHelper.decrement("post", input.id, "comments");

    return res.status(status.OK).json({
      comment,
      message: "Comment deleted successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /post/:postId/reveal-request
 * @version 1.0
 * @description toggle reveal request feedback
 * @param {string:param} postId - post id
 */
export const toggleRevealRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params };

    const {
      error,
      value: { postId },
    } = PostValidation.toggleRevealRequest.validate(input);

    if (error) {
      throw error;
    }

    const where = { user: userId, post: postId };
    const revealRequest = await RevealRequestService.getOne(where);

    if (revealRequest) {
      await RevealRequestService.deleteOne(where, true);

      // decrement revealRequests count by 1
      await ESHelper.decrement("post", input.id, "revealRequests");

      return res.status(status.OK).json({
        feelingSame: false,
        message: "Reveal request feedback removed successfully.",
      });
    }

    const data = {
      user: userId,
      post: postId, // post id is not validated
    };
    await RevealRequestService.addOne(data as RevealRequestDocument);

    // increment revealRequests count by 1
    await ESHelper.increment("post", input.id, "revealRequests");

    return res.status(status.OK).json({
      feelingSame: false,
      message: "Reveal request feedback added successfully.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /post/:postId/reveal-request
 * @version 1.0
 * @description get revealrequest feedback of a post
 * @param {string:param} postId - post id
 * @param {string:queryParam} limit - pagination limit
 * @param {array:queryParam} page - page number
 */
export const getRevealRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params, ...req.query };

    const {
      error,
      value: { postId, page, limit },
    } = PostValidation.getRevealRequests.validate(input);

    if (error) {
      throw error;
    }

    await PostService.isPostBelongsToUser(postId, userId);

    const where = {
      post: postId,
    };

    const revealRequests = await RevealRequestService.get(
      where,
      "user createdAt",
      page,
      limit,
    );

    return res.status(status.OK).json({
      revealRequests,
      message: "Get reveal request successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {get} /post/:postId/is-reveal-request
 * @version 1.0
 * @description get is reveal request feedback of a post
 * @param {string:param} postId - post id
 */
export const isRevealRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId }: Partial<UserDocument> = req.user;

    //  input validation
    const input = { ...req.params };

    const {
      error,
      value: { postId },
    } = PostValidation.isRevealRequest.validate(input);

    if (error) {
      throw error;
    }

    const where = {
      post: postId, // post id is not validated
      user: userId,
    };

    const revealRequest = await RevealRequestService.getOne(where);

    return res.status(status.OK).json({
      revealRequest: !!revealRequest,
      message: "Get is reveal request successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /post/:postId/reveal-post
 * @version 1.0
 * @description reveal post to a user
 * @param {string:param} postId - post id
 * @param {string:body} revealTo - object id of user to reveal post

 */
export const revealPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  input validation
    const input = { ...req.params, ...req.body };

    const { error, value } = PostValidation.revealPost.validate(input);

    if (error) {
      throw error;
    }

    // TODO: reaveal post logic

    return res.status(status.OK).json({
      message: "Post revealed successful.",
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};

/**
 * @api {post} /post/:postId/reveal-post
 * @version 1.0
 * @description reveal post to a user
 * @param {string:param} postId - post id
 * @param {string:body} revealTo - object id of user to reveal post

 */
export const getPostingOptions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const moodTypes = Helpers.getObjectProperty(global, "moodTypes", {});
    const presets = Helpers.getObjectProperty(global, "presets", {});
    const textStyles = Helpers.getObjectProperty(global, "textStyles", {});

    return res.status(status.OK).json({
      moodTypes,
      presets,
      textStyles,
    });
  } catch (err) {
    console.log("Error", err);
    next(err);
  }
};
