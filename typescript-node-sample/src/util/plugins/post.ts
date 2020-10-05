/** @format */

import Helpers from "../helpers";
import Constants from "../../constants";

const transform = (post: any) => {
  //  set location object according to mongodb structure
  post.location = {
    type: "Point",
    coordinates: [post.location.lng, post.location.lat],
  };

  //  remove lat lng keys and id from input
  delete post.lat;
  delete post.lng;
  delete post.id;

  return post;
};

const transformForES = (value: any) => {
  const moodTypesHM = Helpers.getObjectProperty(global, "moodTypesHM", {});
  const presetsHM = Helpers.getObjectProperty(global, "presetsHM", {});
  const textStylesHM = Helpers.getObjectProperty(global, "textStylesHM", {});

  const moodType = moodTypesHM[value.moodType];
  const preset = presetsHM[value.preset];
  const textStyle = textStylesHM[value.textStyle];

  return {
    id: value.id,
    userId: value.userMode === Constants.USER_MODE_NORMAL ? value.user : null,
    moodType: moodType && {
      id: moodType.id,
      title: moodType.title,
      image: moodType.image,
    },
    preset: preset && {
      id: preset.id,
      image: preset.image,
    },
    textStyle: textStyle && {
      id: preset.id,
      json: preset.json,
    },
    location: {
      lat: Helpers.getObjectProperty(value, "location.coordinates", [])[
        Constants.MONGO_LAT_LNG_INDICES.LATITUDE
      ],
      lon: Helpers.getObjectProperty(value, "location.coordinates", [])[
        Constants.MONGO_LAT_LNG_INDICES.LONGITUDE
      ],
    },
    text: value.text,
    image: value.image,
    audio: value.audio,
    video: value.video,
    userMode: value.userMode,
    postType: value.postType,
    feelingSame: 0,
    comments: 0,
    revealRequests: 0,
    dt: new Date(),
  };
};

export default class PostPlugins {
  static transofrom = transform;
  static transofromForES = transformForES;
}
