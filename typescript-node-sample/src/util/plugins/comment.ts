/** @format */

import Helpers from "../helpers";
import { CommentDocument } from "../../models/Comment";

import Constants from "../../constants";

const removeAnonymousUsers = (comments: CommentDocument[], userId: string) => {
  return comments.map(o => {
    /**
     * user = null & userMode = USER_MODE_ANONYMOUS => user is anonymous
     * user = userId & userMode = USER_MODE_ANONYMOUS => user is anonymous with id = userId
     */
    if (o.userMode === Constants.USER_MODE_ANONYMOUS && o.user !== userId) {
      o.user = null; // other anonymous user
    }

    return o;
  });
};

export default class CommentPlugins {
  static removeAnonymousUsers = removeAnonymousUsers;
}
