/** @format */

'use strict';

const _ = require('lodash');
const boom = require('@hapi/boom');
const httpStatus = require('http-status');
import { Request, Response, NextFunction } from 'express';

// middleware for throwing an error if no route match
export const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  throw boom.notFound('Requested resource not found');
};

// middleware for handling errors
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', JSON.stringify(err));

  let code, message;

  if (err.isJoi) {
    code = httpStatus.BAD_REQUEST;
    message = _.head(err.details).message;
  } else if (err.isBoom) {
    code = err.output.statusCode;
    message = err.output.payload.message;
  } else {
    code = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Something went wrong';
  }

  return res.status(code).json({ code, message });
};
