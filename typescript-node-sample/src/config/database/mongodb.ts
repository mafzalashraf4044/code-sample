/** @format */

import mongoose from "mongoose";
import bluebird from "bluebird";

//  helper
import Helpers from "../../util/helpers";
import CacheService from "../../services/cache";

//  constants
const MONGODB_URI = Helpers.getMongoURI();

mongoose.Promise = bluebird;

mongoose.set("useFindAndModify", false);

mongoose.connection.on("connected", async () => {
  console.log("MongoDB is connected");

  await CacheService.cachePostingOptions();
});

mongoose.connection.on("error", err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

export const connect = () => {
  try {
    // keepAlive is true by default
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err,
    );
  }
};
