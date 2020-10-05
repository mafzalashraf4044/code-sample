/** @format */

import _ from "lodash";

import Constants from "../../constants";

const transform = (user: any) => {
  if (_.isNil(user.image)) {
    user.image =
      user.gender === Constants.MALE
        ? Constants.MALE_IMAGE
        : Constants.FEMALE_IMAGE;
  }

  //  set location object according to mongodb structure
  user.location = {
    type: "Point",
    coordinates: [user.lng, user.lat],
  };

  //  remove lat lng keys from input
  _.omit(user, ["lat", "lng"]);

  return user;
};

const transformForES = (value: any) => {
  return _({
    id: value.id,
    email: value.email,
    username: value.username,
    firstName: value.firstName,
    lastName: value.lastName,
    gender: value.gender,
    image: value.image,
    location: {
      lat: _.get(value, "location.coordinates", [])[
        Constants.MONGO_LAT_LNG_INDICES.LATITUDE
      ],
      lon: _.get(value, "location.coordinates", [])[
        Constants.MONGO_LAT_LNG_INDICES.LONGITUDE
      ],
    },
    clicks: 0,
    dt: new Date(),
  })
    .omitBy(_.isUndefined)
    .omitBy(_.isNull)
    .value();
};

export default class UserPlugins {
  static transform = transform;
  static transfromForES = transformForES;
}
