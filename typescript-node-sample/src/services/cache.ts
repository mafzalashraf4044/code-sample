/** @format */

import _ from "lodash";

import PostService from "./post";
// import Redis from "../util/helpers/redis";

export default class CacheService {
  static cachePostingOptions = async () => {
    const {
      moodTypes,
      presets,
      textStyles,
    } = await PostService.getPostingOptions();

    _.set(global, "moodTypes", moodTypes);
    _.set(global, "presets", presets);
    _.set(global, "textStyles", textStyles);

    _.set(global, "moodTypesHM", _.mapKeys(moodTypes, "_id"));
    _.set(global, "presetsHM", _.mapKeys(presets, "_id"));
    _.set(global, "textStylesHM", _.mapKeys(textStyles, "_id"));

    // Redis.setKey(Redis.KEYS.MOOD_TYPES, moodTypes);
    // Redis.setKey(Redis.KEYS.PRESETS, presets);
    // Redis.setKey(Redis.KEYS.TEXT_STYLES, textStyles);
  };

  static getMoodType = (id: string) => {
    const moodTypes = _.get(global, "moodTypes", []);
    const moodType = _.find(moodTypes, o => o._id === id);

    return moodType;
  };

  static getPreset = (id: string) => {
    const presets = _.get(global, "presets", []);
    const preset = _.find(presets, o => o._id === id);

    return preset;
  };

  static getTextStyle = (id: string) => {
    const textStyles = _.get(global, "textStyles", []);
    const textStyle = _.find(textStyles, o => o._id === id);

    return textStyle;
  };
}
