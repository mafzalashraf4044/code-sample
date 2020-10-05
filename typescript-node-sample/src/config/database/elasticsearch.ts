/** @format */

import es from "@elastic/elasticsearch";
import config from "config";

const connect = () => {
  const esHost: string = config.get("cache.elasticsearch.host");

  const _client = new es.Client({
    node: esHost,
    requestTimeout: 1000,
  });

  _client.ping({}, err => {
    if (err) {
      console.log("[\u2a2f] Elasticsearch is not running ", err);
    } else {
      console.log("[\u2713] Elasticsearch [ready]");
    }
  });

  return _client;
};

export default connect;
