import { NextFunction, Request, Response } from 'express';
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
        return res.status(200).json({
          status: 'success',
          data,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
        });
      });
  };
};

export { AuthMiddleware };
