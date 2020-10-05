/** @format */

import _ from "lodash";

import ESHelper from "../util/helpers/elasticsearch";

import Constants from "../constants";

export default class ESService {
  static getUsers = async (queryParms: any) => {
    const { qText, userNIn, location, page, limit } = queryParms;

    const body = {
      from: page,
      size: limit,
      query: {
        bool: {
          must_not: {
            terms: {
              id: userNIn,
            },
          },
          should: [
            {
              match: {
                email: qText,
              },
            },
            {
              match: {
                username: qText,
              },
            },
            {
              match: {
                firstName: qText,
              },
            },
            {
              match: {
                lastName: qText,
              },
            },
          ],
          minimum_should_match: 1,
        },
      },
    };

    if (!_.isNil(location)) {
      const sort = [
        {
          _geo_distance: {
            location: `${location.lat} ${location.lng}`,
            order: "asc",
            unit: "km",
            mode: "min",
            distance_type: "arc",
            ignore_unmapped: true,
          },
        },
      ];

      _.set(body, "sort", sort);
    }

    const response = await ESHelper.search("user", body);

    const records = _.get(response, "body.hits.hits", []);
    const result = _.map(records, "_source");

    return result;
  };

  static getPosts = async (queryParms: any) => {
    const { userIn, userNIn, postNIn, location, page, limit } = queryParms;

    const body = {
      from: page,
      size: limit,
      query: {
        bool: {
          must_not: [
            {
              terms: {
                _id: postNIn,
              },
            },
            {
              terms: {
                userId: userNIn,
              },
            },
          ],
          should: [
            {
              postType: Constants.POST_TYPE_REGULAR,
              range: {
                dt: {
                  gt: "now-1d/d",
                },
              },
            },
            {
              postType: Constants.POST_TYPE_PERMANENT,
            },
          ],
          minimum_should_match: 1,
        },
      },
    };

    if (!_.isNil(location)) {
      const sort = [
        {
          _geo_distance: {
            location: `${location.lat} ${location.lng}`,
            order: "asc",
            unit: "km",
            mode: "min",
            distance_type: "arc",
            ignore_unmapped: true,
          },
        },
      ];

      _.set(body, "sort", sort);
    }

    if (!_.isEmpty(userIn)) {
      _.set(body, "query.bool.must.terms", {
        userId: userIn,
      });
    }

    const response = await ESHelper.search("post", body);

    const records = _.get(response, "body.hits.hits", []);
    const result = _.map(records, "_source");

    return result;
  };

  static getPostsByUserId = async (
    queryParms: any,
    isAnonymousVisible: boolean = false,
  ) => {
    const { userId, postNIn, page, limit } = queryParms;

    const body = {
      from: (page - 1) * limit,
      size: limit,
      sort: [{ dt: { order: "desc" } }],
      query: {
        bool: {
          must: {
            match: {
              userId,
            },
          },
          must_not: [
            {
              terms: {
                _id: postNIn,
              },
            },
          ],
          should: [
            {
              bool: {
                must: [
                  {
                    term: {
                      postType: Constants.POST_TYPE_REGULAR,
                    },
                  },
                  {
                    range: {
                      dt: {
                        gt: "now-1d/d",
                      },
                    },
                  },
                ],
              },
            },
            {
              term: {
                postType: Constants.POST_TYPE_PERMANENT,
              },
            },
          ],
          minimum_should_match: 1,
        },
      },
    };

    if (!isAnonymousVisible) {
      _.set(body, "query.bool.must_not.match", {
        userMode: Constants.USER_MODE_ANONYMOUS,
      });
    }

    const response = await ESHelper.search("post", body);

    const records = _.get(response, "body.hits.hits", []);
    const result = _.map(records, "_source");

    return result;
  };
}
