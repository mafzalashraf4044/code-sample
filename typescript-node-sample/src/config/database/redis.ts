/** @format */

import config from "config";
import redis from "redis";

const host: string = config.get("database.redis.host");
const port: number = config.get("database.redis.port");

const redisClient = redis.createClient(port, host);

redisClient
  .on("ready", function() {
    console.log("REDIS_EVENT [ready]");
  })
  .on("error", function(err) {
    console.log("REDIS_EVENT [error] " + err.message);
  })
  .on("end", function() {
    console.log("REDIS_EVENT [disconnect]");
  });

export default redisClient;
