/** @format */

"use strict";

// process.env["NODE_CONFIG_DIR"] = __dirname + "/config/env/";
process.env["NODE_CONFIG_DIR"] = process.cwd() + "/src/config/env/";

import config from "config";

import app from "./app";
import Types from "./types";
import RabbitMQ from "./config/rabbitmq";
import RabbitMQHelper from "./util/helpers/rabbitmq";
import { connect } from "./config/database/mongodb";

const env = config.get("environment");
const port = config.get("server.api.port");
const rabbitmqConfig: Types.RabbitMQConfig = config.get("rabbitmq");

const server = app.listen(port, () => {
  RabbitMQ.init(rabbitmqConfig)
    .then(() => {
      RabbitMQHelper.init().then(() => {
        console.log(" [\u2713] Rabbitmq [ready]");
      });
    })
    .then(() => require("./microservices"))
    .catch(e => {
      console.log("[\u2a2f] RabbitMQ is not running", e);
    });

  connect();

  console.log("  App is running at http://localhost:%d in %s mode", port, env);
  console.log("  Press CTRL-C to stop\n");
});

export default server;
