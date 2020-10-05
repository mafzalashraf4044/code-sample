/** @format */

export default class Constants {
  static ADMIN_ROLE = "admin";
  static USER_ROLE = "user";
  static DEFAULT_ACL_ROLES = [Constants.USER_ROLE];
  static ACL_ROLES = [Constants.ADMIN_ROLE, Constants.USER_ROLE];

  static MALE = "1";
  static FEMALE = "2";
  static GENDERS = [Constants.MALE, Constants.FEMALE];

  static USER_MODE_NORMAL = "1";
  static USER_MODE_ANONYMOUS = "2";
  static USER_MODES = [
    Constants.USER_MODE_NORMAL,
    Constants.USER_MODE_ANONYMOUS,
  ];

  static POST_TYPE_REGULAR = "1";
  static POST_TYPE_PERMANENT = "2";
  static POST_TYPES = [
    Constants.POST_TYPE_REGULAR,
    Constants.POST_TYPE_PERMANENT,
  ];

  static MONGO_LAT_LNG_INDICES = {
    LATITUDE: 1,
    LONGITUDE: 0,
  };

  static USER_PROFILE_ALLOWED_UPDATE_KEYS = [
    "email",
    "password",
    "username",
    "image",
    "firstName",
    "gender",
    "isPublic",
  ];

  static VERIFICATION_TOKEN_TYPES = {
    passwordResetToken: {
      key: "passwordResetToken",
      expiresDtKey: "passwordResetExpiresDt",
    },
    changeEmailToken: {
      key: "changeEmailToken",
      expiresDtKey: "changeEmailExpiresDt",
    },
    changeUsernameToken: {
      key: "changeUsernameToken",
      expiresDtKey: "changeUsernameExpiresDt",
    },
  };

  static VERIFICATION_TOKENS = Object.keys(Constants.VERIFICATION_TOKEN_TYPES);

  static FRIEND_STATUS_NOT_FRIENDS = "0";
  static FRIEND_STATUS_REQUESTED = "1";
  static FRIEND_STATUS_PENDING = "2";
  static FRIEND_STATUS_REJECTED = "3";
  static FRIEND_STATUS_FRIENDS = "4";
  static FRIEND_STATUS_BLOCKED = "5";

  static FRIEND_STATUSES = [
    Constants.FRIEND_STATUS_NOT_FRIENDS,
    Constants.FRIEND_STATUS_REQUESTED,
    Constants.FRIEND_STATUS_PENDING,
    Constants.FRIEND_STATUS_REJECTED,
    Constants.FRIEND_STATUS_FRIENDS,
    Constants.FRIEND_STATUS_BLOCKED,
  ];
}
