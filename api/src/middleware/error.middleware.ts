import HttpException from '../common/exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;
  const message = error.message || 'Something went wrong';

  response.send({ status, message }).send(error);
};
