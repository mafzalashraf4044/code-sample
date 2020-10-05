/** @format */

import Helpers from ".";
import connect from "../../config/database/elasticsearch";

const client = connect();

export default class ESHelper {
  static client = client;

  static add = async (index: string, body: any) => {
    client.create({
      id: body.id,
      index,
      type: "_doc",
      body,
    });
  };

  static update = async (index: string, id: string, body: any) => {
    client.update({ index, body: { doc: body }, id, type: "_doc" });
  };

  static increment = async (index: string, id: string, field: string) => {
    const script = {
      inline: `ctx._source.${field} += params.${field}`,
      params: {
        [field]: 1,
      },
    };

    client.update({ index, body: { script }, id, type: "_doc" });
  };

  static decrement = async (index: string, id: string, field: string) => {
    const script = {
      inline: `ctx._source.${field} += params.${field}`,
      params: {
        [field]: -1,
      },
    };

    client.update({ index, body: { script }, id, type: "_doc" });
  };

  static search = async (index: string, body: any) => {
    return client.search({
      index,
      body,
    });
  };

  static getById = async (index: string, id: any) => {
    const result = await client.search({
      index,
      body: {
        query: {
          match: {
            id,
          },
        },
      },
    });

    const records = Helpers.getObjectProperty(result, "body.hits.hits", []);
    const extracted = Helpers.pickKeysFromArrayOfObjects(records, "_source");
    return extracted[0];
  };

  static destroy = async (index: string, id: string) => {
    client.delete({ index, id, type: "_doc" });
  };
}
