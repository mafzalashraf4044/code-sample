/** @format */

import config from "config";
import moment from "moment";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";

export default class Helpers {
  static getMongoURI = () => {
    const uri: string = config.get("database.mongodb.uri");
    return uri;
  };

  static generateJwt = (id: string) => {
    const secret: string = config.get("jwt.secret");

    const payload = {
      sub: id,
    };

    // generating jwt
    const token = jwt.sign(payload, secret, {
      expiresIn: "7 days",
    });

    return token;
  };

  static getFourDigitsRandomCode = () => {
    return Math.floor(Math.random() * 8999 + 1000).toString();
  };

  static getTokenExpiresDt = () => {
    return moment()
      .add(1, "days")
      .toDate();
  };

  static isTokenExpired = (dt: Date) => {
    const tokenExpiresDt = moment(dt);
    const isExpired = tokenExpiresDt.isAfter(moment());

    return isExpired;
  };

  static hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  };

  static getObjectProperty = (
    obj: any,
    keys: string | string[],
    defaultVal: any = undefined,
  ): any => {
    const keysArray = Array.isArray(keys) ? keys : keys.split(".");

    obj = obj[keysArray[0]];

    if (obj && keysArray.length > 1) {
      return Helpers.getObjectProperty(obj, keysArray.slice(1));
    }
    return obj === undefined ? defaultVal : obj;
  };

  static pickKeysFromArrayOfObjects = (array: any[], key: string): any => {
    return array.map(o => o[key]);
  };
}
