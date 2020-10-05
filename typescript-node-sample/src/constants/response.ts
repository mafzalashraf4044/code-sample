/** @format */

export default class ResponseMessages {
  static EMAIL_ALREADY_EXIST =
    "Oops! A user with this email address already exist, please try again.";

  static USERNAME_ALREADY_EXIST =
    "Oops! A user with this username address already exist, please try again.";

  static INVALID_VERIFICATION_TOKEN =
    "Oops! The verification code you provided is incorrect, please try again.";

  static VERIFICATION_TOKEN_EXPIRED =
    "Oops! The verification code you provided has been expired, please try again.";

  static EMAIL_DOES_NOT_EXIST =
    "Oops! User with this email address does not exist, please try again.";

  static USER_DOES_NOT_EXIST = "Oops! User does not exist.";

  static USER_ALREADY_VERIFIED = "Oops! This user is already verified.";

  static USER_NOT_VERIFIED = "Oops! User email is not verified.";

  static INVALID_CREDENTIALS =
    "Oops! The username or password you provided is incorrect.";

  static UNAUTHORIZED = "Oops! Unauthorized.";

  static FORBIDDEN = "Oops! Forbidden.";

  static SAME_EMAIL_PROVIDED_FOR_UPDATE =
    "Oops! New email can not be equal to old email.";

  static SAME_USERNAME_PROVIDED_FOR_UPDATE =
    "Oops! New email can not be equal to old email.";

  static CAN_NOT_SEND_FRIEND_REQUEST = "Oops! Friend request can not be sent.";

  static FRIEND_REQUEST_DOES_NOT_EXIST = "Oops! Friend request does not exist.";

  static USER_NOT_BLOCKED = "Oops! User is not blocked.";

  static POST_DOES_NOT_EXIST = "Oops! Post does not exist.";

  static POST_DOES_NOT_BELONG_TO_THIS_USER =
    "Oops! Post does belong to this user.";

  static COMMENT_DOES_NOT_EXIST = "Oops! Comment does not exist.";

  static NOT_FOUND = "Oops! Requested resource does not exist.";
}
