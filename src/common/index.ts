import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../errors';
import AuthMiddleware from './auth.middleware';

type ExpressMethod<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

export const catchAsync = <T>(fn: ExpressMethod<T>) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return fn(req, res, next)
      .then((data) => {
        return res.status(HttpStatusCode.SUCCESS).json({
          status: 'success',
          data,
        });
      })
      .catch((error) => {
        return res.status(error.httpCode).json({
          message: error.message,
        });
      });
  };
};

export { AuthMiddleware };
