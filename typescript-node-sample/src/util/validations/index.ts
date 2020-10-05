/** @format */

import Joi from "@hapi/joi";

const customJoi = Joi.extend(joi => ({
  type: "array",
  base: joi.array(),
  coerce: {
    from: "string",
    method(value, helpers) {
      if (
        typeof value !== "string" ||
        (value[0] !== "[" && !/^\s*\[/.test(value))
      ) {
        return;
      }

      try {
        return { value: JSON.parse(value) };
      } catch (ignoreErr) {}
    },
  },
}));

export default customJoi;
