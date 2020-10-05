/** @format */

import _ from "lodash";

import redisClient from "../../config/database/redis";

export default class Redis {
  static KEYS = {
    MOOD_TYPES: "MP_OPTIONS:MOOD_TYPES",
    PRESETS: "MP_OPTIONS:PRESETS",
    TEXT_STYLES: "MP_OPTIONS:TEXT_STYLES",
  };

  /**
   * Set Key
   * @description Set Key
   * @param {String} key Redis key name
   * @param {String} value Redis value
   * @static
   * @returns
   */
  static setKey(key: string, value: any) {
    const result = redisClient.set(key.toString(), JSON.stringify(value));
    return result;
  }

  /**
   * Get Key
   * @description Get Key
   * @param {String} key Redis key name
   * @static
   * @returns
   */
  static getKey(key: string) {
    const result = redisClient.get(key.toString());
    return result;
  }

  /**
   * Remove Key
   * @description Remove Key
   * @param {String} key Redis key name
   * @static
   * @returns
   */
  static removeKey(key: string) {
    const result = redisClient.del(key.toString());
    return result;
  }
}
